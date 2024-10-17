import styles from "@/app/styles/project-resources.module.css";
import links from "@/public/research_links.json";
import Link from "next/link";

const ResearchTab = () => {
  return (
    <>
      {/**change this later */}
      <div className="cover-card">
        <img
          src={"/bkgrd-02.jpg"}
          alt="project"
         />
        <h1 >
          Resources
        </h1>
      </div>

      <p className={styles.description}>
        We provide resources and documentation related to the project here.
      </p>

      <div className={styles.contributors}>
        {links.map((contributor: any, index: number) => {
          return (
            <Link key={contributor.url} href={contributor.url} target="_blank">
              <div className={styles.contributor} key={index}>
                <img
                  alt="image"
                  width={50}
                  height={50}
                  src={contributor.profileImage}
                />
                <p>
                  <span>{contributor.name}</span>
                  <span>{contributor.info}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ResearchTab;
