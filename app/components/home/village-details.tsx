//@ts-ignore
import geoData from "@/public/geojson_maps/lamwo_villages.geojson";
import { useEffect, useState } from "react";
import villages from "@/public/villages.json";
import {
  BarChart,
  RadialAreaChart,
  RadialAxis,
  PieChart,
  PieArcSeries,
} from "reaviz";
import { measureCoordDistance } from "@/utils";
import { MapIcon } from "lucide-react";
import { categoriesVillages } from "@/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Feature } from "geojson";
import { useMapContext } from "../../providers/map-provider";
import { handleFeatureSelection } from "@/lib/highlight-features";
import useWindowDimensions from "@/hooks/window-dimensions";

const VillageDetails = ({ data }: { data: any }) => {
  const [NESCategoryData, setNESCategory] = useState<any>([]);
  const [nearbyAreas, setNearbyAreas] = useState<any>([]);
  const {
    mapRef,
    setDetailsVillage,
    setFilteredBuildings,
    selectedFeature,
    setSelectedFeature,
    setScreen,
    filteredBuildings,
  } = useMapContext();
  const { width } = useWindowDimensions();

  const getCategory = (cat: string) => {
    const category = categoriesVillages.find((c) => c.category === cat);
    console.log("fff", category);
    return category?.text;
  };

  getCategory("Grid extension");

  const villagesData = villages.map((village) => {
    return {
      ...village,
      NES_category: getCategory(village.NES_category),
    };
  });

  let nesData: any = [];
  let totalEmissions = 0;
  let nearAreas: any = [];

  useEffect(() => {
    if (!data) return;

    // plot NES electrification strategy
    villagesData.forEach((village: any) => {
      let psInstance = nesData.find((y: any) => y.key === village.NES_category);

      if (psInstance) {
        psInstance.data += 1;
      } else {
        nesData.push({
          key: String(village.NES_category),
          data: 1,
        });
      }
      totalEmissions += 1;
    });

    nesData.forEach((x: any) => {
      if (x.data !== 0) {
        x.data = (x.data / totalEmissions) * 100;
      } else {
        x.data = 0;
      }
    });

    nesData = nesData.sort((a: any, b: any) => b.data - a.data);
    setNESCategory(nesData);

    // produce data for the nearby areas to explore
    villagesData.forEach((x: any) => {
      if (data.latitude && data.longitude) {
        x.distanceFromArea = measureCoordDistance(
          data.latitude,
          data.longitude,
          x.latitude,
          x.longitude,
          "k"
        );
        nearAreas.push(x);
      }
    });

    nearAreas = nearAreas.sort(
      (a: any, b: any) => a.distanceFromArea - b.distanceFromArea
    );
    setNearbyAreas(nearAreas);
  }, [data]);

  const feature = geoData.features.find(
    (village: Feature) => village?.properties?.ID === data.ID
  );
  const handleClick = () => {
    console.log("feature", feature);

    if (feature && width >= 1024) {
      feature.id = data.ID;
      const results = handleFeatureSelection(
        mapRef,
        feature,
        selectedFeature,
        filteredBuildings
      );
      setFilteredBuildings(results?.newFilteredBuildings);
      setSelectedFeature(results?.newSelectedFeature);
    }
    setScreen("Villages Details");
    setDetailsVillage(data);
  };
  if (!data) {
    return <div>Loading...</div>; // Return a loading message when no data is passed
  }

  return (
    <>
      <div className="cover-card">
        <img
          src={
            "https://images.unsplash.com/photo-1536481046830-9b11bb07e8b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=30"
          }
          alt="details"
        />
        <h1>{data.village || "No village name available"}</h1>
      </div>

      <div className="research-tab pt-5 text-[14px]">
        <h2 className="my-2 text-lg font-extrabold text-sunbird-navy-blue">
          Electrification of {data.village || "N/A"}
        </h2>
        <p>
          <span className="text-highlight-blue">{data.village}</span> is a
          village located in{" "}
          <span className="text-highlight-blue">{data.parish || "N/A"}</span>{" "}
          parish and{" "}
          <span className="text-highlight-blue">{data.subcounty || "N/A"}</span>{" "}
          sub-county in Lamwo.
        </p>

        <h3 className="text-highlight-blue font-bold my-2">
          Proposed NES strategy: {data.NES_category || "N/A"}
        </h3>

        <p>
          For this particular village, our analysis from current data sources is
          as follows:
        </p>

        <ol className="mt-3 pl-8">
          <li>
            <strong>Number of buildings</strong> - {data.num_buildings || 0} (
            {data.num_permanent_buildings || 0} permanent)
          </li>
          <li>
            <strong>Num of buildings in 1 Km radius</strong> -{" "}
            {data.max_num_buildings_in_1km_radius || 0}
          </li>
          <li>
            <strong>Mean wind speed</strong> - {data.mean_wind_speed || "N/A"}{" "}
            m/s
          </li>
          <li>
            <strong>Vegetation percentile</strong> -{" "}
            {data.vegetation_percentile || "N/A"}
          </li>
          <li>
            <strong>Num of commercial facilities</strong> -{" "}
            {data.num_commercial_facilities || 0}
          </li>
          <li>
            <strong>Num of education facilities</strong> -{" "}
            {data.num_education_facilities || 0}
          </li>
          <li>
            <strong>Num of health facilities</strong> -{" "}
            {data.num_health_facilities || 0}
          </li>
          <li>
            <strong>Num of religious facilities</strong> -{" "}
            {data.num_religious_facilities || 0}
          </li>
          <li>
            <strong>Num of admin facilities</strong> -{" "}
            {data.num_admin_facilities || 0}
          </li>
        </ol>

        <div className="pl-3 mt-4 flex items-center justify-center w-full">
          <BarChart
            height={280}
            className="mt-4"
            data={[
              { key: "# Buildings", data: data.num_buildings || 0 },
              {
                key: "# Permanent Buildings",
                data: data.num_permanent_buildings || 0,
              },
              {
                key: "# Buildings(1Km)",
                data: data.max_num_buildings_in_1km_radius || 0,
              },
            ]}
          />
        </div>

        <h2 className="mt-4 text-lg font-extrabold text-sunbird-navy-blue">
          Potential for renewable energy
        </h2>
        <div className="cover-card mt-2">
          <img
            src="https://images.unsplash.com/photo-1592833159117-ac790d4066e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=20"
            alt="details"
          />
        </div>

        {/* Power Demand Analysis */}
        <div>
          {data.power_demand_analysis &&
          data.power_demand_analysis.length > 0 ? (
            data.power_demand_analysis.map((element: any, index: number) => (
              <div key={index}>
                <h4 className="text-highlight-blue font-bold mt-2">
                  Power demand analysis for {element.source}
                </h4>
                <p>{element.detail}</p>
                <span>
                  <strong>
                    {element.factor_in_favour
                      ? "HIGH POTENTIAL"
                      : "LOW POTENTIAL"}
                  </strong>
                </span>
              </div>
            ))
          ) : (
            <p>No power demand analysis available.</p>
          )}
        </div>

        {/* Power Supply Analysis */}
        <div>
          {data.power_supply_analysis &&
          data.power_supply_analysis.length > 0 ? (
            data.power_supply_analysis.map((element: any, index: number) => (
              <div className="content" key={index}>
                <h4 className="text-highlight-blue font-bold mt-2">
                  Power supply analysis for {element.source}
                </h4>
                <p>{element.detail}</p>
                <span>
                  <strong>
                    {element.factor_in_favour
                      ? "HIGH POTENTIAL"
                      : "LOW POTENTIAL"}
                  </strong>
                </span>
              </div>
            ))
          ) : (
            <p>No power supply analysis available.</p>
          )}
        </div>

        <h3 className="mt-4 my-2 flex gap-2 items-center ">
          <MapIcon
            size={15}
            fontWeight={700}
            className="la la-map text-highlight-blue mr-1"
          />
          <span className="text-lg font-extrabold text-sunbird-navy-blue ">
            Explore Nearby Areas:
          </span>
        </h3>

        <Carousel className="area-explorer relative ">
          <CarouselContent className="w-full mb-9">
            {nearbyAreas.map((item: any, index: number) => (
              <CarouselItem
                key={index}
                className="basis-1/2 group cursor-pointer"
              >
                <div className="area-item" onClick={handleClick}>
                  <div className="w-full overflow-hidden rounded-[5px] mb-2">
                    <img
                      className=" hover:transform hover:scale-105 transition-all ease duration-75"
                      src="https://images.unsplash.com/photo-1536481046830-9b11bb07e8b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=10"
                      alt="area image"
                    />
                  </div>

                  <span>
                    <strong className="line-clamp-1">{item.village}</strong>
                  </span>
                  <span className="text-highlight-blue">
                    {item.distanceFromArea.toFixed(3)} km
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute mb-4  bottom-2 left-1/2  -translate-x-1/2 -translate-y-1/2 flex  justify-between flex-nowrap gap-5">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

        <hr />

        <h2 className="my-4 text-lg text-sunbird-navy-blue font-extrabold">
          Overall electrification outlook for Lamwo
        </h2>
        <p>
          Based on the National Electrification Strategy, the current
          electrification options for villages in Lamwo look like this:
        </p>

        <div className="flex items-center justify-center w-full">
          <RadialAreaChart
            data={NESCategoryData}
            height={350}
            width={300}
            className="mr-auto"
            axis={<RadialAxis type="category" />}
          />
        </div>

        <p className="mt-5">
          This chart shows that the district is predominantly targeted for Solar
          Home Systems with an emphasis on grid extension as an electrification
          option.
        </p>

        <div className="ml-3 flex items-center justify-center w-full">
          <PieChart
            height={250}
            width={250}
            displayAllLabels={false}
            data={NESCategoryData}
            series={
              <PieArcSeries
                cornerRadius={3}
                padAngle={0.02}
                padRadius={200}
                doughnut={true}
                colorScheme={["#bc5090", "#ff6361", "#ffa600"]}
              />
            }
          />
        </div>

        <ol className="my-3 pl-8">
          {NESCategoryData.map((x: any) => (
            <li key={x.key}>
              <strong>{x.key}</strong> - {x.data.toFixed(3)}%
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default VillageDetails;
