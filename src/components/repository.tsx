import React from "react";
import { IssueStats, PRStats } from "../hooks/type";

interface RepositoryProps {
  stats: PRStats;
  repository: string[];
  showRepositoryStats: boolean;
}

interface RepositoryCardProps {
  repoPath: string;
  showRepositoryStats: boolean;
  stats: PRStats;
}
function Repository(props: RepositoryProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        <i className="fas fa-code-branch mr-2 text-red-600"></i>
        Repositories
      </h2>
      <div className="space-y-4">
        {props.repository.map((repoPath) => (
          <RepositoryCard key={`repo-card-${repoPath}`} repoPath={repoPath} showRepositoryStats={props.showRepositoryStats} stats={props.stats} />
        ))}
      </div>
    </div>
  );
}

function RepositoryCard(props: RepositoryCardProps) {
  console.log("props", props);

  const eachRepoStats = props.stats.repoStats[props.repoPath] || { total: 0, merged: 0, issues: 0, closedIssues: 0 };
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <i className="fab fa-github text-gray-600 mr-2"></i>
          <a href={`https://github.com/${props.repoPath}`} target="_blank" className="font-medium hover:text-red-600">
            ${props.repoPath}
          </a>
        </div>
      </div>
      {props.showRepositoryStats && (
        <div className="flex gap-4 text-sm text-gray-600 mb-2">
          <span className="flex items-center">
            <i className="fas fa-code-branch mr-1 text-blue-500"></i>
            <strong>${eachRepoStats.total}</strong> PRs (<strong>${eachRepoStats.merged}</strong> merged)
          </span>
          <span className="flex items-center">
            <i className="fas fa-circle-dot mr-1 text-green-500"></i>
            <strong>${eachRepoStats.issues || 0}</strong> Issues (<strong>${eachRepoStats.closedIssues || 0}</strong> closed)
          </span>
        </div>
      )}
      <div className="flex gap-2">
        <a href={`https://github.com/${props.repoPath}`} target="_blank" className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
          <i className="fab fa-github mr-1"></i>
          GitHub
        </a>
        <a href={`https://github.com/${props.repoPath}/pulls`} target="_blank" className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
          <i className="fas fa-code-branch mr-1"></i>
          Pull Requests
        </a>
        <a href={`https://github.com/${props.repoPath}/issues`} target="_blank" className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
          <i className="fas fa-circle-dot mr-1"></i>
          Issues
        </a>
      </div>
    </div>
  );
}

export default Repository;
