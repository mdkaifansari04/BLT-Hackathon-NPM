import React from "react";

interface BannerProps {
  hackathonName: string;
  startDate: string;
  endDate: string;
}
function Banner(props: BannerProps) {
  return (
    <div className="relative rounded-lg overflow-hidden mb-8 h-64 bg-linear-to-r from-red-600 to-red-800 flex items-center justify-center" id="banner-section">
      <div className="text-center text-white p-4">
        <h2 className="text-4xl font-bold mb-2" id="hackathon-name">
          {props.hackathonName}
        </h2>
        <p className="text-xl mb-2" id="hackathon-dates">
          {props.startDate} - {props.endDate}
        </p>
        <p className="text-lg" id="time-remaining">
          {`Time Remaining: ${Math.max(0, Math.floor((new Date(props.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days`}
        </p>
      </div>
    </div>
  );
}

export default Banner;
