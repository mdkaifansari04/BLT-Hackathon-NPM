export interface HackathonConfig {
  name: string;
  description?: string;
  rules?: string;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  github: {
    token: string;
    repositories: string[];
  };

  prizes: Prize[];

  sponsors?: Sponsor[];

  sponsorNote?: string;
  sponsorLink?: string;

  display: {
    showRepoStats: boolean;
    maxLeaderboardEntries: number;
    showPRsInLeaderboard: boolean;
  };
}

export interface Prize {
  position: number;
  title: string;
  description: string;
  value?: string;
}

export interface Sponsor {
  name: string;
  level: "platinum" | "gold" | "silver" | "bronze" | "partner";
  logo: string;
  website: string;
}
