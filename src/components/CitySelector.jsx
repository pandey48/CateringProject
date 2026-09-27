"use client";

import { cities } from "../data/eventData";

export default function CitySelector({ value, onChange, required = false }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-sm font-semibold text-slate-700">City</span>
      <select
        name="city"
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
      >
        {cities.map((city) => (
          <option key={city.value || "select-city"} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
    </label>
  );
}
