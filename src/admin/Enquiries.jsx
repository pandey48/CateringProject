"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, MapPin, MessageCircle, Phone, Search, Users, X } from "lucide-react";
import API_URL from "../config";

const statuses = ["New", "Contacted", "Quoted", "Confirmed", "Completed", "Cancelled"];
const statusStyles = {
  New: "bg-blue-50 text-blue-700 ring-blue-200", Contacted: "bg-amber-50 text-amber-800 ring-amber-200",
  Quoted: "bg-violet-50 text-violet-700 ring-violet-200", Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Completed: "bg-teal-50 text-teal-700 ring-teal-200", Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
  Closed: "bg-slate-100 text-slate-600 ring-slate-200",
};

function adminHeaders(json = false) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || sessionStorage.getItem("token") : "";
  return { ...(json ? { "Content-Type": "application/json" } : {}), Authorization: `Bearer ${token}` };
}

function formatDate(value, options = { dateStyle: "medium" }) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en-IN", { ...options, timeZone: "Asia/Kolkata" }).format(date);
}

function receivedAt(enquiry) {
  if (!enquiry.createdAt) return "—";
  return `${formatDate(enquiry.createdAt)} · ${formatDate(enquiry.createdAt, { hour: "2-digit", minute: "2-digit" })}`;
}

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [serviceFilter, setServiceFilter] = useState("All services");
  const [dateFilter, setDateFilter] = useState("All dates");
  const [dateField, setDateField] = useState("Received date");
  const [sortOrder, setSortOrder] = useState("Newest first");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEnquiries() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/enquiries`, { headers: adminHeaders() });
      if (response.status === 401 || response.status === 403) throw new Error("Your admin session is not authorized. Sign in again.");
      if (!response.ok) throw new Error("Could not load enquiries.");
      setEnquiries(await response.json());
    } catch (loadError) { setError(loadError.message || "Could not connect to the server."); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadEnquiries(); }, []);

  const serviceNames = useMemo(() => [...new Set(enquiries.map((item) => item.serviceName || item.service || item.eventType).filter(Boolean))].sort(), [enquiries]);
  const counts = useMemo(() => ({
    total: enquiries.length,
    New: enquiries.filter((item) => item.status === "New").length,
    Contacted: enquiries.filter((item) => item.status === "Contacted").length,
    Confirmed: enquiries.filter((item) => item.status === "Confirmed").length,
    Completed: enquiries.filter((item) => item.status === "Completed" || item.status === "Closed").length,
  }), [enquiries]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lower = new Date(start);
    const upper = new Date(now);
    if (dateFilter === "Yesterday") { lower.setDate(lower.getDate() - 1); upper.setTime(start.getTime() - 1); }
    if (dateFilter === "This Week") lower.setDate(lower.getDate() - ((lower.getDay() + 6) % 7));
    if (dateFilter === "This Month") lower.setDate(1);
    const result = enquiries.filter((item) => {
      const service = item.serviceName || item.service || item.eventType || "General Enquiry";
      const haystack = [item.name, item.phone, item.email, item.enquiryNumber, service, item.location, item.address, item.city].join(" ").toLowerCase();
      if (term && !haystack.includes(term)) return false;
      if (statusFilter !== "All statuses" && item.status !== statusFilter && !(statusFilter === "Completed" && item.status === "Closed")) return false;
      if (serviceFilter !== "All services" && service !== serviceFilter) return false;
      const dateValue = dateField === "Event date" ? item.eventDate : item.createdAt;
      const filteredDate = dateValue ? new Date(dateValue) : null;
      if (dateFilter !== "All dates" && dateFilter !== "Custom range" && (!filteredDate || filteredDate < lower || filteredDate > upper)) return false;
      if (dateFilter === "Custom range" && filteredDate) {
        if (fromDate && filteredDate < new Date(`${fromDate}T00:00:00`)) return false;
        if (toDate && filteredDate > new Date(`${toDate}T23:59:59`)) return false;
      }
      return true;
    });
    return result.sort((a, b) => {
      if (sortOrder === "Event date") return (a.eventDate ? new Date(a.eventDate).getTime() : Infinity) - (b.eventDate ? new Date(b.eventDate).getTime() : Infinity);
      const direction = sortOrder === "Newest first" ? -1 : 1;
      return direction * (new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
    });
  }, [enquiries, search, statusFilter, serviceFilter, dateFilter, dateField, fromDate, toDate, sortOrder]);

  async function patchEnquiry(id, payload) {
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/enquiries/${id}`, { method: "PATCH", headers: adminHeaders(true), body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not update the enquiry.");
      setEnquiries((current) => current.map((item) => item._id === id ? data : item));
      setSelected((current) => current?._id === id ? data : current);
      return true;
    } catch (patchError) { setError(patchError.message); return false; }
  }

  async function deleteEnquiry(item) {
    if (!window.confirm(`Delete enquiry ${item.enquiryNumber || item.name}?`)) return;
    try {
      const response = await fetch(`${API_URL}/api/enquiries/${item._id}`, { method: "DELETE", headers: adminHeaders() });
      if (!response.ok) throw new Error("Could not delete enquiry.");
      setEnquiries((current) => current.filter((row) => row._id !== item._id));
      if (selected?._id === item._id) setSelected(null);
    } catch (deleteError) { setError(deleteError.message); }
  }

  async function addNote(event) {
    event.preventDefault();
    if (!selected || !note.trim()) return;
    if (await patchEnquiry(selected._id, { note: note.trim() })) setNote("");
  }

  const summary = [
    { label: "Total Enquiries", value: counts.total, icon: Users, color: "text-slate-700 bg-slate-100" },
    { label: "New Enquiries", value: counts.New, icon: MessageCircle, color: "text-blue-700 bg-blue-50" },
    { label: "Contacted", value: counts.Contacted, icon: Phone, color: "text-amber-700 bg-amber-50" },
    { label: "Confirmed", value: counts.Confirmed, icon: CheckCircle2, color: "text-emerald-700 bg-emerald-50" },
    { label: "Completed", value: counts.Completed, icon: CalendarDays, color: "text-teal-700 bg-teal-50" },
  ];

  return <section className="space-y-6">
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">Customer requests</p><h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Enquiry Management</h1><p className="mt-1 text-sm text-slate-500">Track service requests and follow up with customers.</p></div><button onClick={loadEnquiries} type="button" className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 sm:self-auto">Refresh</button></header>

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">{summary.map(({ label, value, icon: Icon, color }) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className={`grid h-9 w-9 place-items-center rounded-xl ${color}`}><Icon size={18} /></div><p className="mt-3 text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{label}</p></article>)}</div>

    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_170px_190px_160px_155px_145px]">
        <label className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, phone, enquiry ID..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-amber-500" /></label>
        <select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option>All services</option>{serviceNames.map((name) => <option key={name}>{name}</option>)}</select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option>All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
        <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700">{["All dates", "Today", "Yesterday", "This Week", "This Month", "Custom range"].map((item) => <option key={item}>{item}</option>)}</select>
        <select value={dateField} onChange={(event) => setDateField(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option>Received date</option><option>Event date</option></select>
        <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option>Newest first</option><option>Oldest first</option><option>Event date</option></select>
      </div>
      {dateFilter === "Custom range" && <div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-500">From<input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700" /></label><label className="text-xs font-semibold text-slate-500">To<input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700" /></label></div>}
    </div>

    {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">Loading enquiries…</div> : filtered.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">{enquiries.length ? "No enquiries match these filters." : "No enquiries have been received yet."}</div> : <>
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:block"><div className="overflow-x-auto"><table className="w-full min-w-[1120px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{["Enquiry ID", "Customer", "Service", "Event", "Guests", "Location", "Status", "Received", "Action"].map((item) => <th key={item} className="px-4 py-3 font-semibold">{item}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((item) => <tr key={item._id} className="hover:bg-amber-50/40"><td className="px-4 py-3 font-mono text-xs font-semibold text-amber-800">{item.enquiryNumber || "—"}</td><td className="px-4 py-3"><button onClick={() => setSelected(item)} className="text-left font-semibold text-slate-800 hover:text-amber-700">{item.name}<span className="block text-xs font-normal text-slate-500">{item.phone}</span></button></td><td className="px-4 py-3">{item.serviceName || item.service || item.eventType || "General Enquiry"}</td><td className="px-4 py-3">{formatDate(item.eventDate)}<span className="block text-xs text-slate-500">{item.eventTime || "Time not set"}</span></td><td className="px-4 py-3">{item.guestCount || item.persons || "—"}</td><td className="max-w-40 truncate px-4 py-3">{item.location || item.address || item.city || "—"}</td><td className="px-4 py-3"><StatusBadge status={item.status} /></td><td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">{receivedAt(item)}</td><td className="px-4 py-3"><button onClick={() => setSelected(item)} aria-label="View enquiry" className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">View</button></td></tr>)}</tbody></table></div></div>
      <div className="grid gap-3 xl:hidden">{filtered.map((item) => <article key={item._id} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex items-start justify-between gap-3"><button onClick={() => setSelected(item)} className="min-w-0 text-left"><span className="font-mono text-[11px] font-bold text-amber-800">{item.enquiryNumber || "Enquiry"}</span><h2 className="mt-1 truncate text-base font-bold text-slate-900">{item.name}</h2></button><StatusBadge status={item.status} /></div><p className="mt-1 text-sm text-slate-500">{item.serviceName || item.service || item.eventType || "General Enquiry"}</p><div className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-2"><p className="flex items-center gap-2"><Phone size={14} />{item.phone}</p><p className="flex items-center gap-2"><CalendarDays size={14} />{formatDate(item.eventDate)} {item.eventTime}</p><p className="flex items-center gap-2"><Users size={14} />{item.guestCount || item.persons || "Guest count not set"}</p><p className="flex min-w-0 items-center gap-2"><MapPin size={14} /><span className="truncate">{item.location || item.address || item.city || "Location not set"}</span></p></div><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"><span className="text-[11px] text-slate-400">Received {receivedAt(item)}</span><button onClick={() => setSelected(item)} className="text-sm font-semibold text-amber-800">View details</button></div></article>)}</div>
    </>}

    {selected && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/55 p-0 sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section role="dialog" aria-modal="true" aria-labelledby="enquiry-detail-title" className="max-h-[94dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs font-bold text-amber-800">{selected.enquiryNumber || "Enquiry"}</p><h2 id="enquiry-detail-title" className="mt-1 text-2xl font-bold text-slate-900">{selected.name}</h2><p className="mt-1 text-sm text-slate-500">Received {receivedAt(selected)}</p></div><button onClick={() => setSelected(null)} aria-label="Close details" className="rounded-full border border-slate-200 p-2 text-slate-600"><X size={18} /></button></div>
      <div className="mt-5 flex flex-wrap gap-2"><a href={`tel:${selected.phone}`} className="inline-flex items-center gap-2 rounded-xl bg-[#173332] px-4 py-2.5 text-sm font-semibold text-white"><Phone size={16} /> Call Customer</a><a target="_blank" rel="noreferrer" href={`https://wa.me/${String(selected.phone || "").replace(/\D/g, "")}`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"><MessageCircle size={16} /> WhatsApp Customer</a></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2"><Detail label="Phone" value={selected.phone} /><Detail label="Email" value={selected.email || "—"} /><Detail label="Service" value={selected.serviceName || selected.service || selected.eventType || "General Enquiry"} /><Detail label="Event date" value={`${formatDate(selected.eventDate)} · ${selected.eventTime || "Time not set"}`} /><Detail label="Guests" value={selected.guestCount || selected.persons || "—"} /><Detail label="Location" value={selected.location || selected.address || selected.city || "—"} /><Detail label="Budget" value={selected.budget || "—"} /><Detail label="Submitted" value={receivedAt(selected)} /><Detail label="Last updated" value={formatDate(selected.updatedAt, { dateStyle: "medium", hour: "2-digit", minute: "2-digit" })} /></div>
      {selected.message && <div className="mt-4 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Customer requirement</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{selected.message}</p></div>}
      <div className="mt-5"><label className="text-sm font-semibold text-slate-700">Change status<select value={selected.status === "Closed" ? "Completed" : selected.status || "New"} onChange={(event) => patchEnquiry(selected._id, { status: event.target.value })} className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-amber-500">{statuses.map((status) => <option key={status}>{status}</option>)}</select></label></div>
      {selected.notes?.length > 0 && <div className="mt-5"><h3 className="text-sm font-bold text-slate-800">Notes</h3><ul className="mt-2 space-y-2">{selected.notes.map((item, index) => <li key={`${item.createdAt}-${index}`} className="rounded-xl bg-amber-50 px-3 py-2"><p className="text-sm text-slate-700">{item.text}</p><p className="mt-1 text-[11px] text-slate-500">{receivedAt({ createdAt: item.createdAt })}</p></li>)}</ul></div>}
      <form onSubmit={addNote} className="mt-4 flex gap-2"><input value={note} onChange={(event) => setNote(event.target.value)} maxLength={2000} placeholder="Add an internal note..." className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500" /><button className="rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white">Add Note</button></form>
      </section></div>}
  </section>;
}

function StatusBadge({ status = "New" }) { return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${statusStyles[status] || statusStyles.New}`}>{status}</span>; }
function Detail({ label, value }) { return <div className="min-w-0 rounded-xl border border-slate-100 p-3"><p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 break-words text-sm font-medium text-slate-700">{value || "—"}</p></div>; }
