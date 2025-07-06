import IconCall from "@/components/icons/IconCall";
import IconFacebook from "@/components/icons/IconFacebook";
import IconLine from "@/components/icons/IconLine";
import IconMail from "@/components/icons/IconMail";
import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <section className="footer-contact" id="contact">
      <div className="footer-contact-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d287.9398878326795!2d100.56407120682007!3d13.836521878045108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d73bd5e3843%3A0x993c717f14a36996!2zQ0FEIGNlbnRlciDguKjguLnguJnguKLguYzguJ7guLHguJLguJnguLLguYDguJTguYfguIHguIvguLXguYDguK3guJTguLU!5e0!3m2!1sth!2sth!4v1751193660551!5m2!1sth!2sth"
          width="1000"
          height="450"
          // style="border:0;"
          // allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="contact">
          <h4>294 Phahonyothin Road 35/19, Ladyao, Chatuchak, Bangkok 10900</h4>
          <p>
            <Link
              href={"https://www.facebook.com/cadautism"}
              target="_blank"
              className="flex items-center gap-x-2"
            >
              <IconFacebook /> cadautism
            </Link>
          </p>
          <p>
            <Link
              href={"https://line.me/R/ti/p/~@cadcenter"}
              target="_blank"
              className="flex items-center gap-x-2"
            >
              <IconLine /> @cadcenter
            </Link>
          </p>
          <p>
            <Link
              href={"mailto:cadautism@gmail.com"}
              target="_blank"
              className="flex items-center gap-x-2"
            >
              <IconMail /> cadautism@gmail.com
            </Link>
          </p>
          <p>
            <Link href={"tel:0654962826"} className="flex items-center gap-x-2">
              <IconCall />
              065-496-2826
            </Link>
          </p>
          <div className="mt-[3rem]">
            <div className="font-semibold">Navigation</div>
            <div className="flex gap-3 *:text-[0.9rem] *:hover:text-(--d)">
              <Link href={"/home"}>Home</Link>
              <Link href={"/about"}>About</Link>
              <Link href={"/team"}>Team</Link>
              <Link href={"/services"}>Services</Link>
              <Link href={"/doctor"}>Doctor</Link>
              <Link href={"/approaches"}>Approaches</Link>
              <Link href={"/resources"}>Resources</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
