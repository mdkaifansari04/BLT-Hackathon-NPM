import React from "react";
import { LeaderboardEntry, PRStats } from "../hooks/type";
import { Trophy } from "lucide-react";

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  showPrs: boolean;
}

function Leaderboard(props: LeaderboardProps) {
  if (props.leaderboard.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          <i className="fas fa-medal mr-2 text-red-600"></i>
          Leaderboard
        </h2>
        <p className="text-gray-500 italic">No contributions yet. Be the first to contribute!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        <i className="fas fa-medal mr-2 text-red-600"></i>
        Leaderboard
      </h2>
      <div className="space-y-4">
        {props.leaderboard.map((participant, index) => (
          <LeaderboardCard key={participant.user.id} participant={participant} position={index + 1} showPRs={props.showPrs} />
        ))}
      </div>
    </div>
  );
}

interface LeaderboardCardProps {
  participant: LeaderboardEntry;
  position: number;
  showPRs: boolean;
}

function LeaderboardCard(props: LeaderboardCardProps) {
  let bgClass = "";
  let showTrophy = false;
  let trophyColor = "";

  if (props.position === 1) {
    bgClass = "bg-yellow-50";
    showTrophy = true;
    trophyColor = "text-yellow-500";
  } else if (props.position === 2) {
    bgClass = "bg-gray-50";
    showTrophy = true;
    trophyColor = "text-gray-400";
  } else if (props.position === 3) {
    bgClass = "bg-orange-50";
    showTrophy = true;
    trophyColor = "text-orange-600";
  }

  const mergedPRs = props.participant.prs.filter((pr) => pr.merged_at).slice(0, 5);

  return (
    <div className={`p-4 ${bgClass} rounded-lg border border-gray-200`}>
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 flex items-center justify-center mr-3 bg-gray-100 text-gray-600 rounded-full font-bold">{props.position}</div>
        <img src={props.participant.avatar} alt={props.participant.username} className="w-8 h-8 rounded-full mr-3" width="32" height="32" />
        <div className="flex-grow">
          <div className="font-medium flex items-center gap-2">
            <a href={props.participant.url} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              {props.participant.username}
            </a>
            {showTrophy && <Trophy className={`${trophyColor} w-5 h-5`} />}
          </div>
          <div className="text-sm text-gray-500">
            {props.participant.mergedCount} merged PR{props.participant.mergedCount !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
      {props.showPRs && mergedPRs.length > 0 && (
        <div className="mt-2 pl-11">
          <div className="text-sm font-medium text-gray-700 mb-2">Contributions:</div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {mergedPRs.map((pr) => (
              <a key={pr.id} href={pr.html_url} target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded border-l-4 border-red-600 transition">
                <div className="font-medium text-sm truncate">{pr.title}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="flex items-center">
                    <i className="fas fa-code-branch mr-1"></i>
                    {pr.repository}
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    <i className="far fa-calendar-alt mr-1"></i>
                    {new Date(pr.merged_at!).toLocaleDateString()}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
