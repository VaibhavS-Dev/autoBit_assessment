// Author: Vaibhav Srivastava

import React, { useEffect, useState } from "react";
import MarketCard from "./components/MarketCard";
import { Home, LineChart, History, User, Sun, Moon, X, Menu, Filter } from "lucide-react";

const items = Array.from({ length: 10 }, (_, i) => ({
  time: "15:00:00",
  pair: "EUR/GBP",
  price1: "1478.256369",
  price2: "1470.120450",
  change: "+30 (+23.2%)",
  low: "L: 235698",
  high: "H: 25.3659",
  id: i,
}));

export default function App() {
  const [dark, setDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [tab, setTab] = useState("Forex");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const tabs = ["Favourites", "Forex", "Crypto"];

  const handleTabClick = (selectedTab) => {
    if (selectedTab !== "Forex") {
      setShowPopup(true);
    } else {
      setTab(selectedTab);
    }
  };

  const handleBlockedClick = () => setShowPopup(true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 dark:text-white transition">
      <div className="flex flex-1">
        <aside className="w-80 bg-white dark:bg-slate-800 border-r dark:border-slate-700 hidden md:flex flex-col">
          <div className="p-6 border-b dark:border-slate-700">
            <h1 className="text-2xl font-semibold tracking-tight dark:text-white">AutoBit</h1>
          </div>
          <nav className="p-4 space-y-3 text-sm mt-4">
            <SidebarButton icon={<Home size={18} />} label="Home" onClick={handleBlockedClick} />
            <SidebarButton icon={<LineChart size={18} />} label="Trade" onClick={handleBlockedClick} />
            <SidebarButton icon={<History size={18} />} label="History" onClick={handleBlockedClick} />
            <SidebarButton icon={<User size={18} />} label="Profile" onClick={handleBlockedClick} />
          </nav>
        </aside>

        <main className="flex-1 p-6 pb-20 md:pb-6">
          <header className="relative flex items-center justify-between mb-4">
            <button onClick={handleBlockedClick} className="md:hidden absolute left-0 p-2 -ml-2">
              <Menu size={26} className="text-slate-700 dark:text-slate-200" />
            </button>
            <button onClick={handleBlockedClick} className="md:hidden absolute right-0 p-2 -mr-2">
              <Filter size={23} className="text-slate-700 dark:text-slate-200" />
            </button>
            <div className="hidden md:flex ml-auto">
              <button
                onClick={() => setDark(!dark)}
                className={`w-20 h-10 flex items-center rounded-full p-1 relative ${
                  dark ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black" : "bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500"
                } shadow-lg transition-all`}
              >
                <Sun size={16} className={`absolute left-3 ${dark ? "opacity-40" : "opacity-100"}`} />
                <Moon size={16} className={`absolute right-3 ${dark ? "opacity-100" : "opacity-40"}`} />
                <div
                  className={`w-8 h-8 rounded-full shadow-xl transform transition-all duration-300 ${
                    dark ? "translate-x-10 bg-purple-600" : "translate-x-1 bg-yellow-400"
                  }`}
                />
              </button>
            </div>
            <div className="md:hidden mx-auto">
              <button
                onClick={() => setDark(!dark)}
                className={`w-14 h-7 flex items-center rounded-full p-1 relative ${
                  dark ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black" : "bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500"
                } shadow-md transition-all`}
              >
                <Sun size={12} className={`absolute left-2 ${dark ? "opacity-40" : "opacity-100"}`} />
                <Moon size={12} className={`absolute right-2 ${dark ? "opacity-100" : "opacity-40"}`} />
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${
                    dark ? "translate-x-6 bg-purple-600" : "translate-x-1 bg-yellow-400"
                  }`}
                />
              </button>
            </div>
          </header>

          <div className="mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => handleTabClick(t)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                    tab === t
                      ? dark
                        ? "bg-slate-700 text-white"
                        : "bg-slate-900 text-white"
                      : dark
                      ? "bg-slate-800 text-slate-300"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <MarketCard key={item.id} {...item} />
            ))}
          </section>
        </main>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t dark:border-slate-700 flex justify-around py-3 shadow-lg">
        <MobileNav icon={<Home size={22} />} label="Home" onClick={handleBlockedClick} />
        <MobileNav icon={<LineChart size={22} />} label="Trade" onClick={handleBlockedClick} />
        <MobileNav icon={<History size={22} />} label="History" onClick={handleBlockedClick} />
        <MobileNav icon={<User size={22} />} label="Profile" onClick={handleBlockedClick} />
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl max-w-sm w-full relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Not included</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">It wasn't a part of the assignment.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full py-2 bg-slate-900 text-white dark:bg-slate-700 rounded-lg hover:opacity-90 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"
    >
      {icon}
      {label}
    </button>
  );
}

function MobileNav({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center text-xs text-slate-700 dark:text-slate-300"
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
