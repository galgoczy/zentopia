import type { Metadata } from "next";
import CVViewer from "./CVViewer";

export const metadata: Metadata = {
  title: "Galgóczy Gergely — CV · Zentopia",
  description:
    "Galgóczy Gergely önéletrajza — alapító, AI stratéga · Zentopia.",
  robots: { index: false, follow: false },
};

export default function CVPage() {
  return <CVViewer />;
}
