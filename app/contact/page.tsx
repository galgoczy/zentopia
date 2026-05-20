import type { Metadata } from "next";
import ContactCard from "./ContactCard";

export const metadata: Metadata = {
  title: "Zentopia · Gergely Galgóczy · digital business card",
  description: "Scan the QR to get my contact details.",
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return <ContactCard />;
}
