"use client";

// import necessaryhooks from react
import { useState, useEffect, useMemo } from "react";

// import custom UI components from the UI drectory
import { Card } from "./ui/card";
import { Button } from "./ui/button";

// Default export of the Ditital Clock component function
export default function DigitalClockComponent() {
  // state hooks for managing the current tiem, time format (24hr or 12hr)
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Effect hook to run on component mount
  useEffect(() => {
    setMounted(true); // set mounted status to ture
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // cleanup the interval on component unmounte
  }, []);
  // Memoized computation of formated time to avoid unnecessary recalculations
  const formatedTime = useMemo<string>(() => {
    if (!mounted) return ""; // don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // formated hours in 24 hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // formated hours in 12 hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // formated minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // formated seconds
    return `${hours}:${minutes}:${seconds}`; //\return formated time string
  }, [time, is24Hour, mounted]); // Dependencies to re-run the memoized function
  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center relative bg-[url('/clockbg.gif')]">
      {/* Center the digital clock within the screen */}
      <Card className="absolute w-full  max-w-md p-6 rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-4xl text-orange-800 font-bold tracking-tight uppercase ">
            Digital Clock
          </div>
          {/* Description */}
          <div className="text-sm text-gray-500 text-center dark:text-gray-400 mb-4">
            Display current time in hours, minutes and seconds
          </div>
          {/* Display the formated time */}
          <div className="text-6xl font-bold tracking-tight">
            {formatedTime}
          </div>
          {/* Button to switch between 24-hour and 12 hour formats */}
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold"
            >
              24-Hour Format
            </Button>
            <Button
              variant={is24Hour ? "outline" : "default"}
              onClick={() => setIs24Hour(false)}
              className=" mr-2 font-bold"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
