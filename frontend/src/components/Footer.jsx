import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h4 className="text-lg font-semibold">FinanceTracker</h4>
          <p className="text-sm text-gray-400">Track your cash. Take control.</p>
        </div>

        <div className="flex gap-6 text-xl">
          <a
            href="https://github.com/aitezazdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/aitezaz-sikandar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:zazcodes@gmail.com"
            className="hover:text-white transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FinanceTracker. Some rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
