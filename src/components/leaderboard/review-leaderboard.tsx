import React from "react";
import { ReviewLeaderboardEntry } from "../../hooks/type";
import { Trophy } from "lucide-react";

interface ReviewLeaderboardProps {
  leaderboard: ReviewLeaderboardEntry[];
}

function ReviewLeaderboard(props: ReviewLeaderboardProps) {
  if (props.leaderboard.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          <i className="fas fa-eye mr-2 text-red-600"></i>
          Review Leaderboard
        </h2>
        <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        <i className="fas fa-eye mr-2 text-red-600"></i>
        Review Leaderboard
      </h2>
      <div className="space-y-4">
        {props.leaderboard.map((participant, index) => (
          <ReviewLeaderboardCard key={participant.user.id} participant={participant} position={index + 1} showReviews={true} />
        ))}
      </div>
    </div>
  );
}

interface ReviewLeaderboardCardProps {
  participant: ReviewLeaderboardEntry;
  position: number;
  showReviews: boolean;
}

function ReviewLeaderboardCard(props: ReviewLeaderboardCardProps) {
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

  const getReviewStateClass = (state: string) => {
    switch (state?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "changes_requested":
        return "bg-red-100 text-red-700";
      case "commented":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const recentReviews = props.participant.reviews ? props.participant.reviews.slice(0, 5) : [];

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
            {props.participant.is_contributor && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Contributor</span>}
          </div>
          <div className="text-sm text-gray-500">
            {props.participant.reviewCount} review{props.participant.reviewCount !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
      {props.showReviews && recentReviews.length > 0 && (
        <div className="mt-2 pl-11">
          <div className="text-sm font-medium text-gray-700 mb-2">Recent Reviews:</div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentReviews.map((review) => (
              <a key={review.id} href={review.html_url} target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded border-l-4 border-green-600 transition">
                <div className="font-medium text-sm truncate">{review.pull_request_title || "PR Review"}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="flex items-center">
                    <i className="fas fa-eye mr-1"></i>
                    {review.repository}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <i className="far fa-calendar-alt mr-1"></i>
                    {new Date(review.submitted_at).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span className={`px-1 rounded text-xs ${getReviewStateClass(review.state)}`}>{review.state}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewLeaderboard;
