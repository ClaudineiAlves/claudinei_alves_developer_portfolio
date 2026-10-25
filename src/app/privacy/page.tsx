import PrivacyPolicy from "@/components/privacy-policy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How data is handled on this portfolio and in the job-hunter personal app.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
