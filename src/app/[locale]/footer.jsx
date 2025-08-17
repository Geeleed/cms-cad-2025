import { load_footer, load_system_word } from "@/api/loadData";
import Contact from "@/components/Contact";

export default async function Footer({ locale }) {
  const dict = await load_system_word({ params: { locale } });
  const footerData = await load_footer({ locale });

  return (
    <footer>
      <Contact
        address={footerData?.address}
        contact={footerData?.contact || {}}
        map={footerData?.map || ""}
        dictionary={dict.resource}
        locale={locale}
      />
      <p className="py-[12px]">{footerData.footer}</p>
    </footer>
  );
}
