import React from "react";
import css from "./page.module.css";
import Link from "next/link";

export default function En() {
  return (
    <div className={css.container}>
      <h1 className={css.h1}>Our Teaching Approaches</h1>
      <section className={css.section}>
        <h2>
          A. Principles of Applied Behavior Analysis (ABA)and Verbal Behavior
          (VB) Approach
        </h2>
        <p>
          At CAD, we design learning program based on the principles of{" "}
          <strong>ABA</strong> or Applied <strong>Behavior Analysis</strong>,
          with the following fundamental approaches:
        </p>
        <ul>
          <li>
            • Analyzes socially-significant behaviors in need of improvement.
            This means that instructors collect, examine, and interpret data as
            part of the teaching process.
          </li>
          <li>• Behavior is defined in objective and measurable terms.</li>
          <li>
            • Examines the functional relationship between behavior (what a
            person does) and its controlling variables (what happens in the
            environment).
          </li>
          <li>
            <ul>
              <li>o Antecedent - What happens before the behavior?</li>
              <li>o Behavior - What does the behavior look like?</li>
              <li>o Consequence - What happens after the behavior?</li>
            </ul>
          </li>
        </ul>
        <p>
          To develop children's language skills, we use the VB (Verbal Behavior)
          approach, which is one of the ABA’s teaching approaches. The details
          are as follows:
        </p>
        <ul>
          <li>
            • Verbal behavior is behavior that is mediated by the actions of
            another person. This means it involves what we do in most of our
            interactions with others. Verbal behavior is communication.
          </li>
          <li>
            • Verbal behavior focuses attention on the functional analysis of
            language; looking at the conditions under which a person will use
            language. In other words, looking at why things are said.
          </li>
          <li>
            • Verbal Behavior can include speaking, using sign language,
            writing, gesturing, using picture exchange systems, and using
            various augmentative communication devices.
          </li>
          <li>
            • Verbal behavior is best understood by learning the verbal
            operants, which classify what is said based on why it is said. For
            example:
            <ul>
              <li>o Mand = request (You say it because you want it)</li>
              <li>
                o Tact = label (You say it because you see, hear, smell, taste,
                or feel something)
              </li>
              <li>
                o Intraverbal = conversation, answering a question, responding
                when someone else talks (You say it because someone else asked
                you a question, or made a comment)
              </li>
              <li>
                o Echoic = repeating what someone else says (You say it because
                someone else said it)
              </li>
              <li>
                o Imitation = repeating someone else’s motor movements (You move
                because someone else moved the same way)
              </li>
              <li>
                o Listener Responding/Receptive = following directions (You do
                what someone else asks you to do)
              </li>
            </ul>
          </li>
        </ul>
        <h3>Teaching Approach Examples</h3>
        <p>
          In Verbal Behavior programs, we focus on teaching all the meanings of
          a word. One word, such as 'cookie,' may be used for a variety of
          purposes – to label, to request, to answer a question, to repeat what
          someone else has said, and so forth. The same word may need to be
          taught as a mand, a tact, an echoic, an intraverbal, or as a receptive
          response so that the student can use the word for a full range of
          purposes.
        </p>
        <ul>
          <li>• Mand (When you want a cookie)</li>
          <li>• Tact (When you see, taste, or smell a cookie)</li>
          <li>• Echoic (When hear the word "cookie")</li>
          <li>
            • Intraverbal (When you respond to someone giving you an instruction
            about a cookie)
          </li>
          <li>
            • Mimetic (Motor Imitation) (When imitating a sign language gesture
            for the word "cookie" after someone else demonstrates the sign)
          </li>
          <li>
            • Listener Responding (Receptive) (You make the sign for cookie
            because someone else signed cookie)
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Verbal Operant</th>
              <th>Antecedent</th>
              <th>Behavior</th>
              <th>Consequence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mand</td>
              <td>Motivative Operation (MO) (want or desire for a cookie)</td>
              <td>
                Verbal behavior (says 'cookie', signs 'cookie', or exchanges a
                picture of a cookie)
              </td>
              <td>Direct reinforcement (gets a cookie)</td>
            </tr>
            <tr>
              <td>Tact</td>
              <td>
                Sensory stimuli (sees a cookie, smells cookies, tastes a cookie,
                hears someone eating a cookie, touches a cookie)
              </td>
              <td>
                Verbal behavior (says 'cookie', signs 'cookie', or exchanges a
                picture of a cookie)
              </td>
              <td>
                Nonspecific reinforcement (example: praise, such as 'You're
                right!', 'Great job!', high five, pat on the back, etc.)"
              </td>
            </tr>
            <tr>
              <td>Intraverbal</td>
              <td>Verbal stimulus (example: 'What do you like to eat?')</td>
              <td>
                Verbal behavior (says 'cookie', signs 'cookie', or exchanges a
                picture of a cookie)
              </td>
              <td>
                Nonspecific reinforcement (example: praise, such as 'You're
                right!', 'Great job!', high five, pat on the back, etc.)"
              </td>
            </tr>
            <tr>
              <td>Echoic</td>
              <td>Verbal stimulus (someone says 'cookie')</td>
              <td>Verbal stimulus (someone says 'cookie')</td>
              <td>
                Nonspecific reinforcement (example: praise, such as 'You're
                right!', 'Great job!', high five, pat on the back, etc.)"
              </td>
            </tr>
          </tbody>
        </table>
        <h3>How do we implement Verbal Behavior in the classroom?</h3>
        <p>
          First, we teach the child to cooperate and want to be with us. We do
          this by pairing ourselves with reinforcement. Pairing is the process
          by which we correlate the teaching environment and staff with the
          child’s reinforcers (their favorite items or activities) to eventually
          make them want to approach us. Then, we teach a child:
        </p>
        <ul>
          <li>• How to ask for what they want (MAND)</li>
          <li>• How to say what things are (TACT)</li>
          <li>• How to answer questions (INTRAVERBAL)</li>
          <li>• How to follow instructions (RECEPTIVE)</li>
          <li>
            • How to imitate others:
            <ul>
              <li>o What others say (ECHOIC)</li>
              <li>o What others do or how others move (MOTOR IMITATION)</li>
            </ul>
          </li>
        </ul>
        <p>
          In addition, we also teach other skills related to communication and
          social development. The specific skills taught depend on the
          individual needs of each student. Before we begin teaching children,
          we must first assess their skills, which can be done using one or more
          of the following assessment tools:
        </p>
        <ul>
          <li>• Basic Language Assessment Form (BLAF)</li>
          <li>• Assessment of Basic Language and Learning Skills (ABLLS)</li>
          <li>
            • Verbal Behavior Milestones Assessment and Placement Program
            (VB-MAPP)
          </li>
        </ul>
        <p>
          Beyond assessment, Verbal Behavior consultants will train instructors
          and classroom staff in program development and provide on-site guided
          practice. This may include modeling for the staff on how to implement
          specific programs or handle behaviors.
        </p>
        <p>
          <strong>References:</strong> Pennsylvania Verbal Behavior Project
          Family Handbook
        </p>
        <p>
          <strong>Websites:</strong>{" "}
          <Link
            href="https://www.drcarbone.net"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            www.drcarbone.net
          </Link>
          ,{" "}
          <Link
            href="https://www.marksundberg.com"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            www.marksundberg.com
          </Link>
          ,{" "}
          <Link
            href="https://www.pattan.net"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            www.pattan.net
          </Link>
          ,{" "}
          <Link
            href="https://www.VBapproach.com"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            www.VBapproach.com
          </Link>
          <Link
            href="https://www.VBNtraining.com"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            www.VBNtraining.com
          </Link>
        </p>
      </section>
      <section className={css.section}>
        <h2>B. Early Start Denver Model (ESDM)</h2>
        <p>
          The Early Start Denver Model (ESDM) is a therapy program for children
          with autism under age 5, combining Applied Behavior Analysis (ABA) and
          developmental science. Developed by Sally Rogers and Geraldine Dawson,
          it was recognized as a Top Medical Breakthrough by Time Magazine in
          2012. ESDM improves language, cognition, social skills, adaptive
          skills, and behavior. ESDM is a play-based form of ABA therapy,
          blending ABA principles with developmental science to teach
          communication and social skills using children's natural interests.
        </p>
        <p>Key points:</p>
        <ul>
          <li>
            • Focuses on normal toddler development and positive relationships.
          </li>
          <li>
            • Teaching happens during natural play and everyday activities.
          </li>
          <li>• Encourages interaction and communication through play.</li>
          <li>
            • Can be used at home, in clinics, or schools, both in groups and
            one-on-one.
          </li>
          <li>
            • Effective for children with various learning styles and abilities.
          </li>
          <li>
            • Parent involvement is crucial, with therapists guiding families to
            practice strategies at home.
          </li>
        </ul>
        <p>
          ESDM helps children improve social, language, and cognitive skills,
          benefiting those with and without significant learning challenges.
        </p>
        <h3>How Can ESDM Be Used to Teach Children with Autism?</h3>
        <p>
          ESDM is implemented through structured yet naturalistic interactions
          between the child and a therapist, parent, or teacher. It can be
          delivered in <strong>home, clinic, or preschool settings</strong> and
          is highly individualized to meet the child's developmental level.
        </p>
        <h3>Key Strategies in ESDM for Teaching Children with Autism:</h3>
        <ol>
          <li>
            <strong>1. Naturalistic Play-Based Learning</strong>
            <ul>
              <li>
                o Learning occurs in <strong>fun, engaging activities</strong>{" "}
                rather than structured, table-top drills.
              </li>
              <li>
                o The therapist follows the child’s interests to build
                motivation and engagement.
              </li>
            </ul>
          </li>
          <li>
            <strong>2. Joint Attention & Social Engagement</strong>
            <ul>
              <li>
                o Therapists encourage turn-taking, eye contact, and shared
                activities to enhance <strong>social communication.</strong>
              </li>
              <li>
                o Example: If a child reaches for a toy, the therapist might
                hold it briefly and wait for eye contact before giving it to
                reinforce joint attention.
              </li>
            </ul>
          </li>
          <li>
            <strong>3. Imitation & Modeling</strong>
            <ul>
              <li>
                o The therapist <strong>models appropriate behaviors</strong>,
                and the child learns by imitating.
              </li>
              <li>
                o Example: If a therapist claps, they encourage the child to
                imitate the action by making it fun and rewarding.
              </li>
            </ul>
          </li>
          <li>
            <strong>4. Communication Enhancement</strong>
            <ul>
              <li>
                o Encourages{" "}
                <strong>both verbal and nonverbal communication</strong>{" "}
                (gestures, signs, or spoken words).
              </li>
              <li>
                o Example: If a child wants a snack, they may be encouraged to{" "}
                <strong>point, sign, or use words</strong> before receiving it.
              </li>
            </ul>
          </li>
          <li>
            <strong>5. Reinforcement Through Positive Interactions</strong>
            <ul>
              <li>
                <strong>o Natural reinforcement</strong>is used, meaning rewards
                are <strong>embedded in the activity</strong> (e.g., blowing
                bubbles continues only when the child interacts).
              </li>
              <li>
                o This increases <strong>intrinsic motivation</strong> to
                communicate and engage.
              </li>
            </ul>
          </li>
          <li>
            <strong>6. Flexible & Individualized Curriculum</strong>
            <ul>
              <li>
                o ESDM covers <strong>all developmental domains</strong>,
                including{" "}
                <strong>
                  language, cognition, motor skills, and social interaction.
                </strong>
              </li>
              <li>
                o The program is adjusted based on the child’s progress, and
                data is <strong>continuously monitored.</strong>
              </li>
            </ul>
          </li>
          <li>
            <strong>7. Parent Involvement</strong>
            <ul>
              <li>
                o Parents are trained to{" "}
                <strong>embed ESDM strategies into daily routines</strong>,
                making learning consistent throughout the day.
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <section className={css.section}>
        <h2>C. Benefits of an Intensive ABA intervention Classroom</h2>
        <p>
          <i>
            How can an Intensive ABA intervention classroom, with 15-30 hours
            per week, effectively promote skills and development in children
            with Autism Spectrum Disorder?
          </i>
        </p>
        <p>
          Autism Spectrum Disorder (ASD) presents challenges in social skills,
          communication, and behavior. Applied Behavior Analysis (ABA) therapy
          has become a leading intervention, offering structured approaches
          tailored to individual needs. However, the number and duration of
          therapy sessions play a crucial role in its effectiveness.
        </p>
        <p>
          Research suggests that 15-30 hours of ABA therapy per week provide
          significant benefits for children with ASD, leading to improvements
          across various developmental areas. Studies on program models support
          this notion, with Dawson and Osterling (1997) reporting similar
          intervention durations. Moreover, early intervention is key. Children
          starting ABA therapy before the age of 4-5 tend to make greater gains
          compared to those starting later (Harris & Handleman, 2000; Sheinkopf
          & Siegel, 1998). In essence, the more frequent and intensive the ABA
          therapy, the greater the potential for positive outcomes in children
          with ASD. Early intervention further enhances these benefits,
          highlighting its critical role in supporting development.
        </p>
        <h3>Enhanced Skill Acquisition:</h3>
        <p>
          Children with ASD often struggle with acquiring and mastering new
          skills, such as language, social interaction, and self-help abilities.
          ABA intervention provides structured and systematic teaching methods
          tailored to the individual's needs. With 15 to 30 hours of
          intervention per week, children have increased opportunities to
          practice and reinforce newly learned skills. This intensive approach
          enhances skill acquisition, promotes generalization to different
          environments, and fosters greater independence over time.
        </p>
        <h3>Behavioral Improvement:</h3>
        <p>
          Challenging behaviors are common among children with ASD and can
          significantly impact their daily functioning and social interactions.
          ABA interventions focus on understanding the underlying functions of
          these behaviors and implementing strategies to address them
          effectively. With regular sessions totaling 15 to 30 hours per week,
          therapists can identify triggers, teach alternative behaviors, and
          implement reinforcement techniques consistently. Over time, this
          intensive intervention can lead to significant reductions in problem
          behaviors and improvements in emotional regulation and self-control.
        </p>
        <h3>Social and Communication Development:</h3>
        <p>
          Social and communication deficits are hallmark features of ASD, often
          hindering children's ability to connect with others and engage in
          meaningful interactions. ABA therapy targets these areas by teaching
          essential social skills, such as turn-taking, initiating
          conversations, and understanding nonverbal cues. Through frequent and
          structured sessions, children with ASD have the opportunity to
          practice these skills in controlled settings and gradually generalize
          them to real-life situations. The consistent exposure to social and
          communication goals within 15 to 30 hours of ABA intervention per week
          fosters significant improvements in peer interaction, social
          reciprocity, and overall communication abilities.
        </p>
        <h3>Family Involvement and Generalization:</h3>
        <p>
          The involvement of families and caregivers is integral to the success
          of ABA therapy. With 15 to 30 hours of intervention per week, parents
          and caregivers have ample opportunities to learn and implement ABA
          techniques in naturalistic settings. Therapists provide ongoing
          support, training, and guidance to ensure that strategies taught
          during therapy sessions are reinforced at home and in community
          settings. This collaborative approach promotes generalization of
          skills across various environments and strengthens the child's support
          network, leading to more consistent progress and long-term success.
        </p>
        <h3>Conclusion:</h3>
        <p>
          Research and clinical evidence support the efficacy of receiving 15 to
          30 hours of ABA intervention per week for children with Autism
          Spectrum Disorder. This intensive approach enables targeted skill
          acquisition, reduces challenging behaviors, fosters social and
          communication development, and promotes generalization of skills
          across settings. By providing structured and evidence-based
          interventions at optimal frequency and intensity, children with ASD
          can achieve meaningful improvements in their functioning,
          independence, and quality of life.
        </p>
        <h3>References</h3>
        <ul>
          <li>
            Dawson, G., & Osterling, J. (1997). Early intervention in autism. In
            M. J. Guralnick (Ed.), The effectiveness of early intervention (pp.
            307–326). Baltimore: Brookes.
          </li>
          <li>
            Harris, S. L., & Handleman, J. S. (2000). Age and IQ at intake as
            predictors of placement for young children with autism: A four- to
            six-year follow-up. Journal of Autism and Developmental Disorders,
            30(2), 137–142.
          </li>
          <li>
            Sheinkopf, S. J., & Siegel, B. (1998). Home based behavioral
            treatment of young children with autism. Journal of Autism and
            Developmental Disorders, 28(1), 15–23.
          </li>
          <li>
            Lovaas, O. I. (1987). Behavioral treatment and normal educational
            and intellectual functioning in young autistic children. Journal of
            Consulting and Clinical Psychology, 55(1), 3–9.
          </li>
          <li>
            National Research Council. (2001). Educating Children with Autism.
            Committee on Educational Interventions for Children with Autism.
            Division of Behavioral and Social Sciences and Education.
            Washington, DC: National Academy Press.
          </li>
          <li>
            Dawson, G., Rogers, S., Munson, J., Smith, M., Winter, J., Greenson,
            J., & Varley, J. (2010). Randomized, controlled trial of an
            intervention for toddlers with autism: The Early Start Denver Model.
            Pediatrics, 125(1), e17-e23.
          </li>
          <li>
            Virués-Ortega, J., Rodríguez, V., & Yu, C. T. (2013). Meta-analysis
            of early intensive behavioral intervention for children with autism.
            Journal of Clinical Child & Adolescent Psychology, 42(4), 512-524.
          </li>
          <li>https://www.autismspeaks.org/early-start-denver-model-esdm</li>
          <li>
            https://soarautismcenter.com/learning-center/overview-of-the-early-start-denver-model-esdm/
          </li>
          <li>
            https://raisingchildren.net.au/autism/therapies-guide/applied-behaviour-analysis-aba
          </li>
        </ul>
      </section>
    </div>
  );
}
