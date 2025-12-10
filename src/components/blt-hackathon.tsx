import React from "react";
import Header from "./shared/header";
import Footer from "./shared/footer";
import Banner from "./banner";
import { GitHubAPI } from "../hooks/useGithubApi";
import { GithubPR } from "../types/github/pr";
import { GithubIssue } from "../types/github/issue";
import { GithubPRReview } from "../types/github/review";
import { HackathonConfig } from "../types/config";

const BLTHackathon = ({ config }: { config: HackathonConfig }) => {
  const githubApi = new GitHubAPI(config.github.token);
  const startDate = new Date(config.startTime);
  const endDate = new Date(config.endTime);

  const [prs, setPrs] = React.useState<GithubPR[]>([]);
  const [issues, setIssues] = React.useState<GithubIssue[]>([]);
  const [reviews, setReviews] = React.useState<GithubPRReview[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const prs = await githubApi.getAllPullRequests(config.github.repositories, startDate, endDate);
      const issues = await githubApi.getAllIssues(config.github.repositories, startDate, endDate);
      const reviews = await githubApi.getAllReviews(config.github.repositories, startDate, endDate);

      setPrs(prs);
      setIssues(issues);
      setReviews(reviews);

      console.log("Prs:   ", JSON.stringify(prs[0]));
      console.log("Issues:  ", JSON.stringify(issues[0]));
      console.log("Reviews:     ", JSON.stringify(reviews[0]));
    };

    if (config.github.token) fetchData();
  }, [config]);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Banner hackathonName={config.name} startDate={config.startTime} endDate={config.endTime} />
      </main>
      <Footer />
    </>
  );
};

export default BLTHackathon;
