import Image from "next/image";
import Link from "next/link";

const AboutTab = () => {
  return (
    <div className="text-[14px] overflow-y-auto ">
      <Image
        src={"/memdlogo.svg"}
        className="mx-auto text-center"
        alt="logo"
        width={160}
        height={160}
      />
      <h2 className="mt-4 mb-3 text-sunbird-navy-blue font-extrabold text-xl">
        Ministry of Energy and Mineral Development
      </h2>
      <p className="leading-6">
        <Link
          className="text-highlight-blue"
          href="https://energyandminerals.go.ug/"
        >
          The Ministry of Energy and Mineral Development (MEMD)
        </Link>{" "}
        partnered with GIZ FAIR Forward and Sunbird AI to develop this system
        for green electrification of villages in Lamwo district as a pilot
        district. MEMD is the government of Uganda ministry responsible for
        rural electrification.
      </p>
      <h2 className="mt-4 mb-3 text-sunbird-navy-blue font-extrabold text-xl">
        GIZ FAIR Foward
      </h2>
      <p className="leading-6">
        <Link
          className="text-highlight-blue"
          href="https://www.giz.de/expertise/html/61982.html"
        >
          FAIR Forward - Artificial Intelligence for All
        </Link>{" "}
        strives for a more open, inclusive and sustainable approach to on an
        international level. FAIR Forward is dedicated to the open and
        sustainable development and application of artificial intelligence and
        particularly supports partnering countries in Africa and Asia on behalf
        of the Federal Ministry for Economic Cooperation and Development.
      </p>
      <h2 className="mt-4 mb-3 text-sunbird-navy-blue font-extrabold text-xl">
        Sunbird AI
      </h2>
      <p className="leading-6">
        Sunbird AI is a non-profit based in Uganda. Sunbird AI uses artificial
        intelligence to advance sustainable development in Africa and works to
        strengthen the AI ecosystem in Africa. We work with partners to use data
        technology to improve planning, policy, decision-making, and strengthen
        the feedback loop between citizens and policy makers. Artificial
        intelligence in particular has the potential to help Africa leapfrog the
        traditional constraints of infrastructure to improve human wellbeing. To
        take full advantage of AI opportunities in Africa, we also help African
        public sector institutions increase capacities and improve policies.
      </p>
      <p className="leading-6">
        Find out more at{" "}
        <Link className="text-highlight-blue" href="https://sunbird.ai">
          https://sunbird.ai
        </Link>
      </p>
    </div>
  );
};

export default AboutTab;