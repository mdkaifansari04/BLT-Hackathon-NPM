import React from "react";
import { Sponsor } from "../../../types/config";

interface SponsorLeaderboardProps {
  sponsors?: Sponsor[];
  sponsorNote?: string;
  sponsorLink?: string;
}

function SponsorLeaderboard(props: SponsorLeaderboardProps) {
  if (!props.sponsors || props.sponsors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          <i className="fas fa-handshake mr-2 text-red-600"></i>
          Sponsors
        </h2>
        <p className="text-gray-500 italic">No sponsors yet.</p>
        {(props.sponsorNote || props.sponsorLink) && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {props.sponsorNote && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Sponsorship Information</h3>
                <p className="text-gray-600">{props.sponsorNote}</p>
              </div>
            )}
            {props.sponsorLink && (
              <a href={props.sponsorLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                <i className="fas fa-handshake mr-2"></i>
                Become a Sponsor
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  const levels: Array<"platinum" | "gold" | "silver" | "bronze" | "partner"> = ["platinum", "gold", "silver", "bronze", "partner"];
  const grouped: Record<string, Sponsor[]> = {};
  levels.forEach((level) => {
    grouped[level] = [];
  });

  props.sponsors.forEach((sponsor) => {
    if (grouped[sponsor.level]) {
      grouped[sponsor.level].push(sponsor);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        <i className="fas fa-handshake mr-2 text-red-600"></i>
        Sponsors
      </h2>
      <div>
        {levels.map((level) => {
          const sponsors = grouped[level];
          if (sponsors.length === 0) return null;

          return (
            <div key={level} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold mb-3 capitalize">{level} Sponsors</h3>
              <div className="grid grid-cols-2 gap-4">
                {sponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.name} sponsor={sponsor} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SponsorCardProps {
  sponsor: Sponsor;
}

function SponsorCard(props: SponsorCardProps) {
  return (
    <a href={props.sponsor.website || "#"} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition">
      {props.sponsor.logo ? (
        <img src={props.sponsor.logo} alt={props.sponsor.name} className="h-12 object-contain mb-2" />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
          <span className="text-gray-500 font-bold">{props.sponsor.name.charAt(0)}</span>
        </div>
      )}
      <div className="text-center">
        <div className="text-sm font-medium">{props.sponsor.name}</div>
      </div>
    </a>
  );
}

export default SponsorLeaderboard;
