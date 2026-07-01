import { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu.jsx";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resume: resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1 className="text-amber-400 font-bold text-2xl">Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen scroll-auto bg-[#0d1117]  text-gray-100 font-sans px-4 py-12 ">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-125 h-125 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[15%] w-100 h-100 bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

          <div className="fixed top-4 right-4 bg-red-600">
            <ProfileMenu />
          </div>

      <div className="relative max-w-6xl mx-auto mt-6">
        {/* Page Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            AI-Powered Interview Coach
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Create Your Custom{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
              Interview Plan
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </header>

        {/* Main Card  */}
        <div className="bg-[#161b24] border border-white/[0.07] rounded-2xl shadow-2xl max-h-[calc(100vh-7rem)] overflow-auto">
          <div className="flex flex-col lg:flex-row min-h-0">
            {/* Left Panel - Job Description */}
            <div className="flex-1 p-8 flex flex-col gap-4 min-h-0">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </span>
                <h2 className="text-base font-semibold text-white">
                  Target Job Description
                </h2>
                <span className="ml-auto text-[11px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded-full">
                  Required
                </span>
              </div>
              <textarea
                onChange={(e) => {
                  setJobDescription(e.target.value);
                }}
                className="flex-1 min-h-0 max-h-[40vh] w-full bg-[#0d1117] border border-white/8 rounded-xl px-4 py-3.5 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-all duration-200"
                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                maxLength={5000}
              />
              <div className="text-right text-xs text-gray-600">
                0 / 5000 chars
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-white/6 my-8" />
            <div className="lg:hidden h-px bg-white/6 mx-8" />

            {/* Right Panel - Profile */}
            <div className="flex-1 p-8 flex flex-col gap-5 min-h-0">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500/15 text-violet-400 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <h2 className="text-base font-semibold text-white">
                  Your Profile
                </h2>
              </div>

              {/* Upload Resume */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  Upload Resume
                  <span className="text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    Best Results
                  </span>
                </label>
                <label
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/10 rounded-xl px-6 py-8 cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/4 transition-all duration-200 group"
                  htmlFor="resume">
                  <span className="text-gray-500 group-hover:text-indigo-400 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  </span>
                  <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                    Click to upload or drag &amp; drop
                  </p>
                  <p className="text-xs text-gray-600">PDF or DOCX (Max 5MB)</p>
                  <input
                    ref={resumeInputRef}
                    hidden
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.docx"
                  />
                </label>
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/6" />
                <span className="text-xs font-semibold text-gray-600 tracking-widest">
                  OR
                </span>
                <div className="flex-1 h-px bg-white/6" />
              </div>

              {/* Quick Self-Description */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-gray-300"
                  htmlFor="selfDescription">
                  Quick Self-Description
                </label>
                <textarea
                  onChange={(e) => {
                    setSelfDescription(e.target.value);
                  }}
                  id="selfDescription"
                  name="selfDescription"
                  className="w-full h-30 max-h-[25vh] bg-[#0d1117] border border-white/08 rounded-xl px-4 py-3.5 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200"
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                />
              </div>

              {/* Info Box */}
              <div className="flex items-start gap-3 bg-amber-500/[0.07] border border-amber-500/20 rounded-xl px-4 py-3.5">
                <span className="text-amber-400 mt-0.5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <line
                      x1="12"
                      y1="8"
                      x2="12"
                      y2="12"
                      stroke="#0d1117"
                      strokeWidth="2"
                    />
                    <line
                      x1="12"
                      y1="16"
                      x2="12.01"
                      y2="16"
                      stroke="#0d1117"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <p className="text-xs text-amber-300/80 leading-relaxed">
                  Either a{" "}
                  <strong className="text-amber-300 font-semibold">
                    Resume
                  </strong>{" "}
                  or a{" "}
                  <strong className="text-amber-300 font-semibold">
                    Self Description
                  </strong>{" "}
                  is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 bg-white/2.5 border-t border-white/6">
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              AI-Powered Strategy Generation &bull; Approx 30s
            </span>
            <button
              onClick={handleGenerateReport}
              className="inline-flex items-center gap-2.5 bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.98]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Generate My Interview Strategy
            </button>
          </div>
        </div>

        {/* Recent Reports List */}
        {reports.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-lg font-semibold text-white mb-5">My Recent Interview Plans</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reports.map(report => (
                                <li
                                    key={report._id}
                                    className="bg-[#161b24] border border-white/[0.07] rounded-xl px-5 py-4 cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/[0.04] transition-all duration-200 group"
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors truncate mb-1">
                                        {report.title || 'Untitled Position'}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Generated on {new Date(report.createdAt).toLocaleDateString()}
                                    </p>
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                                        report.matchScore >= 80
                                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                            : report.matchScore >= 60
                                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                                    }`}>
                                        Match Score: {report.matchScore}%
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

        {/* Page Footer */}
        <footer className="mt-12 flex items-center justify-center gap-6">
          <a
            href="#"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Terms of Service
          </a>
          <a
            href="#"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Help Center
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
