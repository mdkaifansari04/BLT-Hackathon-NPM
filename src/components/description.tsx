import React from "react";

interface DescriptionProps {
  description: string;
  rules: string;
}
function Description(props: DescriptionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">About this Hackathon</h2>
      <div className="prose max-w-none" id="hackathon-description">
        <p className="text-gray-700">{props.description}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Rules</h3>
        <div className="prose max-w-none whitespace-pre-line">{props.rules}</div>
      </div>
    </div>
  );
}

export default Description;
