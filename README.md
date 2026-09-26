# 🌐 Claudinei Alves — Portfólio

Bem-vindo ao meu portfólio pessoal de desenvolvedor, criado para apresentar meus projetos, habilidades e trajetória na área de tecnologia, ciência de dados e desenvolvimento de software.

Este site foi desenvolvido utilizando tecnologias modernas de desenvolvimento web, com foco em performance, design responsivo e experiência do usuário.

---

![Página inicial do portfólio de Claudinei Alves](public/Website-overview.png)

🔗 **Site no ar:** [claudineiportfolio.vercel.app](https://claudineiportfolio.vercel.app/)

---

## Tecnologias Utilizadas

- ⚡ **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- 🎨 **Estilo:** [Tailwind CSS 3](https://tailwindcss.com/)
- 💻 **TypeScript** em todos os componentes e utilitários
- 🧩 **Animações:** [GSAP](https://gsap.com/) e [dotLottie](https://www.npmjs.com/package/@lottiefiles/dotlottie-react)
- 📧 **Contato:** [EmailJS](https://www.emailjs.com/), chamado por uma rota de API no servidor
- 🔐 **Anti-spam:** [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3), validado no servidor
- 📦 **PWA:** service worker com [Serwist](https://serwist.pages.dev/)
- 🧠 **Ícones:** [Lucide](https://lucide.dev/) e [React Icons](https://react-icons.github.io/)
- ✅ **Qualidade:** Prettier, ESLint e Husky no pre-commit

---

## Funcionalidades

- 📱 Design totalmente responsivo
- 🎨 Interface moderna e animada
- 🧑‍💻 Seção de projetos com descrição e tecnologias
- 🛠️ Exibição de habilidades técnicas
- 🎓 Histórico educacional
- 📧 Formulário de contato funcional
- 🌐 Conteúdo em português e inglês
- ♿ Opções de acessibilidade: alto contraste, texto grande e menos animações

---

## Como rodar

Requer Node.js 20 ou mais recente.

```bash
npm ci
cp .env.example .env.local   # preencha as chaves
npm run dev                  # http://localhost:3000
```

O site sobe sem nenhuma variável preenchida; só o formulário de contato depende delas.

| Variável                                                                                                      | Para quê                                                                                 |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`                      | Envio do formulário de contato (só no servidor)                                          |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`                                                      | reCAPTCHA v3; a chave precisa ter `localhost` e o domínio do deploy na lista de domínios |
| `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_ADDRESS`, `NEXT_PUBLIC_GITHUB`, `NEXT_PUBLIC_LINKEDIN` | Dados exibidos na seção de contato                                                       |
| `NEXT_PUBLIC_BING_VERIFICATION`, `NEXT_PUBLIC_YANDEX_VERIFICATION`                                            | Verificação de propriedade nos buscadores                                                |

---

## 📄 Licença

Código aberto sob a [licença MIT](LICENSE).

## 📬 Autor

### Claudinei Alves

- 💼 Desenvolvedor & Cientista de Dados em formação
- 🎓 Estudante de tecnologia e inteligência artificial
- 🌎 Brasil

## 📫 Entre em contato:

- LinkedIn: [claudinei-alves-reis](https://www.linkedin.com/in/claudinei-alves-reis/)
- GitHub: [ClaudineiAlves](https://github.com/ClaudineiAlves)
- E-mail: [alvesreis.dev@gmail.com](mailto:alvesreis.dev@gmail.com)
