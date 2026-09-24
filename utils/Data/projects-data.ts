const allProjects = [
  {
    id: 1,
    published: true,
    name: "Portfólio Pessoal",
    description:
      "Portfólio pessoal moderno e responsivo com suporte bilíngue (EN/PT), tema escuro, animações suaves e formulário de contato seguro com EmailJS e reCAPTCHA v3.",

    tools: [
      "Next.js 15",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "EmailJS",
      "reCAPTCHA v3",
      "Vercel",
    ],

    role: "Full-Stack Developer",

    code: "https://github.com/ClaudineiAlves/claudinei_alves_developer_portfolio",

    demo: "https://claudineiportfolio.vercel.app",

    date: "2026-05-11",

    images: [
      "/projects/portfolio/preview-home.png",
      "/projects/portfolio/preview-contact.png",
    ],

    videos: [],

    highlights: [
      "Sistema i18n customizado com React Context API — suporte EN/PT sem bibliotecas externas.",
      "Tema escuro com CSS variables e Tailwind CSS para estilização consistente e manutenível.",
      "Formulário de contato com EmailJS (server-side) e reCAPTCHA v3 para proteção contra spam.",
    ],

    challenges: [
      "Implementar resolução de chaves aninhadas em dot-notation para o sistema i18n sem overhead de bibliotecas como next-intl.",
      "Otimizar o Lighthouse Score com lazy loading, pré-carregamento de fontes e animações eficientes.",
    ],
  },
  {
    id: 2,
    published: true,
    name: "Transparência BR API",
    description:
      "API REST assíncrona em FastAPI que expõe quatro datasets do Portal da Transparência da CGU — cartões corporativos, viagens a serviço, contratos e licitações — em endpoints versionados /v1/. Arquitetura em camadas, PostgreSQL com migrations, testes com o serviço externo mockado e CI no GitHub Actions.",

    tools: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy 2",
      "Alembic",
      "Pydantic",
      "httpx",
      "pytest",
      "GitHub Actions",
      "Docker",
      "Railway",
    ],

    role: "Backend Developer",

    code: "https://github.com/ClaudineiAlves/transparenciabr-api",

    // O deploy do Railway respondia 404 em 24/09/2026. Quando voltar, restaure:
    // "https://transparenciabr-api-production.up.railway.app/"
    demo: "",

    date: "2026-05-14",

    images: [
      "/projects/transparenciabr_api/preview_cards.png",
      "/projects/transparenciabr_api/preview_bidding.png",
      "/projects/transparenciabr_api/preview_contracts.png",
      "/projects/transparenciabr_api/preview_vacations.png",
    ],

    videos: [],

    highlights: [
      "Camadas explícitas (api, services, clients, schemas, models, core): a regra de negócio não depende do FastAPI nem do formato da API externa.",
      "Suíte em pytest cobrindo os quatro recursos, com o Portal mockado via pytest-httpx para que os testes não dependam da disponibilidade da fonte, rodando no GitHub Actions a cada push.",
      "Cliente httpx com retry em 429 e timeout explícito, exceções próprias com tratamento centralizado e endpoint /health.",
    ],

    challenges: [
      "Manter a integração estável sob o rate limit do Portal da Transparência, transformando erro de terceiro em resposta previsível da API em vez de stack trace.",
      "Versionar o schema PostgreSQL com Alembic numa stack assíncrona (SQLAlchemy 2 + asyncpg), permitindo recriar o ambiente do zero sem passo manual.",
    ],
  },
  {
    id: 3,
    published: true,
    name: "Agente de Triagem de E-mail com LLM Local",
    description:
      "Agente que classifica e-mails recebidos em 8 categorias semânticas com um LLM rodando localmente (Ollama + llama3.1), orquestrado por n8n self-hosted em Docker Compose. Prompt, categorias e limiares ficam num YAML versionado, e nenhum conteúdo é enviado para API de terceiro.",

    tools: [
      "Python",
      "n8n",
      "Ollama",
      "llama3.1",
      "Docker Compose",
      "SQLite",
      "systemd",
      "YAML",
    ],

    role: "Python Developer",

    code: "https://github.com/ClaudineiAlves/triagem-email-llm",

    demo: "",

    date: "2026",

    images: ["/projects/email_agent/arquitetura.png"],

    videos: [],

    highlights: [
      "Limiar de confiança de 0,6 com rota de revisão manual: abaixo dele, o e-mail vai para uma fila de revisão em vez de receber um rótulo chutado.",
      "Prompt, descrições das categorias e limiares em configuração versionada, fora do fluxo de execução: ajustar o comportamento não exige editar o workflow.",
      "Watchdog em Python disparado por systemd timer, fora do container, que consulta o banco de execuções e alerta quando não há atividade na janela esperada.",
    ],

    challenges: [
      "Diagnosticar uma falha silenciosa: o modelo devolvia rótulos fora do conjunto previsto sem lançar erro. Isolei a causa na janela de contexto e medi o acerto num lote de e-mails reais antes e depois do ajuste.",
      "Garantir que uma parada não passe despercebida: uma credencial expirou em silêncio e a triagem ficou 38 dias parada sem ninguém notar — o que originou o watchdog fora do container.",
    ],
  },
  {
    id: 4,
    published: true,
    name: "Skin Analyser — Triagem de Lesões Cutâneas com IA",
    description:
      "Pipeline de classificação de imagens dermatoscópicas do dataset público HAM10000: pré-processamento com OpenCV, separação por paciente sem vazamento de dados, 8 arquiteturas de CNN comparadas em transfer learning e avaliação por F1, recall, AUC e matriz de confusão. Projeto de triagem: não faz diagnóstico.",

    tools: [
      "Python",
      "TensorFlow/Keras",
      "Scikit-learn",
      "OpenCV",
      "Pandas",
      "NumPy",
      "Supabase",
      "FastAPI",
      "Redis",
      "React/TypeScript",
    ],

    role: "Machine Learning Developer",

    code: "https://github.com/ClaudineiAlves/skin-analyser",

    demo: "",

    date: "2025–2026",

    images: ["/projects/skin_analyser/pipeline.png"],

    videos: [],

    highlights: [
      "Treino, validação e teste separados por patient_id com estratificação por classe: imagens do mesmo paciente nunca caem em partições diferentes.",
      "8 arquiteturas (MobileNetV2, EfficientNetB0, ResNet50, InceptionV3, DenseNet121, Xception, VGG19 e NASNetMobile) comparadas sob protocolo idêntico, num pipeline parametrizado que troca só a configuração.",
      "Execuções e métricas persistidas no Supabase, com dashboard de KPIs diários — acurácia, sensibilidade e especificidade — sobre views materializadas no PostgreSQL.",
    ],

    challenges: [
      "Montar a validação de um jeito que o número signifique alguma coisa: split por paciente e recall priorizado na classe de maior risco clínico.",
      "Controlar overfitting com augmentation, dropout, regularização L2, early stopping e redução de learning rate em platô, acompanhando o gap entre treino e validação a cada época.",
    ],
  },
  // ─── PROJETOS PENDENTES ────────────────────────────────────────────────────
  // Os itens abaixo são placeholders para projetos futuros.
  // Para adicionar um projeto real:
  //   1. Preencha todos os campos (name, description, tools, role, code, demo, date).
  //   2. Coloque as imagens em public/projects/<nome-do-projeto>/.
  //   3. Descomente e ajuste os caminhos em `images` e `videos`.
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    published: false, // TODO: substituir pelo próximo projeto real
    name: "Nome do Projeto",
    description:
      "Breve descrição do projeto. Explique qual problema ele resolve, quais são as principais funcionalidades e qual tecnologia foi utilizada para desenvolvê-lo.",

    tools: ["Tecnologia 1", "Tecnologia 2", "Tecnologia 3", "Tecnologia 4"],

    role: "Seu papel no projeto (ex: Full-Stack Developer, Frontend Developer)",

    code: "https://github.com/seu-usuario/seu-projeto",

    demo: "https://link-do-deploy.com",

    date: "AAAA-MM-DD",

    images: [
      //"/projects/nome-do-projeto/imagem-1.png",
      //"/projects/nome-do-projeto/imagem-2.png",
    ],

    videos: [
      //"/projects/nome-do-projeto/demo-video.mp4"
    ],

    highlights: [
      "Funcionalidade ou característica importante do projeto.",
      "Outro destaque relevante da implementação.",
      "Tecnologia ou arquitetura interessante utilizada.",
    ],

    challenges: [
      "Principal desafio técnico enfrentado durante o desenvolvimento.",
      "Problema de arquitetura, performance ou integração que precisou ser resolvido.",
    ],
  },
  {
    id: 6,
    published: false, // TODO: substituir pelo próximo projeto real
    name: "Nome do Projeto",
    description:
      "Breve descrição do projeto. Explique qual problema ele resolve, quais são as principais funcionalidades e qual tecnologia foi utilizada para desenvolvê-lo.",

    tools: ["Tecnologia 1", "Tecnologia 2", "Tecnologia 3", "Tecnologia 4"],

    role: "Seu papel no projeto (ex: Full-Stack Developer, Frontend Developer)",

    code: "https://github.com/seu-usuario/seu-projeto",

    demo: "https://link-do-deploy.com",

    date: "AAAA-MM-DD",

    images: [
      //"/projects/nome-do-projeto/imagem-1.png",
      //"/projects/nome-do-projeto/imagem-2.png",
    ],

    videos: [
      //"/projects/nome-do-projeto/demo-video.mp4"
    ],

    highlights: [
      "Funcionalidade ou característica importante do projeto.",
      "Outro destaque relevante da implementação.",
      "Tecnologia ou arquitetura interessante utilizada.",
    ],

    challenges: [
      "Principal desafio técnico enfrentado durante o desenvolvimento.",
      "Problema de arquitetura, performance ou integração que precisou ser resolvido.",
    ],
  },
  {
    id: 7,
    published: false, // TODO: substituir pelo próximo projeto real
    name: "Nome do Projeto",
    description:
      "Breve descrição do projeto. Explique qual problema ele resolve, quais são as principais funcionalidades e qual tecnologia foi utilizada para desenvolvê-lo.",

    tools: ["Tecnologia 1", "Tecnologia 2", "Tecnologia 3", "Tecnologia 4"],

    role: "Seu papel no projeto (ex: Full-Stack Developer, Frontend Developer)",

    code: "https://github.com/seu-usuario/seu-projeto",

    demo: "https://link-do-deploy.com",

    date: "AAAA-MM-DD",

    images: [
      //"/projects/nome-do-projeto/imagem-1.png",
      //"/projects/nome-do-projeto/imagem-2.png",
    ],

    videos: [
      //"/projects/nome-do-projeto/demo-video.mp4"
    ],

    highlights: [
      "Funcionalidade ou característica importante do projeto.",
      "Outro destaque relevante da implementação.",
      "Tecnologia ou arquitetura interessante utilizada.",
    ],

    challenges: [
      "Principal desafio técnico enfrentado durante o desenvolvimento.",
      "Problema de arquitetura, performance ou integração que precisou ser resolvido.",
    ],
  },
];

export const projectsData = allProjects.filter((p) => p.published);
