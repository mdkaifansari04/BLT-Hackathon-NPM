import React from "react";

interface StatsProps {
  participantCount?: number;
  prCount?: number;
  mergedPrCount?: number;
  issueCount?: number;
  repoCount?: number;
}
function Stats(props: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Participants</h3>
        <p className="text-3xl font-bold text-red-600" id="participant-count">
          {props.participantCount ?? 0}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Pull Requests</h3>
        <p className="text-3xl font-bold text-red-600" id="pr-count">
          {props.prCount ?? 0}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Merged PRs</h3>
        <p className="text-3xl font-bold text-red-600" id="merged-pr-count">
          {props.mergedPrCount ?? 0}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Issues</h3>
        <p className="text-3xl font-bold text-red-600" id="issue-count">
          {props.issueCount ?? 0}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Repositories</h3>
        <p className="text-3xl font-bold text-red-600" id="repo-count">
          {props.repoCount ?? 0}
        </p>
      </div>
    </div>
  );
}

export default Stats;
