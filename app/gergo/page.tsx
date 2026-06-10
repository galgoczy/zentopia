import type { Metadata } from "next";
import GergoCard from "./GergoCard";

export const metadata: Metadata = {
  title: "Galgóczy Gergely · Zentopia",
  description:
    "Zentopia alapító · AI stratéga. Kapcsolat, projektek, és letölthető névjegy.",
  robots: { index: true, follow: true },
};

export default function GergoPage() {
  return <GergoCard />;
}
