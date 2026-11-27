"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import type { Dict } from "@/lib/i18n";

export type JobCard = {
  slug: string;
  href: string;
  ref: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  posted: string; // formatted
  deadline: string; // formatted
};

export function JobBoard({ jobs, t }: { jobs: JobCard[]; t: Dict["careers"]["board"] }) {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const [loc, setLoc] = useState("");

  const departments = useMemo(() => [...new Set(jobs.map((j) => j.department))].sort(), [jobs]);
  const locations = useMemo(() => [...new Set(jobs.map((j) => j.location))].sort(), [jobs]);

  const filtered = jobs.filter((j) => {
    const q = query.trim().toLowerCase();
    const matchesQ = !q || `${j.title} ${j.summary} ${j.department} ${j.ref}`.toLowerCase().includes(q);
    return matchesQ && (!dept || j.department === dept) && (!loc || j.location === loc);
  });

  const reset = () => {
    setQuery("");
    setDept("");
    setLoc("");
  };

  return (
    <div className="job-board">
      <div className="job-filters">
        <label className="job-search">
          <Icon name="search" />
          <span className="sr-only">{t.search}</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} />
        </label>
        <label className="job-select">
          <span className="sr-only">{t.allDepartments}</span>
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="">{t.allDepartments}</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <Icon name="chevron" />
        </label>
        <label className="job-select">
          <span className="sr-only">{t.allLocations}</span>
          <select value={loc} onChange={(e) => setLoc(e.target.value)}>
            <option value="">{t.allLocations}</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <Icon name="chevron" />
        </label>
      </div>

      <p className="job-count" aria-live="polite">
        <strong>{filtered.length}</strong> {filtered.length === 1 ? t.result : t.results}
        {(query || dept || loc) && (
          <button type="button" onClick={reset}>{t.reset}</button>
        )}
      </p>

      {filtered.length === 0 ? (
        <div className="job-empty">{t.none}</div>
      ) : (
        <ul className="job-list">
          {filtered.map((j) => (
            <li key={j.slug}>
              <Link className="job-card" href={j.href}>
                <div className="job-main">
                  <span className="job-dept">{j.department}</span>
                  <h3>{j.title}</h3>
                  <p>{j.summary}</p>
                  <ul className="job-meta">
                    <li><Icon name="pin" />{j.location}</li>
                    <li><Icon name="briefcase" />{j.type}</li>
                    <li><Icon name="clock" />{t.deadline} {j.deadline}</li>
                  </ul>
                </div>
                <div className="job-side">
                  <span className="job-ref">{t.ref} {j.ref}</span>
                  <span className="job-cta">{t.view} <Icon name="arrow" /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
