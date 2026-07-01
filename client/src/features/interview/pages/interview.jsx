import { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'

const NAV_ITEMS = [
  {
    id: 'technical', label: 'Technical Questions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'behavioral', label: 'Behavioral Questions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'roadmap', label: 'Road Map',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
]

// ── Question Card ──
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-[#1a1d30] border border-white/[0.07] rounded-xl overflow-hidden transition-all duration-150 hover:border-white/[0.12]">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-3 px-4 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-mono text-[11px] font-semibold text-violet-400 bg-violet-500/15 border border-violet-500/25 px-2 py-0.5 rounded-full shrink-0 mt-0.5">
          Q{index + 1}
        </span>
        <p className="flex-1 text-[13px] font-medium text-white/90 leading-[1.55]">
          {item.question}
        </p>
        <svg
          className={`w-4 h-4 text-white/30 shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Body — expandable */}
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-white/[0.05]">
          {/* Intention */}
          <div className="pt-3">
            <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 mb-2">
              Intention
            </span>
            <p className="text-[13px] text-white/60 leading-relaxed">{item.intention}</p>
          </div>
          {/* Model Answer */}
          <div>
            <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 mb-2">
              Model Answer
            </span>
            <p className="text-[13px] text-white/60 leading-relaxed border-l-2 border-violet-500/35 pl-3">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Roadmap Day ──
const RoadMapDay = ({ day }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 w-full px-4 py-3 bg-[#1a1d30] hover:bg-[#1f2338] transition-colors duration-150 text-left"
      >
        <span className="font-mono text-[10px] font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/25 px-2.5 py-0.5 rounded-full whitespace-nowrap">
          Day {day.day}
        </span>
        <span className="flex-1 text-[13px] font-medium text-white/90">{day.focus}</span>
        <svg
          className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 bg-[#13162a] border-t border-white/[0.07]">
          <ul className="flex flex-col gap-2">
            {day.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-white/50">
                <svg className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {task}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Score Ring ──
const ScoreRing = ({ score, uid = "a" }) => {
  const r = 42
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  const color = score >= 80 ? ['#10b981', '#34d399'] : score >= 60 ? ['#d97706', '#fbbf24'] : ['#dc2626', '#f87171']
  const gradId = `scoreGrad-${uid}`
  return (
    <div className="relative w-24 h-24 my-1">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color[0]} />
            <stop offset="100%" stopColor={color[1]} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={`url(#${gradId})`} strokeWidth="7"
          strokeDasharray={circ.toFixed(1)}
          strokeDashoffset={offset.toFixed(1)}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-semibold text-white leading-none">{score}</span>
        <span className="text-[11px] text-white/30 mt-0.5">%</span>
      </div>
    </div>
  )
}

// ── Skill Tag ──
const SkillTag = ({ gap }) => {
  const map = {
    high:   'bg-red-500/15 text-red-400 border-red-500/25',
    medium: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    low:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  }
  return (
    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${map[gap.severity] ?? map.low}`}>
      {gap.skill}
    </span>
  )
}

// ── Section Header ──
const SectionHeader = ({ title, badge }) => (
  <div className="flex items-baseline gap-2.5 mb-5 pb-3 border-b border-white/[0.07]">
    <h2 className="text-[15px] font-semibold text-white/90">{title}</h2>
    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
      {badge}
    </span>
  </div>
)

// ── Sidebar Content (reused on mobile + desktop) ──
const SidebarContent = ({ report, uid = "a" }) => {
  const scoreLabel = report.matchScore >= 80 ? 'Strong match for this role' : report.matchScore >= 60 ? 'Moderate match for this role' : 'Low match — keep preparing'
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[10px] font-medium tracking-widest uppercase text-white/25 self-start">Match Score</p>
        <ScoreRing score={report.matchScore} uid={uid} />
        <span className="text-[11px] text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full text-center">
          {scoreLabel}
        </span>
      </div>
      <div className="h-px bg-white/[0.07] my-5" />
      <div>
        <p className="text-[10px] font-medium tracking-widest uppercase text-white/25 mb-3">Skill Gaps</p>
        <div className="flex flex-wrap gap-1.5">
          {report.skillGaps.map((gap, i) => <SkillTag key={i} gap={gap} />)}
        </div>
      </div>
    </>
  )
}

// ── Loading Screen ──
const LoadingScreen = () => (
  <div className="min-h-screen bg-[#0d0f1a] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
      <p className="text-[14px] text-white/40 font-medium">Loading your interview plan…</p>
    </div>
  </div>
)

// ── Main Component ──
const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) getReportById(interviewId)
  }, [interviewId])

  if (loading || !report) return <LoadingScreen />

  const activeItem = NAV_ITEMS.find(n => n.id === activeNav)

  return (
    <div className="min-h-screen bg-[#0d0f1a] p-3 sm:p-5 lg:p-6">

      {/* ════════════════════════════════════
          MOBILE LAYOUT  (< lg)
      ════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col gap-3">

        {/* Top bar: section picker + download */}
        <div className="flex items-center justify-between gap-2">
          {/* Dropdown nav */}
          <div className="relative">
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[13px] font-medium"
            >
              <span className="text-violet-300">{activeItem?.icon}</span>
              <span>{activeItem?.label}</span>
              <svg className={`w-3.5 h-3.5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 mt-1.5 z-50 bg-[#1a1d30] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-52.5">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveNav(item.id); setMobileMenuOpen(false) }}
                    className={`flex items-center gap-2.5 w-full px-4 py-3 text-[13px] transition-colors
                      ${activeNav === item.id
                        ? 'bg-violet-500/20 text-violet-300 font-medium'
                        : 'text-white/50 hover:bg-white/4 hover:text-white/80'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download button */}
          <button
            onClick={() => getResumePdf(interviewId)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-violet-500/40 bg-violet-500/15 text-violet-300 text-[12px] font-medium hover:bg-violet-500/25 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </button>
        </div>

        {/* Score + Skill Gaps card */}
        <div className="bg-[#13162a] border border-white/[0.07] rounded-2xl p-4">
          <SidebarContent report={report} uid="mobile" />
        </div>

        {/* Questions / Roadmap content */}
        <div className="bg-[#13162a] border border-white/[0.07] rounded-2xl p-4">
          {activeNav === 'technical' && (
            <section>
              <SectionHeader title="Technical Questions" badge={`${report.technicalQuestions.length} questions`} />
              <div className="flex flex-col gap-2">
                {report.technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
              </div>
            </section>
          )}
          {activeNav === 'behavioral' && (
            <section>
              <SectionHeader title="Behavioral Questions" badge={`${report.behavioralQuestions.length} questions`} />
              <div className="flex flex-col gap-2">
                {report.behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
              </div>
            </section>
          )}
          {activeNav === 'roadmap' && (
            <section>
              <SectionHeader title="Preparation Road Map" badge={`${report.preparationPlan.length}-day plan`} />
              <div className="flex flex-col gap-2">
                {report.preparationPlan.map(day => <RoadMapDay key={day.day} day={day} />)}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════
          DESKTOP LAYOUT  (>= lg)
      ════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-[200px_1px_1fr_1px_220px] bg-[#13162a] border border-white/[0.07] rounded-2xl overflow-hidden min-h-145">

        {/* Left Nav */}
        <nav className="flex flex-col justify-between p-4 bg-[#0d0f1a] border-r border-white/[0.07]">
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-white/25 mb-3 pl-2">
              Sections
            </p>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl mb-1 text-[13px] transition-all duration-150 border text-left
                  ${activeNav === item.id
                    ? 'bg-violet-500/15 text-violet-300 border-violet-500/30 font-medium'
                    : 'text-white/40 border-transparent hover:bg-white/4 hover:text-white/70'
                  }`}
              >
                <span className={activeNav === item.id ? 'text-violet-300' : 'text-white/30'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => getResumePdf(interviewId)}
            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl border border-violet-500/40 bg-violet-500/15 text-violet-300 text-[12px] font-medium hover:bg-violet-500/25 hover:border-violet-500 transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </button>
        </nav>

        {/* Divider */}
        <div className="bg-white/[0.07]" />

        {/* Center Content */}
        <main className="p-6 overflow-y-auto max-h-145 bg-[#13162a]">
          {activeNav === 'technical' && (
            <section>
              <SectionHeader title="Technical Questions" badge={`${report.technicalQuestions.length} questions`} />
              <div className="flex flex-col gap-2">
                {report.technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
              </div>
            </section>
          )}
          {activeNav === 'behavioral' && (
            <section>
              <SectionHeader title="Behavioral Questions" badge={`${report.behavioralQuestions.length} questions`} />
              <div className="flex flex-col gap-2">
                {report.behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
              </div>
            </section>
          )}
          {activeNav === 'roadmap' && (
            <section>
              <SectionHeader title="Preparation Road Map" badge={`${report.preparationPlan.length}-day plan`} />
              <div className="flex flex-col gap-2">
                {report.preparationPlan.map(day => <RoadMapDay key={day.day} day={day} />)}
              </div>
            </section>
          )}
        </main>

        {/* Divider */}
        <div className="bg-white/[0.07]" />

        {/* Right Sidebar */}
        <aside className="p-5 bg-[#13162a] flex flex-col border-l border-white/[0.07]">
          <SidebarContent report={report} uid="desktop" />
        </aside>
      </div>

    </div>
  )
}

export default Interview;