import PrivacyPolicy from "@/components/privacy-policy";
import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

const title = "Privacy Policy";
const description =
  "How data is handled on this portfolio and in the job-hunter personal app.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo({ path: "/privacy/", title, description }),
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
