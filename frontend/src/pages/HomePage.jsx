import React from "react";
import { FaWallet, FaChartPie, FaSyncAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen pt-16 text-zinc-900 bg-zinc-50 font-sans">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[85vh] px-6 text-center overflow-hidden border-b border-zinc-200 bg-white">
        <div className="absolute inset-0 bg-radial from-emerald-50/20 via-transparent to-transparent -z-10"></div>
        <div className="max-w-4xl space-y-8 py-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-zinc-950">
            Track your expenses <br />
            <span className="text-emerald-600">with absolute clarity.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-500 font-medium leading-relaxed">
            A minimalist, high-fidelity personal finance tracker designed for builders, creators, and teams who value professional budgeting without the noise.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="inline-block bg-zinc-950 hover:bg-zinc-900 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-200 text-sm cursor-pointer"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="inline-block bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 font-bold px-8 py-4 rounded-xl shadow-xs transition-all duration-200 text-sm cursor-pointer"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-200 text-sm cursor-pointer"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white border-b border-zinc-250/60">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Designed for financial clarity
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-16 mt-3 text-sm font-semibold leading-relaxed">
            All the necessary tools to track cashflow, structure budgets, and analyze spending without bloated features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaWallet className="text-emerald-600" />,
                title: "Smart Budgeting",
                desc: "Establish monthly limits per category and track your margins in real time with subtle visual indicators.",
              },
              {
                icon: <FaChartPie className="text-emerald-600" />,
                title: "Structured Analytics",
                desc: "Access elegant bar charts, monthly trends, and clean categorical distribution breakdowns.",
              },
              {
                icon: <FaSyncAlt className="text-emerald-600" />,
                title: "Simplified Tracking",
                desc: "Record incomes and expenses inside a cohesive logging ledger built for speed and responsiveness.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-xs hover:border-zinc-250 hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="text-2xl mb-6 p-4 bg-zinc-50 rounded-xl text-emerald-600 border border-zinc-200">
                  {icon}
                </div>
                <h3 className="text-lg font-bold mb-2.5 text-zinc-950">{title}</h3>
                <p className="text-zinc-500 text-sm font-semibold leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            How it works
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-20 mt-3 text-sm font-semibold leading-relaxed">
            Take complete control of your finances in three simple, direct steps.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Create Account",
                desc: "Create an account in seconds and unlock a secure personal logging dashboard immediately.",
              },
              {
                step: "02",
                title: "Log Transactions",
                desc: "Quickly enter transaction values, categorize them correctly, and assign logging dates.",
              },
              {
                step: "03",
                title: "Analyze & Optimize",
                desc: "Review clean breakdown structures to pinpoint exactly where your cashflow can be optimized.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative bg-white rounded-3xl border border-zinc-200 shadow-xs hover:border-zinc-250 hover:shadow-sm transition-all duration-300 p-8 pt-16 text-left">
                <div
                  className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-zinc-950 flex items-center justify-center text-white text-base font-extrabold shadow-sm select-none"
                >
                  {step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-zinc-950">{title}</h3>
                <p className="text-zinc-500 text-sm font-semibold leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Trusted by creators
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-16 mt-3 text-sm font-semibold leading-relaxed">
            Hear from developers, designers, and managers who utilize Expensely to keep their trackings clean.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This platform has completely cleaned up how I monitor my freelance margins. Clean, straightforward, and no noise.",
                author: "Dawood A.",
                role: "Network Architect",
              },
              {
                quote:
                  "The monthly breakdowns make it incredibly easy to budget. Finally, a finance tracker that respects design aesthetics.",
                author: "Shah F.",
                role: "Software Designer",
              },
              {
                quote:
                  "No bloated metrics or annoying upsells. Just a solid ledger that loads instantly and keeps logs structured.",
                author: "Sama K.",
                role: "HR Director",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-xs hover:border-zinc-250 hover:shadow-sm transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div className="text-zinc-300 text-5xl font-serif mb-4 select-none leading-none">“</div>
                <p className="text-zinc-600 text-sm font-semibold leading-relaxed mb-6 italic">{testimonial.quote}</p>
                <div className="border-t border-zinc-200 pt-4">
                  <p className="font-extrabold text-zinc-900 text-sm">{testimonial.author}</p>
                  <p className="text-zinc-400 text-xs font-bold mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
