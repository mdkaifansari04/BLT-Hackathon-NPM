import React from "react";

interface BannerProps {
  hackathonName: string;
  startDate: string;
  endDate: string;
}
function Banner(props: BannerProps) {
  const remaining = new Date(props.endDate).getTime() - new Date().getTime();
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const timeRemaining = `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""} remaining`;
  const dateFormat = { year: "numeric", month: "long", day: "numeric" } as const;
  const dateStr = `${new Date(props.startDate).toLocaleDateString("en-US", dateFormat)} - ${new Date(props.endDate).toLocaleDateString("en-US", dateFormat)}`;
  return (
    <div className="relative rounded-lg overflow-hidden mb-8 h-64 bg-linear-to-r from-red-600 to-red-800 flex items-center justify-center" id="banner-section">
      <div className="text-center text-white p-4">
        <h2 className="text-4xl font-bold mb-2" id="hackathon-name">
          {props.hackathonName}
        </h2>
        <p className="text-xl mb-2" id="hackathon-dates">
          {dateStr}
        </p>
        <p className="text-lg" id="time-remaining">
          {timeRemaining}
        </p>
      </div>
    </div>
  );
}

export default Banner;
