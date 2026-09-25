"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Tipo para grecaptcha global
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_EMAIL || "";

export default function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey || !window.grecaptcha) {
      console.warn("[reCAPTCHA] Não inicializado");
      return null;
    }

    return new Promise((resolve) => {
      window.grecaptcha!.ready(async () => {
        const token = await window.grecaptcha!.execute(siteKey, {
          action: "contact_form",
        });
        resolve(token);
      });
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const recaptchaToken = await executeRecaptcha();

      if (!recaptchaToken) {
        setStatus("error");
        return;
      }

      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        recaptchaToken,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await response.json();

      if (response.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="name"
          className="text-caption text-content-subtle mb-2 block"
        >
          {t("contact.form.name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          minLength={2}
          maxLength={100}
          className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-bg-tertiary focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-content-primary placeholder:text-content-subtle"
          placeholder={t("contact.form.name_placeholder")}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-caption text-content-subtle mb-2 block"
        >
          {t("contact.form.email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-bg-tertiary focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-content-primary placeholder:text-content-subtle"
          placeholder={t("contact.form.email_placeholder")}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-caption text-content-subtle mb-2 block"
        >
          {t("contact.form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-bg-tertiary focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-content-primary placeholder:text-content-subtle resize-none"
          placeholder={t("contact.form.message_placeholder")}
        />
      </div>

      {/* Os avisos ficam em regiões vivas sempre montadas, para o leitor de tela anunciar o resultado */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 disabled:bg-primary-600/50 disabled:cursor-not-allowed transition-all text-white font-medium flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("contact.form.sending")}
            </>
          ) : (
            t("contact.form.send")
          )}
        </button>

        <div role="status">
          {status === "success" && (
            <p className="mt-6 text-sm text-green-400 text-center">
              {t("contact.form.success")}
            </p>
          )}
        </div>

        <div role="alert">
          {status === "error" && (
            <p className="mt-6 text-sm text-red-400 text-center">
              {t("contact.form.error")}
              {CONTACT_EMAIL && (
                <>
                  {" "}
                  {t("contact.form.error_fallback")}{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="underline hover:text-red-300"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
