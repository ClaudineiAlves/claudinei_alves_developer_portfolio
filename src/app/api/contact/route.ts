import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

// ⚠️ Rate limit best-effort: o estado vive na memória da instância serverless.
// Na Vercel cada instância tem o próprio Map, então o limite NÃO é global — vale
// como defesa em profundidade atrás do reCAPTCHA, não como garantia. Para limite
// real, seria preciso um store compartilhado (Vercel KV / Upstash).
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_TRACKED_IPS = 10_000;

const ipRequests = new Map<string, number[]>();

// Remove IPs cujas janelas já expiraram — sem isso o Map crescia indefinidamente
// numa instância quente (vazamento de memória).
function pruneExpired(now: number): void {
  for (const [trackedIp, timestamps] of ipRequests) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      ipRequests.delete(trackedIp);
    } else if (recent.length !== timestamps.length) {
      ipRequests.set(trackedIp, recent);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  pruneExpired(now);

  // Salvaguarda final: se ainda assim o Map estourar o teto, zera em vez de
  // deixar a memória crescer sem limite.
  if (ipRequests.size > RATE_LIMIT_MAX_TRACKED_IPS) {
    ipRequests.clear();
  }

  const recentRequests = (ipRequests.get(ip) || []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) return true;

  recentRequests.push(now);
  ipRequests.set(ip, recentRequests);
  return false;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

// Valores colados no painel da Vercel às vezes vêm com espaço ou quebra de linha:
// passam no teste de "não vazio", mas o EmailJS os descarta e responde como se a
// chave não tivesse sido enviada.
function envLimpa(nome: string): string | undefined {
  const bruto = process.env[nome];
  const limpo = bruto?.trim();
  if (bruto && limpo !== bruto) {
    console.warn(`[API /contact] ${nome} tinha espaços em volta; removidos`);
  }
  return limpo || undefined;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
      },
    );
    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch {
    return false;
  }
}

// Sanitiza strings para evitar injeção de conteúdo no template do EmailJS
function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas requisições" },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, message, recaptchaToken } = body;

    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: "Mensagem deve ter 10-1000 caracteres" },
        { status: 400 },
      );
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Verificação falhou" },
        { status: 403 },
      );
    }

    // A API do EmailJS espera DOIS identificadores distintos:
    //   user_id     = Public Key  (o SDK oficial envia exatamente isso)
    //   accessToken = Private Key (obrigatório em chamadas fora do browser)
    // Aceita EMAILJS_PUBLIC_KEY ou o nome legado NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.
    const serviceId = envLimpa("EMAILJS_SERVICE_ID");
    const templateId = envLimpa("EMAILJS_TEMPLATE_ID");
    const publicKey =
      envLimpa("EMAILJS_PUBLIC_KEY") ||
      envLimpa("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
    const privateKey = envLimpa("EMAILJS_PRIVATE_KEY");

    const missing = [
      !serviceId && "EMAILJS_SERVICE_ID",
      !templateId && "EMAILJS_TEMPLATE_ID",
      !publicKey && "EMAILJS_PUBLIC_KEY",
      !privateKey && "EMAILJS_PRIVATE_KEY",
    ].filter(Boolean);

    if (missing.length > 0) {
      console.error(
        `[API /contact] Variáveis de ambiente ausentes: ${missing.join(", ")}`,
      );
      return NextResponse.json(
        { error: "Erro de configuração" },
        { status: 500 },
      );
    }

    const emailjsResponse = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          accessToken: privateKey,
          template_params: {
            from_name: sanitize(name), // ✅ Sanitizado
            from_email: sanitize(email), // ✅ Sanitizado
            message: sanitize(message), // ✅ Sanitizado
            reply_to: sanitize(email),
          },
        }),
      },
    );

    if (!emailjsResponse.ok) {
      const errorData = await emailjsResponse.text();
      console.error("[EmailJS] Erro:", emailjsResponse.status, errorData);
      return NextResponse.json(
        { error: "Erro ao enviar email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API /contact] Erro:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
