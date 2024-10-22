import styles from "@/app/styles/project-resources.module.css";
import links from "@/public/research_links.json";
import Image from "next/image";
import Link from "next/link";

const ResearchTab = () => {
  return (
    <>
      <div className="cover-card">
        <Image src={"/bkgrd-02.jpg"} alt="project" fill />
        <h1>Resources</h1>
      </div>

      <p className={styles.description}>
        We provide resources and documentation related to the project here.
      </p>

      <div className={styles.contributors}>
        {links.map((contributor: any, index: number) => {
          return (
            <Link key={contributor.url} href={contributor.url} target="_blank">
              <div className={styles.contributor} key={index}>
                <Image
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
