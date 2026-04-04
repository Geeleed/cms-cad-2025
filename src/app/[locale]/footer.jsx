import { load_footer, load_system_word } from "@/api/loadData";
import Contact from "@/components/Contact";
import InlineText from "@/components/admin/InlineText";

export default async function Footer({ locale }) {
  const dict = await load_system_word({ params: { locale } });
  const footerData = await load_footer({ locale });

  return (
    <footer>
      <Contact
        address={footerData?.address}
        contacts={footerData?.contacts || []}
        map={footerData?.map || ""}
        dictionary={dict.resource}
        locale={locale}
      />
      <p className="py-[12px]">
        <InlineText
          value={footerData.footer}
          resourceType="value_setting"
          resourceName={`value_setting_${locale}`}
          fieldKey="footer"
        />
      </p>
    </footer>
  );
}
