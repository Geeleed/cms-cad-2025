import { ButtonPrimarySmall, ButtonSecondaryLarge } from "@/components/Buttons";
import Link from "next/link";

export default function FAQ() {
  return (
    <section className="section-faq">
      <h2>Frequently Asked Questions</h2>
      <Link href={"#"}>
        {/* <ButtonSecondaryLarge>
          <label>Read more...</label>
        </ButtonSecondaryLarge> */}
        <button>
          <ButtonPrimarySmall>Read more...</ButtonPrimarySmall>
        </button>
      </Link>
    </section>
  );
}
