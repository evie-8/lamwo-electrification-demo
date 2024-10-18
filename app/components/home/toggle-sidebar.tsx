import styles from "@/app/styles/toggle-sidebar.module.css";
import { ChevronRightCircle } from "lucide-react";
import { useMapContext } from "../../providers/map-provider";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

const SideBarToggles = () => {
  const { setSideBar, setKey, setRightSideBar, rightSideBar, sideBar } =
    useMapContext();

  return (
    <div className={styles.container}>
      {/* Right Side Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                setRightSideBar((prev) => !prev);
                setKey((prev) => prev + 1);
              }}
              className={"left-8"}
            >
              <ChevronRightCircle
                className={`${styles.icon} ${rightSideBar && styles.active}`}
                fontWeight={800}
                size={30}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {rightSideBar ? "Hide details" : "Show details"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Left Side Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                setSideBar((prev) => !prev);
                setKey((prev) => prev + 1);
              }}
              className={`-right-4`}
            >
              <ChevronRightCircle
                className={`${styles.icon} ${!sideBar && styles.active}`}
                fontWeight={800}
                size={30}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {sideBar ? "Hide filters" : "Show filters"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SideBarToggles;
