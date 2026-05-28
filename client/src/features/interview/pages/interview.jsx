import { useState } from "react";
import { useInterview } from "../hooks/useInterview.js";

const NAV_ITEMS = [
  { id: "technical", label: "Technical", icon: "💻" },
  { id: "behavioral", label: "Behavioral", icon: "💬" },
  { id: "roadmap", label: "Roadmap", icon: "🗺️" },
];

// const techQuestions = [
//   { q: "Explain the difference between SQL and NoSQL databases and when you'd choose each.", tip: "Focus on CAP theorem tradeoffs and real use cases.", level: "med" },
//   { q: "How does React's reconciliation algorithm work?", tip: "Discuss virtual DOM diffing and key props.", level: "hard" },
//   { q: "Design a rate limiter for a public REST API.", tip: "Cover token bucket, sliding window, and Redis strategies.", level: "hard" },
//   { q: "What is the event loop in Node.js and how does it affect async code?", tip: "Walk through call stack, task queue, and microtasks.", level: "med" },
//   { q: "Describe how you'd implement caching to improve API response times.", tip: "Mention CDN, in-memory (Redis), HTTP headers (ETag, Cache-Control).", level: "med" },
//   { q: "What are the SOLID principles and give an example of each?", tip: "Use a concrete code scenario for at least two principles.", level: "easy" },
// ];

// const behavioralQuestions = [
//   { q: "Tell me about a time you disagreed with a technical decision and how you handled it.", tip: "Use STAR method. Show empathy and outcome.", level: "med" },
//   { q: "Describe a project where you had to learn a new technology quickly.", tip: "Highlight your learning strategy and how it paid off.", level: "easy" },
//   { q: "How do you prioritize tasks when multiple stakeholders have competing demands?", tip: "Talk about frameworks — MoSCoW, ICE scoring, etc.", level: "med" },
//   { q: "Give an example of a time you mentored a junior developer.", tip: "Focus on specific actions and the junior's growth.", level: "easy" },
//   { q: "Describe a major failure in your career and what you learned.", tip: "Be honest, specific, and pivot clearly to the lesson.", level: "hard" },
// ];

// const roadmapDays = [
//   { day: 1, title: "System design foundations", tasks: ["Review CAP theorem & distributed systems basics", "Practice designing a URL shortener", "Watch a system design walkthrough video"] },
//   { day: 2, title: "Data structures & algorithms", tasks: ["Solve 3 LeetCode medium problems on trees", "Review time/space complexity notation", "Flashcard key sorting algorithm complexities"] },
//   { day: 3, title: "React & frontend deep-dive", tasks: ["Study reconciliation and fiber architecture", "Build a small app using useReducer + Context", "Review common performance pitfalls"] },
//   { day: 4, title: "Behavioral prep", tasks: ["Write STAR stories for top 5 scenarios", "Record yourself answering one question", "Research the company's engineering culture"] },
//   { day: 5, title: "Database & caching", tasks: ["Revisit indexing strategies in PostgreSQL", "Set up a Redis cache locally and test TTL", "Compare Redis vs Memcached tradeoffs"] },
//   { day: 6, title: "Mock interviews", tasks: ["Schedule a peer mock technical interview", "Complete one timed system design session", "Review any weak areas identified"] },
//   { day: 7, title: "Review & rest", tasks: ["Skim notes and highlight key concepts", "Prepare your questions for the interviewer", "Rest, sleep well, and arrive confident"] },
// ];

// const skillGaps = [
//   { skill: "System design", severity: "high" },
//   { skill: "GraphQL", severity: "high" },
//   { skill: "TypeScript", severity: "medium" },
//   { skill: "Redis", severity: "medium" },
//   { skill: "CI/CD pipelines", severity: "medium" },
//   { skill: "Docker", severity: "low" },
// ];

// const report = {
//   matchScore: 84,
//   technicalQuestions: techQuestions,
//   behavioralQuestions: behavioralQuestions,
//   preparationPlan: roadmapDays,
//   skillGaps,
// };

// ── Level badge ──
function LevelBadge({ level }) {
  const map = {
    hard: "bg-red-500/15 text-red-400 border border-red-500/25",
    med:  "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    easy: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  };
  const label = { hard: "Hard", med: "Medium", easy: "Easy" };
  return (
    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${map[level]}`}>
      {label[level]}
    </span>
  );
}

// ── Question Card ──
function QuestionCard({ item, index }) {
  return (
    <div className="bg-[#1a1d30] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.12] hover:bg-[#1f2338] transition-all duration-150">
      <div className="flex items-start gap-2.5 mb-2">
        <span className="font-mono text-[10px] font-medium text-white/30 pt-0.5 min-w-[20px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[13px] font-medium text-white/90 leading-[1.55]">
          {item.q}
        </span>
      </div>
      <p className="text-[12px] text-white/50 ml-[30px] leading-relaxed border-l-2 border-violet-500/35 pl-2.5 mb-2">
        {item.tip}
      </p>
      <div className="ml-[30px]">
        <LevelBadge level={item.level} />
      </div>
    </div>
  );
}

// ── Roadmap Day ──
function RoadMapDay({ day }) {
  const [open, setOpen] = useState(false);



  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 w-full px-4 py-3 bg-[#1a1d30] hover:bg-[#1f2338] transition-colors duration-150 text-left"
      >
        <span className="font-mono text-[10px] font-medium bg-violet-500/15 text-violet-300 border border-violet-500/25 px-2 py-0.5 rounded-full whitespace-nowrap">
          Day {day.day}
        </span>
        <span className="text-[13px] font-medium text-white/90 flex-1">{day.title}</span>
        <svg
          className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 bg-[#13162a] border-t border-white/[0.07] flex flex-col gap-1.5">
          {day.tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-2 text-[12px] text-white/50">
              <svg className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {task}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Score Ring ──
function ScoreRing({ score }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <div className="relative w-24 h-24 my-1">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c6fe0" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="url(#scoreGrad)" strokeWidth="7"
          strokeDasharray={circ.toFixed(1)}
          strokeDashoffset={offset.toFixed(1)}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-medium text-white leading-none">{score}</span>
        <span className="text-[11px] text-white/30 mt-0.5">%</span>
      </div>
    </div>
  );
}

// ── Skill Tag ──
function SkillTag({ gap }) {
  const map = {
    high:   "bg-red-500/15 text-red-400 border-red-500/25",
    medium: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    low:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  };
  return (
    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${map[gap.severity]}`}>
      {gap.skill}
    </span>
  );
}

// ── Main Component ──
export default function Interview() {
  const [activeNav, setActiveNav] = useState("technical");
  const { report } = useInterview();

  return (
    <div className="min-h-screen bg-[#0d0f1a] p-3 sm:p-4 md:p-6 font-sans">
      
      {/* Mobile Nav */}
      <div className="lg:hidden flex gap-2 mb-3 overflow-x-auto pb-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-[13px] border transition-all duration-150
              ${
                activeNav === item.id
                  ? "bg-violet-500/15 text-violet-300 border-violet-500/30 font-medium"
                  : "text-white/40 border-transparent hover:bg-white/[0.04] hover:text-white/70"
              }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[190px_1px_1fr_1px_210px] bg-[#13162a] border border-white/[0.07] rounded-2xl overflow-hidden min-h-[560px]">
        
        {/* ── Left Nav ── */}
        <nav className="hidden lg:flex flex-col justify-between p-4 bg-[#0d0f1a]">
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-white/25 mb-2.5 pl-2">
              Sections
            </p>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg mb-0.5 text-[13px] transition-all duration-150 border text-left
                  ${
                    activeNav === item.id
                      ? "bg-violet-500/15 text-violet-300 border-violet-500/30 font-medium"
                      : "text-white/40 border-transparent hover:bg-white/[0.04] hover:text-white/70"
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <button className="flex items-center justify-center gap-1.5 w-full px-3 py-2.5 rounded-lg border border-violet-500/40 bg-violet-500/15 text-violet-300 font-mono text-[11px] font-medium hover:bg-violet-500/25 hover:border-violet-500 transition-all duration-150">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download resume
          </button>
        </nav>

        {/* ── Divider ── */}
        <div className="hidden lg:block bg-white/[0.07]" />

        {/* ── Center Content ── */}
        <main className="p-4 sm:p-5 md:p-6 overflow-y-auto bg-[#13162a] order-2 lg:order-none">
          
          {activeNav === "technical" && (
            <section>
              <div className="flex flex-wrap items-baseline gap-2.5 mb-5 pb-3 border-b border-white/[0.07]">
                <h2 className="text-[15px] font-semibold text-white/90">
                  Technical questions
                </h2>

                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
                  {report.technicalQuestions.length} questions
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="flex flex-wrap items-baseline gap-2.5 mb-5 pb-3 border-b border-white/[0.07]">
                <h2 className="text-[15px] font-semibold text-white/90">
                  Behavioral questions
                </h2>

                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="flex flex-wrap items-baseline gap-2.5 mb-5 pb-3 border-b border-white/[0.07]">
                <h2 className="text-[15px] font-semibold text-white/90">
                  Preparation road map
                </h2>

                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── Divider ── */}
        <div className="hidden lg:block bg-white/[0.07]" />

        {/* ── Right Sidebar ── */}
        <aside className="p-4 sm:p-5 bg-[#0d0f1a] flex flex-col border-b lg:border-b-0 lg:border-l border-white/[0.07] order-1 lg:order-none">

          {/* Match Score */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-medium tracking-widest uppercase text-white/25 self-start">
              Match score
            </p>

            <ScoreRing score={report.matchScore} />

            <span className="text-[11px] text-emerald-400 bg-emerald-500/12 border border-emerald-500/20 px-3 py-1 rounded-full text-center">
              Strong match for this role
            </span>
          </div>

          <div className="h-px bg-white/[0.07] my-5" />

          {/* Skill Gaps */}
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-white/25 mb-3">
              Skill gaps
            </p>

            <div className="flex flex-wrap gap-1.5">
              {report.skillGaps.map((gap, i) => (
                <SkillTag key={i} gap={gap} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}