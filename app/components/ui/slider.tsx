"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/shadcn-utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100">
      <SliderPrimitive.Range className="absolute h-full bg-sunbird-navy-blue" />
    </SliderPrimitive.Track>
    {props.value?.map((_, index) => (
      <SliderPrimitive.Thumb
        key={index}
        className="block h-5 w-5 rounded-full border-2 border-sunbird-navy-blue bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export function DualThumbSlider() {
  const [value, setValue] = React.useState<[number, number]>([20, 80]); // Initial values for two thumbs

  const handleValueChange = (newValue: [number, number]) => {
    // Ensure that the first thumb does not go past the second thumb, and vice versa
    const clampedValue: [number, number] = [
      Math.min(newValue[0], value[1] - 1), // First thumb can't exceed second thumb - 1
      Math.max(newValue[1], value[0] + 1), // Second thumb can't be less than first thumb + 1
    ];
    setValue(clampedValue);
  };

  return (
    <div className="flex flex-col items-center">
      <Slider
        value={value}
        onValueChange={handleValueChange}
        max={100} // Slider's max value
        step={1} // Step size
        aria-label="Dual Thumb Slider"
      />
      {/* Display the values of each thumb */}
      <div className="flex justify-between w-full mt-2">
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
    </div>
  );
}
