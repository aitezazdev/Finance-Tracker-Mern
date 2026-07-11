import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 mt-16 border-t border-zinc-900">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-black text-white tracking-tight">Finance Tracker</h4>
          <p className="text-sm text-zinc-500 mt-1 font-medium">Track your cash. Take control.</p>
        </div>

        <div className="flex gap-5 text-lg">
          <a
            href="https://github.com/aitezazdev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all border border-zinc-800/60"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/aitezaz-sikandar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all border border-zinc-800/60"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:aitezazsikandar@gmail.com"
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all border border-zinc-800/60"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-zinc-600 font-semibold">
        © {new Date().getFullYear()} Finance Tracker. Some rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
