import { ChevronRightCircle } from "lucide-react";
import { useMapContext } from "../map-provider";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

const SideBarToggles = () => {
  const { setSideBar, setKey, setRightSideBar, rightSideBar, sideBar } =
    useMapContext();

  return (
    <div className="flex items-center justify-between w-full z-50">
      {/* Right Side Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                setRightSideBar((prev) => !prev);
                setKey((prev) => prev + 1);
              }}
              className={`fixed  -translate-x-1/2 -translate-y-1/2 top-1/2 ${
                rightSideBar ? "left-[30%]" : "left-8"
              } flex items-center justify-center p-2 bg-black/20 rounded-full shadow-lg`}
            >
              <ChevronRightCircle
                className={`text-sunbird-navy-blue transition-all ease duration-75 hover:opacity-60 ${
                  rightSideBar && "transform rotate-180"
                }`}
                fontWeight={800}
                size={30}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-white">
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
              className={`${
                sideBar ? "left-[78%]" : "left-[97%]"
              } fixed  -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center justify-center p-2 bg-black/20 rounded-full shadow-lg`}
            >
              <ChevronRightCircle
                className={`text-sunbird-navy-blue transition-all ease duration-75 hover:opacity-60 ${
                  !sideBar && "transform rotate-180"
                }`}
                fontWeight={800}
                size={30}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-white">
            {rightSideBar ? "Hide filters" : "Show filters"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SideBarToggles;
