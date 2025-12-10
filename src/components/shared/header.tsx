import React from "react";

function Header(props: { endDate: Date; startDate: Date }) {
  const currentDate = Date.now();
  const isOngoing = currentDate < props.endDate.getTime();
  let status, statusClass, timeRemaining;
  const startDate = new Date(props.startDate);
  const endDate = new Date(props.endDate);

  if (currentDate < startDate.getTime()) {
    status = "Upcoming";
    statusClass = "bg-blue-100 text-blue-800";
    const daysUntil = Math.ceil((startDate.getTime() - currentDate) / (1000 * 60 * 60 * 24));
    timeRemaining = `Starts in ${daysUntil} day${daysUntil !== 1 ? "s" : ""}`;
  } else if (currentDate > endDate.getTime()) {
    status = "Ended";
    statusClass = "bg-gray-100 text-gray-800";
    timeRemaining = "This hackathon has ended";
  } else {
    status = "Ongoing";
    statusClass = "bg-green-100 text-green-800";
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <i className="fas fa-trophy text-red-600 text-2xl mr-3"></i>
            <h1 className="text-xl font-bold text-gray-900" id="nav-title">
              Hackathon Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>{status}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
