import { GithubUser } from "./user";

export interface GithubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;

  id: number;
  node_id: string;
  number: number;

  title: string;
  user: GithubUser;

  labels: GithubLabel[];

  state: string;
  locked: boolean;

  assignee: GithubUser | null;
  assignees: GithubUser[];

  milestone: any | null;

  comments: number;

  created_at: string;
  updated_at: string;
  closed_at: string | null;

  author_association: string;

  type: string | null;

  active_lock_reason: string | null;

  sub_issues_summary: {
    total: number;
    completed: number;
    percent_completed: number;
  };

  issue_dependencies_summary: {
    blocked_by: number;
    total_blocked_by: number;
    blocking: number;
    total_blocking: number;
  };

  body: string | null;

  closed_by: GithubUser | null;

  reactions: GithubReactions;

  timeline_url: string;

  performed_via_github_app: any | null;

  state_reason: string | null;

  repository: string;
}

export interface GithubLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string | null;
}

export interface GithubReactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}
