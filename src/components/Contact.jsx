import IconCall from "@/components/icons/IconCall";
import IconFacebook from "@/components/icons/IconFacebook";
import IconLine from "@/components/icons/IconLine";
import IconMail from "@/components/icons/IconMail";
import Link from "next/link";
import React from "react";

export default function Contact({
  address,
  contact,
  map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d287.9398878326795!2d100.56407120682007!3d13.836521878045108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d73bd5e3843%3A0x993c717f14a36996!2zQ0FEIGNlbnRlciDguKjguLnguJnguKLguYzguJ7guLHguJLguJnguLLguYDguJTguYfguIHguIvguLXguYDguK3guJTguLU!5e0!3m2!1sth!2sth!4v1751193660551!5m2!1sth!2sth",
  dictionary,
  locale,
}) {
  // const {
  //   facebook_label,
  //   facebook_link,
  //   line_label,
  //   line_link,
  //   email_label,
  //   email_link,
  //   tel_label,
  //   tel_link,
  // } = contact;
  const facebook_label = contact?.facebook_label || "";
  const facebook_link = contact?.facebook_link || "";
  const line_label = contact?.line_label || "";
  const line_link = contact?.line_link || "";
  const email_label = contact?.email_label || "";
  const email_link = contact?.email_link || "";
  const tel_label = contact?.tel_label || "";
  const tel_link = contact?.tel_link || "";
  return (
    <section className="footer-contact" id="contact">
      <div className="footer-contact-container">
        <iframe
          src={map}
          width="1000"
          height="450"
          // style="border:0;"
          // allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="contact">
          <h4>{address}</h4>
          <p>
            <Link
              href={facebook_link}
              target="_blank"
              className="flex items-center gap-x-2"
            >
              <IconFacebook /> {facebook_label}
            </Link>
          </p>
          <p>
            <Link
              href={line_link}
              target="_blank"
              className="flex items-center gap-x-2"
            >
              <IconLine /> {line_label}
            </Link>
          </p>
          <p>
            <Link
              href={`mailto:${email_link}`}
              target="_blank"
              className="flex items-center gap-x-2"
            >
              <IconMail /> {email_label}
            </Link>
          </p>
          <p>
            <Link
              href={`tel:${tel_link}`}
              className="flex items-center gap-x-2"
            >
              <IconCall />
              {tel_label}
            </Link>
          </p>
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
              {/* <Link href={`/${locale}/admin/article/editor`}>
                {dictionary.editor}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
