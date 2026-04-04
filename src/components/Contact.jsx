"use client";
import AdminLoginModal from "@/components/admin/AdminLoginModal";
import InlineContactList from "@/components/admin/InlineContactList";
import InlineText from "@/components/admin/InlineText";
import Link from "next/link";
import React from "react";

export default function Contact({
  address,
  contacts = [],
  map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1d287.9398878326795!2d100.56407120682007!3d13.836521878045108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d73bd5e3843%3A0x993c717f14a36996!2zQ0FEIGNlbnRlciDguKjguLnguJnguKLguYzguJ7guLHguJLguJnguLLguYDguJTguYfguIHguIvguLXguYDguK3guJTguLU!5e0!3m2!1sth!2sth!4v1751193660551!5m2!1sth!2sth",
  dictionary,
  locale,
}) {
  const rt = "value_setting";
  const rn = `value_setting_${locale}`;

  return (
    <section className="footer-contact" id="contact">
      <div className="footer-contact-container">
        <iframe
          src={map}
          width="1000"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="contact">
          <h4>
            <InlineText value={address} resourceType={rt} resourceName={rn} fieldKey="address" multiline />
          </h4>
          <InlineContactList
            values={contacts}
            resourceType={rt}
            resourceName={rn}
            fieldKey="contacts"
            telClass="text-(--primary-1) mt-[8px]"
          />
          <div className="mt-[3rem]">
            <div className="font-semibold">{dictionary.navigation}</div>
            <div className="flex gap-x-3 *:text-[0.9rem] *:hover:text-(--d) flex-wrap">
              <Link href={`/${locale}/home`}>{dictionary.home}</Link>
              <Link href={`/${locale}/about`}>{dictionary.about}</Link>
              <Link href={`/${locale}/team`}>{dictionary.team}</Link>
              <Link href={`/${locale}/services`}>{dictionary.services}</Link>
              <Link href={`/${locale}/doctor`}>{dictionary.doctor}</Link>
              <Link href={`/${locale}/approaches`}>
                {dictionary.approaches}
              </Link>
              <Link href={`/${locale}/resources`}>{dictionary.resources}</Link>
            </div>
            <div className="mt-[1rem]">
              <AdminLoginModal locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
