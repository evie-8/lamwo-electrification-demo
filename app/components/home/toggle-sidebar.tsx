import { ChevronRightCircle } from "lucide-react";
import { Tooltip } from "@radix-ui/react-tooltip";
import styles from "@/app/styles/toggle-sidebar.module.css";
import { useMapContext } from "@/app/providers/map-provider";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

const SideBarToggles = () => {
  const { setSideBar, setRightSideBar, rightSideBar, sideBar } =
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
