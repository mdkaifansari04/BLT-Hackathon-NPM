import React from "react";

function Header(props: { endDate: Date }) {
  const currentDate = Date.now();
  const isOngoing = currentDate < props.endDate.getTime();
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
            <span className="px-3 py-1 rounded-full text-sm font-medium">{isOngoing ? "Ongoing" : "Ended"}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
