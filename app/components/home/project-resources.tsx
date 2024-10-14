import links from "@/public/research_links.json";
import Link from "next/link";

const ResearchTab = () => {
  return (
    <div className="p-1">
      <div className="research-cover-card fade-in">
        <h1 className="mt-auto font-bold text-white text-xl  mb-1">
          Resources
        </h1>
      </div>
      <p className="my-2 text-[14px]">
        We provide resources and documentation related to the project here.
      </p>

      <div className="contributors mt-4">
        {links.map((contributor: any, index: number) => {
          return (
            <Link key={contributor.url} href={contributor.url} target="_blank">
              <div className="contributor" key={index}>
                <img
                  alt="image"
                  width={50}
                  height={50}
                  src={contributor.profileImage}
                />
                <div className="info">
                  <span className="name">{contributor.name}</span>
                  <span className="info">{contributor.info}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ResearchTab;
