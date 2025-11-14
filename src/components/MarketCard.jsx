import React from "react";
import ReactCountryFlag from "react-country-flag";

export default function MarketCard({ time, pair, price1, price2, change, low, high }) {
  const [base, quote] = pair.split("/");
  const cur = { EUR: "EU", GBP: "GB", USD: "US", JPY: "JP", AUD: "AU", CAD: "CA", CHF: "CH", NZD: "NZ" };
  const pos = change.trim().startsWith("+");

  const [intPart, decPart] = price1.split(".");
  const intRest = intPart.slice(0, -1);
  const oneDigit = intPart.slice(-1);

  return (
    <article className="bg-white dark:bg-slate-800 dark:border-slate-700 border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 dark:text-slate-500">{time}</span>
          <div className="flex items-center gap-2">
            <ReactCountryFlag countryCode={cur[base]} svg style={{ width: "1.5em", height: "1.5em" }} />
            <ReactCountryFlag countryCode={cur[quote]} svg style={{ width: "1.5em", height: "1.5em" }} />
            <h3 className="text-lg font-semibold dark:text-white">{pair}</h3>
          </div>
        </div>
        <div className={`text-sm font-semibold ${pos ? "text-green-600" : "text-red-600"}`}>{change}</div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-base font-semibold">
          <span className="text-slate-700 dark:text-slate-200">
            {intRest}
            <span className={pos ? "text-green-600" : "text-red-600"}>{oneDigit}.{decPart}</span>
          </span>
          <span className="text-slate-700 dark:text-slate-300">{price2}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
          <span>{low}</span>
          <span>{high}</span>
        </div>
      </div>
    </article>
  );
}
