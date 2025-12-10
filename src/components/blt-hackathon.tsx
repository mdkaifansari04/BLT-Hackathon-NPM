import React from "react";
import Header from "./shared/header";
import Footer from "./shared/footer";
import Stats from "./stats";
import Banner from "./banner";
import PrActivityChart from "./pr-activity-chart";
import Description from "./description";
import Repository from "./repository";
import Prizes from "./prizes";
import PRLeaderboard from "./leaderboard/pr-leaderboard";
import ReviewLeaderboard from "./leaderboard/review-leaderboard";
import SponsorLeaderboard from "./leaderboard/sponser-leaderboard";

import { GitHubAPI } from "../hooks/useGithubApi";
import { LeaderboardEntry, PRStats, ReviewLeaderboardEntry } from "../hooks/type";
import { GithubPR } from "../../types/github/pr";
import { GithubIssue } from "../../types/github/issue";
import { GithubPRReview } from "../../types/github/review";
import { HackathonConfig } from "../../types/config";
import { ChartSkeleton, LeaderboardSkeleton, RepositorySkeleton } from "./shared/skeleton";

const BLTHackathon = ({ config }: { config: HackathonConfig }) => {
  const githubApi = new GitHubAPI(config.github.token);
  const startDate = new Date(config.startTime);
  const endDate = new Date(config.endTime);

  const [prs, setPrs] = React.useState<GithubPR[]>([]);
  const [issues, setIssues] = React.useState<GithubIssue[]>([]);
  const [reviews, setReviews] = React.useState<GithubPRReview[]>([]);
  const [stats, setStats] = React.useState<PRStats | null>(null);
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardEntry[]>([]);
  const [reviewLeaderboard, setReviewLeaderboard] = React.useState<ReviewLeaderboardEntry[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const prs = await githubApi.getAllPullRequests(config.github.repositories, startDate, endDate);
      const issues = await githubApi.getAllIssues(config.github.repositories, startDate, endDate);
      const reviews = await githubApi.getAllReviews(config.github.repositories, startDate, endDate);
      const stats = await githubApi.processPRData(prs, startDate, endDate);

      // Process review data BEFORE generating review leaderboard
      githubApi.processReviewData(reviews, stats.participants);

      // Process issue data
      const issueStats = githubApi.processIssueData(issues, stats.repoStats);
      stats.totalIssues = issueStats.totalIssues;
      stats.closedIssues = issueStats.closedIssues;

      // Generate leaderboards AFTER all data is processed
      const leaderboard = githubApi.generateLeaderboard(stats.participants, config.display.maxLeaderboardEntries);
      const reviewLeaderboard = githubApi.generateReviewLeaderboard(stats.participants, config.display.maxLeaderboardEntries);

      setPrs(prs);
      setIssues(issues);
      setReviews(reviews);
      setStats(stats);
      setLeaderboard(leaderboard);
      setReviewLeaderboard(reviewLeaderboard);
      setLoading(false);
    };
    if (config.github.token) fetchData();
  }, [config]);

  return (
    <>
      <Header startDate={startDate} endDate={endDate} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Banner hackathonName={config.name} startDate={config.startTime} endDate={config.endTime} />
        <Stats participantCount={stats?.participants.size || 0} issueCount={stats?.totalIssues || 0} mergedPrCount={stats?.mergedPRs || 0} repoCount={config.github.repositories.length} />

        {/* PR Activity Chart with skeleton */}
        {loading ? <ChartSkeleton /> : stats && <PrActivityChart dailyActivity={stats.dailyActivity} prs={prs} />}

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* left column */}
          <div className="lg:col-span-2">
            <Description description={config.description!} rules={config.rules!} />
            {loading ? <RepositorySkeleton /> : stats && <Repository repository={config.github.repositories} stats={stats} showRepositoryStats={config.display.showRepoStats} />}
            <Prizes prize={config.prizes} />
          </div>
          {/* right column*/}
          <div className="lg:col-span-1">
            {loading ? (
              <>
                <LeaderboardSkeleton />
                <LeaderboardSkeleton />
              </>
            ) : (
              <>
                <PRLeaderboard showPrs={config.display.showPRsInLeaderboard} leaderboard={leaderboard} />
                <ReviewLeaderboard leaderboard={reviewLeaderboard} />
              </>
            )}
            <SponsorLeaderboard sponsors={config.sponsors} sponsorNote={config.sponsorNote} sponsorLink={config.sponsorLink} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BLTHackathon;
