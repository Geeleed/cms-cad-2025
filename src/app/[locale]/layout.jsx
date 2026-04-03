import React from "react";
import Footer from "./footer";
import FooterWrapper from "./FooterWrapper";

export async function generateStaticParams() {
  const locales = ["en", "th"];
  return locales.map((locale) => ({ locale }));
}

export default async function layout({ children, params }) {
  const locale = (await params).locale;
  return (
    <div>
      {children}
      <FooterWrapper footer={<Footer locale={locale} />} />
    </div>
  );
}
