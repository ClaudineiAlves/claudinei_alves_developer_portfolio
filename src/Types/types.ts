import { ReactNode } from "react";

export interface AnimationLottieProps {
  // ✅ Atualizado de `object` para `string` — @lottiefiles/dotlottie-react
  // recebe a URL do arquivo (.lottie ou .json) em vez do objeto JSON diretamente.
  // Coloque seus arquivos de animação em /public/animations/ e passe o caminho:
  // Ex: animationPath="/animations/hero.lottie"
  animationPath: string;
  width?: string | number;
}

export interface GlowCardProps {
  children: ReactNode;
  identifier: string;
}

export interface Project {
  id: number;
  name: string;
  tools: string[];
  role: string;
  description: string;
  code: string;
  demo: string;
  date: string;
  images: string[];
  videos?: string[];
  published: boolean;
  highlights?: string[];
  challenges?: string[];
}

export interface ProjectCardProps {
  project: Project;
}

export interface Props {
  children: ReactNode;
}
