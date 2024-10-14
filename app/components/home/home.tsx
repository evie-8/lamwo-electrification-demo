import LayersSideBar from "./layer-sidebar";
import MainSideBar from "./main-sidebar";

const Home = () => {
  return (
    <section className="home-wrapper">
      <MainSideBar />
      <LayersSideBar />
    </section>
  );
};

export default Home;
