import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Avatar, Tooltip } from "@material-tailwind/react";

const currentUser = {
  name:   "Tasneem Samir",
  email:  "tasneemsamir@gmail.com",
  avatar: null,
};

const navSections = [
  {
    label: "Core",
    items: [
      { 
        name: "Dashboard", 
        path: "/dashboard", 
        icon: (active) => (
          <svg className={`h-[20px] w-[20px] transition-colors duration-150 ${active ? "text-white" : "text-white/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
          </svg>
        )
      },
      { 
        name: "Timeline", 
        path: "/timeline", 
        icon: (active) => (
          <svg className={`h-[20px] w-[20px] transition-colors duration-150 ${active ? "text-white" : "text-white/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        )
      },
    ],
  },
  {
    label: "Learning",
    items: [
      { 
        name: "Live Sessions", 
        path: "/Livesessions", 
        icon: (active) => (
          <svg className={`h-[20px] w-[20px] transition-colors duration-150 ${active ? "text-white" : "text-white/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.9 14.5c-.3-.2-.5-.5-.5-.9V9.4c0-.4.2-.7.5-.9l4.5-3c.4-.3.9-.2 1.2.2.1.2.2.4.2.6v11.4c0 .5-.4.9-.9.9-.2 0-.4-.1-.6-.2l-4.4-3.4z" />
            <rect x="2" y="5" width="10" height="14" rx="2" />
          </svg>
        )
      },
      { 
        name: "Assignment", 
        path: "/assignment", 
        icon: (active) => (
          <svg className={`h-[20px] w-[20px] transition-colors duration-150 ${active ? "text-white" : "text-white/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" />
            <path d="M9 12h6M9 16h6" />
          </svg>
        )
      },
      { 
        name: "Graduation Project", 
        path: "/GraduationProject", 
        icon: (active) => (
          <svg className={`h-[20px] w-[20px] transition-colors duration-150 ${active ? "text-white" : "text-white/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
          </svg>
        )
      },
    ],
  },
  {
    label: "Engagement",
    items: [
  
      { 
        name: "AI Assistant", 
        path: "/AIassistant", 
        icon: (active) => (
          <svg className={`h-[20px] w-[20px] transition-colors duration-150 ${active ? "text-white" : "text-white/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 7.54 16.59c-.44.5-.47 1.25-.08 1.78l1.3 1.73a.5.5 0 0 1-.4.8H3.64a.5.5 0 0 1-.4-.8l1.3-1.73c.39-.53.36-1.28-.08-1.78A10 10 0 0 1 12 2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      },
    ],
  },
  {
    label: "Help & Support",
    items: [
      { 
        name: "FAQs", 
        path: "/faqs", 
        icon: (active) => (
          <svg className={`h-[20px] w-[20px] transition-colors duration-150 ${active ? "text-white" : "text-white/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M9 10h.01M12 10h.01M15 10h.01" />
          </svg>
        )
      },
      { 
        name: "Support", 
        path: "/support", 
        icon: (active) => (
          <svg className={`h-[20px] w-[20px] transition-colors duration-150 ${active ? "text-white" : "text-white/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )
      },
    ],
  },
];

export default function Sidebar({ collapsed: externalCollapsed, setCollapsed: externalSetCollapsed }) {
  const [localCollapsed, setLocalCollapsed] = React.useState(false);

  const collapsed = externalCollapsed !== undefined ? externalCollapsed : localCollapsed;
  const setCollapsed = externalSetCollapsed !== undefined ? externalSetCollapsed : setLocalCollapsed;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{ fontFamily: "'Cairo', sans-serif" }}
      className={`relative flex h-[1024px] flex-shrink-0 transition-all duration-300
        ${collapsed ? "w-16 rounded-none" : "w-[334px] rounded-r-xl"}`}
    >

      <div className="flex h-full w-16 flex-shrink-0 flex-col items-center bg-[#193FB3] pb-3 pt-4 rounded-none z-20">

        <div className="mb-6 flex flex-col items-center gap-5 w-full px-1">
          <img 
            src="/MCIT-Logo-HD (1) 3.png" 
            className="h-max w-max object-contain" 
            alt="MCIT Logo" 
          />
          <img 
            src="/OIP (1) 3png cpy 1.png" 
            className="h-max w-max object-contain brightness-0 invert" 
            alt="eYouth" 
          />
          <img 
            src="/DEPI Logo 1.png" 
            className="h-max w-max object-contain brightness-0 invert" 
            alt="Logo" 
          />
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 overflow-y-auto w-full px-2">
          {navSections.map((section) =>
            section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Tooltip
                  key={item.path}
                  content={item.name}
                  placement="right"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                  className="bg-blue-900 text-xs"
                >
                  <button
                    onClick={() => navigate(item.path)}
                    style={{ backgroundColor: "transparent" }}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150 border-0 outline-none
                      ${isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white"}`}
                  >
                    {item.icon(isActive)}
                  </button>
                </Tooltip>
              );
            })
          )}
        </div>

        <div className="mt-auto pt-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/40 bg-white/20 text-white text-sm font-bold">
            {currentUser.name?.[0] ?? "T"}
          </div>
        </div>
      </div>

      <div
        className={`flex h-full flex-col overflow-hidden bg-white transition-all duration-300 z-10
          ${collapsed ? "w-0 opacity-0 pointer-events-none" : "w-[270px] opacity-100"}`}
      >
        <div className="flex items-center justify-between border-b border-[#EEEEEE] px-5 py-4">
          <div className="flex items-center">
            <img 
              src="/OIP (1) 3png cpy 1.png" 
              className="h-14 object-contain" 
              alt="eYouth Logo" 
            />
          </div>

          <button
            onClick={() => setCollapsed(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#193FB3] transition-colors hover:bg-[#F5F7FF] border-0 outline-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M9 3v18M14 9l-3 3 3 3" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto pb-3 pt-4">
          {navSections.map((section) => (
            <div key={section.label}>
              <Typography 
                variant="small" 
                style={{ fontFamily: "'Cairo', sans-serif" }}
                className="px-6 pb-1.5 pt-4 text-[11px] font-black uppercase tracking-widest text-[#999]"
              >
                {section.label}
              </Typography>

              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <div key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`relative mx-3 flex w-[calc(100%-24px)] items-center gap-2.5 rounded-lg px-4 py-2.5 text-base font-black transition-colors duration-150 border-0 outline-none
                        ${isActive ? "text-[#193FB3] bg-[var(--light-gray)]" : "text-[#1a1a2e] hover:bg-[var(--light-gray)] hover:text-[#193FB3]"}`}
                      style={{ fontWeight: 800, fontFamily: "'Cairo', sans-serif" }} 
                    >
                      <span>{item.name}</span>
                    </button>

                    {item.name === "Timeline" && <hr className="my-3 mx-4 border-[#EEEEEE]" />}
                    {item.name === "Graduation Project" && <hr className="my-3 mx-4 border-[#EEEEEE]" />}
                    {item.name === "AI Assistant" && <hr className="my-3 mx-4 border-[#EEEEEE]" />}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3 border-t border-[#EEEEEE] px-5 py-3.5">
          {!currentUser.avatar ? (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#193FB3] bg-[#EEF2FF] text-sm font-bold text-[#193FB3]">
              {currentUser.name?.[0] ?? "T"}
            </div>
          ) : (
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" className="flex-shrink-0 border-2 border-[#193FB3] bg-[#EEF2FF]" />
          )}

          <div className="min-w-0">
            <Typography 
              variant="small" 
              style={{ fontFamily: "'Cairo', sans-serif" }}
              className="truncate font-black text-[#1a1a2e]"
            >
              {currentUser.name}
            </Typography>
            <Typography 
              variant="small" 
              style={{ fontFamily: "'Cairo', sans-serif" }}
              className="truncate text-xs font-normal text-[#666666]"
            >
              {currentUser.email}
            </Typography>
          </div>
        </div>
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="absolute left-[64px] top-6 z-30 flex h-9 w-6 items-center justify-center rounded-r-md border border-l-0 border-[#E5E7EB] bg-white text-[#193FB3] shadow-[4px_2px_6px_rgba(0,0,0,0.05)] transition-all duration-200 hover:w-7 hover:bg-[#F5F7FF] border-0 outline-none"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

    </div>
  );
}