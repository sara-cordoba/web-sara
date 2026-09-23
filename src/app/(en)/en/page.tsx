import type { Metadata } from "next";
import PaginaHome from "@/components/PaginaHome";
import { alternativas } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: alternativas("/", "en"),
};

export default function HomePageEn() {
  return <PaginaHome idioma="en" />;
}
