import { GithubUser } from "./user";

export interface GithubPRReview {
  id: number;
  node_id: string;
  user: GithubUser;
  body: string | null;
  state: string; // e.g. "COMMENTED", "APPROVED", "CHANGES_REQUESTED"
  html_url: string;
  pull_request_url: string;
  author_association: string;

  _links: {
    html: { href: string };
    pull_request: { href: string };
  };
  submitted_at: string;
  commit_id: string;
  repository: string;
  pull_request_title: string;
}
