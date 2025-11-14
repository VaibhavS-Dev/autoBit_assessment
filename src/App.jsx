import React, { useEffect, useState } from "react";
import MarketCard from "./components/MarketCard";
import { Home, LineChart, History, User, Sun, Moon } from "lucide-react";

const items = new Array(10).fill(0).map((_, i) => ({
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
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const tabs = ["Favourites", "Forex", "Crypto"];

  const clickTab = (t) => {
    setTab(t);
    if (t !== "Forex") setMsg("It wasn't the part of the assignment");
    else setMsg("");
  };

  const clickSidebar = (l) => {
    setMsg("It wasn't the part of the assignment");
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 dark:text-white transition">
      <aside className="w-80 bg-white dark:bg-slate-800 border-r dark:border-slate-700 hidden md:flex flex-col">
        <div className="p-6 border-b dark:border-slate-700">
          <h1 className="text-2xl font-semibold tracking-tight dark:text-white">AutoBit</h1>
        </div>
        <div className="px-4 py-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => clickTab(t)}
                className={`
                  px-4 py-2 rounded-full text-sm transition
                  ${tab === t ? (dark ? "bg-slate-700 text-white" : "bg-slate-900 text-white") : (dark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700")}
                `}
              >
                {t}
              </button>
            ))}
          </div>
          {msg && <p className="text-xs text-red-500 mt-2">{msg}</p>}
        </div>
        <nav className="p-4 space-y-3 text-sm mt-4">
          <SidebarButton icon={<Home size={18} />} label="Home" onClick={() => clickSidebar("Home")} />
          <SidebarButton icon={<LineChart size={18} />} label="Trade" onClick={() => clickSidebar("Trade")} />
          <SidebarButton icon={<History size={18} />} label="History" onClick={() => clickSidebar("History")} />
          <SidebarButton icon={<User size={18} />} label="Profile" onClick={() => clickSidebar("Profile")} />
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Markets</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Live updates · Responsive</p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className={`
              w-20 h-10 flex items-center rounded-full p-1 relative
              ${dark ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black" : "bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500"}
              shadow-lg transition-all
            `}
          >
            <Sun size={16} className={`absolute left-3 transition-transform duration-300 ${dark ? "scale-75 opacity-50" : "scale-100 opacity-100"}`} />
            <Moon size={16} className={`absolute right-3 transition-transform duration-300 ${dark ? "scale-100 opacity-100" : "scale-75 opacity-50"}`} />
            <div className={`w-8 h-8 rounded-full shadow-xl flex items-center justify-center transform transition-all duration-300 ${dark ? "translate-x-10 bg-gradient-to-br from-purple-500 to-indigo-700" : "translate-x-1 bg-gradient-to-br from-yellow-400 to-orange-500"}`}>
              <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
            </div>
          </button>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((i) => <MarketCard key={i.id} {...i} />)}
        </section>
      </main>
    </div>
  );
}

function SidebarButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition">
      {icon}
      {label}
    </button>
  );
}
