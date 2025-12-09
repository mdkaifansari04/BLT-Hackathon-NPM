import React from "react";
import type { HackathonConfig } from "../../types/config.js";
import Header from "./header.js";
import Footer from "./shared/footer.js";

const BLTHackathon = (config: HackathonConfig) => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></main>
      <Footer />
    </>
  );
};

export default BLTHackathon;
