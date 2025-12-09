import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
        <p>
          Powered by{" "}
          <a href="https://github.com/OWASP-BLT/BLT-Hackathon" className="text-red-600 hover:underline" target="_blank">
            BLT-Hackathon
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
