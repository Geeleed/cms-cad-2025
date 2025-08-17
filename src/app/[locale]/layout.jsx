import React from "react";
import Footer from "./footer";

// export async function generateStaticParams() {
//   const locales = ["en", "th"];
//   return locales.map((locale) => ({ locale }));
// }

export default async function layout({ children, params }) {
  const locale = (await params).locale;
  return (
    <div>
      {children}
      <Footer locale={locale} />
    </div>
  );
}
