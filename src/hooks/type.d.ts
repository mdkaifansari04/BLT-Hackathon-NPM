// Type definitions for internal data structures
export interface DailyActivity {
  total: number;
  merged: number;
}

export interface ParticipantData {
  user: {
    username: string;
    email: string;
    id: string;
  };
  count: number;
  prs: GithubPR[];
  is_contributor: boolean;
  avatar: string;
  url: string;
  reviews: GithubPRReview[];
  reviewCount: number;
  mergedCount: number;
}

export interface RepoStats {
  total: number;
  merged: number;
  issues: number;
  closedIssues: number;
}

export interface PRStats {
  totalPRs: number;
  totalIssues: number;
  closedIssues: number;
  mergedPRs: number;
  participants: Map<string, ParticipantData>;
  dailyActivity: Record<string, DailyActivity>;
  repoStats: Record<string, RepoStats>;
}

export interface LeaderboardEntry {
  user: {
    username: string;
    email: string;
    id: string;
  };
  count: number;
  prs: GithubPR[];
  is_contributor: boolean;
  username: string;
  avatar: string;
  url: string;
  mergedCount: number;
}

export interface ReviewLeaderboardEntry {
  user: {
    username: string;
    email: string;
    id: string;
  };
  count: number;
  reviews: GithubPRReview[];
  is_contributor: boolean;
  username: string;
  avatar: string;
  url: string;
  reviewCount: number;
}

export interface IssueStats {
  totalIssues: number;
  closedIssues: number;
}
