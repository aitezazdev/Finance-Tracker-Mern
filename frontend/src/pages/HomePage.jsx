import React from "react";
import { FaWallet, FaChartPie, FaSyncAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen pt-10 text-gray-900 bg-gradient-to-b from-white via-gray-50 to-gray-100 font-sans">
      <section className="relative flex items-center justify-center h-[90vh] px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 opacity-40 -z-10"></div>
        <div className="max-w-5xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-gray-900 drop-shadow-lg">
            Track Your Expenses <br /> Like Never Before
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-700 font-light drop-shadow-sm">
            Stay on top of your finances with smart, easy-to-use features for tracking and budgeting.
          </p>
          <div>
            {!user ? (
              <Link
                to="/register"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-xl transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Get Started Free
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl shadow-xl transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-cyan-300"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 font-light">
            Your all-in-one personal finance tool with clear, smart features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaWallet className="text-indigo-500" />,
                title: "Smart Budgeting",
                desc: "Plan your spending with monthly category budgets and stay alert with instant updates.",
              },
              {
                icon: <FaChartPie className="text-indigo-500" />,
                title: "Visual Reports",
                desc: "See your money flow clearly with pie charts, bars, and savings graphs that make sense.",
              },
              {
                icon: <FaSyncAlt className="text-indigo-500" />,
                title: "Auto Tracking",
                desc: "Handle recurring income or bills with automatic schedules that save you time.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-indigo-50 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center border border-indigo-100"
              >
                <div className="text-5xl mb-6 p-5 bg-white rounded-full text-indigo-600 drop-shadow-md">
                  {icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-indigo-900">{title}</h3>
                <p className="text-indigo-700 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
            How It Works – Simple & Effective
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16 font-light">
            Start saving more in just three easy steps
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Create Account",
                desc: "Sign up and choose your currency, language, and theme — get started in seconds.",
                color: "from-indigo-500 to-indigo-700",
              },
              {
                step: "02",
                title: "Add Transactions",
                desc: "Add income and expenses manually or set them to auto-repeat for bills or salary.",
                color: "from-purple-500 to-purple-700",
              },
              {
                step: "03",
                title: "See Reports",
                desc: "Check dashboard, budget usage, and charts — know where your money goes easily.",
                color: "from-blue-500 to-blue-700",
              },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="relative bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 px-8 pt-20 pb-10 text-left">
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-white text-2xl font-extrabold shadow-lg select-none`}
                >
                  {step}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
                <p className="text-gray-700 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Loved by Thousands</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 font-light">
            Hear what real users say about using our expense tracker
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                quote:
                  "This app completely changed how I manage my money. I saved over 3 lacs Rs. in six months!",
                author: "Dawood A.",
                role: "Network Engineer",
              },
              {
                quote:
                  "The reports make it so easy to understand where my money is going. Budgeting finally works.",
                author: "Shah F.",
                role: "Software Engineer",
              },
              {
                quote:
                  "I’ve tried many finance apps, but this one is different. The UI is simple and powerful.",
                author: "Sama K.",
                role: "Hr Manager",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-indigo-50 rounded-2xl p-10 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div className="text-indigo-500 text-5xl font-serif mb-6 select-none">“</div>
                <p className="italic text-indigo-900 mb-8 leading-relaxed font-light">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-indigo-800">{testimonial.author}</p>
                  <p className="text-indigo-600 text-sm">{testimonial.role}</p>
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
