import React, { useState, useEffect } from 'react';
import DetailsTask from './Detailstask/Detailstask'; 

export default function Assignment() {
  const [activeTab, setActiveTab] = useState('online');
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 9; 
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const monthKeys = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  useEffect(() => {
    let baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);

    const fullUrl = `${baseUrl}/timeline`;

    fetch(fullUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`مشكلة في السيرفر: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const extractedAssignments = [];

        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);

        const timelineObj = data.timeline || data;

        Object.keys(timelineObj).forEach((monthKey) => {
          const monthIndex = monthKeys.indexOf(monthKey);
          const monthData = timelineObj[monthKey];
          const days = monthData?.days || [];
          const year = monthData?.year || new Date().getFullYear();

          days.forEach((day) => {
            if (day.has_sessions && day.sessions) {
              day.sessions.forEach((session) => {
                const assignData = session.assignment || {};

                // تاريخ السيشن نفسه
                const sessionDate = new Date(year, monthIndex, Number(day.day_number));
                sessionDate.setHours(0, 0, 0, 0);

                // تاريخ الـ due_date
                let dueDate = null;
                if (assignData.due_date) {
                  const [dd, mm, yyyy] = assignData.due_date.split('-');
                  dueDate = new Date(`${yyyy}-${mm}-${dd}`);
                  dueDate.setHours(0, 0, 0, 0);
                }

                // المنطق:
                // 1. السيشن حصل (sessionDate <= today) + due_date لسه ما عداش (dueDate >= today) → Today's task
                // 2. due_date عدى (dueDate < today) → Completed
                // 3. السيشن لسه ما حصلش (sessionDate > today) → Pending
                let status = "Pending";
                let isToday = false;

                if (sessionDate <= todayMidnight) {
                  if (dueDate && dueDate >= todayMidnight) {
                    status = "Today's task";
                    isToday = true;
                  } else if (dueDate && dueDate < todayMidnight) {
                    status = "Completed";
                  }
                }
                // else: sessionDate > today → Pending (default)

                extractedAssignments.push({
                  id: session.id || Math.random().toString(),
                  week: `${session.week || 'Week 1'} - ${session.session_number || 'Session 1'} - ${assignData.session_type || session.type || 'Technical'}`,
                  subject: session.subject_name || "The name of subject",
                  time: assignData.due_time || session.time,
                  date: assignData.due_date || session.date,
                  status: status,
                  isToday: isToday,
                  description: assignData.description || session.description || null,
                  title: assignData.title || null,
                  attendance: assignData.attendance || null,
                  task_status: assignData.task_status || null,
                });
              });
            }
          });
        });

        setAssignments(extractedAssignments);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    setCurrentPage(1);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center text-sm font-bold text-[#1A1A2E] gap-3">
        <div className="w-8 h-8 border-4 border-[#A855F7] border-t-transparent rounded-full animate-spin"></div>
        <span>Loading assignments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 min-h-screen bg-[#F8FAFC] p-6 flex items-center justify-center text-sm text-red-500 font-bold">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center shadow-sm">
          <p>⚠️ An error occurred while connecting to the server</p>
          <p className="text-xs bg-white p-2 rounded border mt-2 font-mono text-left">{error}</p>
        </div>
      </div>
    );
  }

  if (selectedAssignment) {
    return (
      <DetailsTask 
        taskData={selectedAssignment} 
        onBack={() => setSelectedAssignment(null)} 
      />
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = assignments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(assignments.length / itemsPerPage);

  return (
    <div style={{ fontFamily: "'Cairo', sans-serif" }} className="flex-1 min-h-screen bg-[#F8FAFC] p-6 flex flex-col gap-6 items-start">
      
      <div style={{ width: "821px" }} className="flex items-center justify-between select-none">
        <div className="flex bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-1.5 rounded-[16px]">
          <button
            onClick={() => setActiveTab('online')}
            className={`rounded-[12px] px-6 py-2.5 text-xs font-bold transition-all duration-200 border-0 outline-none ${
              activeTab === 'online' ? 'bg-[#F1F5F9] text-[#0F172A]' : 'bg-white'
            }`}
          >
            online
          </button>
          <button
            onClick={() => setActiveTab('onsite')}
            className={`rounded-[12px] px-6 py-2.5 text-xs font-bold transition-all duration-200 border-0 outline-none ${
              activeTab === 'onsite' ? 'bg-[#F1F5F9] text-[#0F172A]' : 'bg-white'
            }`}
          >
            Onsite
          </button>
        </div>
        <span className="text-[#334155] text-sm font-bold tracking-wide">Today's Assignment</span>
      </div>

      <div style={{ width: "821px" }} className="bg-[#F8FAFC] flex flex-col justify-between">
        
        <div className="grid grid-cols-3 gap-5 mb-8">
          {currentAssignments.map((item) => {
            const isPending = item.status === "Pending";
            const isCompleted = item.status === "Completed";

            return (
              <div
                key={item.id}
                className="rounded-[24px] p-5 bg-white flex flex-col justify-between h-[320px] shadow-[0_10px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.08)] transition-all duration-300 border-0"
              >
                <div className="flex flex-col flex-grow">
                  <div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full tracking-wide ${
                      item.isToday ? 'text-[#7C3AED] bg-[#F5F3FF]' : 
                      isCompleted ? 'text-[#0F172A] bg-[#F1F5F9]' : 'text-[#94A3B8] bg-[#F8FAFC]'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#0F172A] font-bold mt-4 tracking-wide">{item.week}</p>
                  
                  <h3 className="text-[var(--primary)] font-bold text-[14px] mt-1 mb-3 line-clamp-1">
                    {item.subject}
                  </h3>

                  <div className="flex gap-4 text-[11px] text-[#94A3B8] mb-4 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#94A3B8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#94A3B8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1 text-[12px] text-[#0F172A] font-bold">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#0F172A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <span>Attendance</span>
                      </div>
                      <svg className={`w-2.5 h-2.5 ${isPending ? 'text-[#E2E8F0]' : 'text-[#3B82F6]'}`} fill="currentColor" viewBox="0 0 24 24">
                        <polygon points="12,2 22,8.5 18,21 6,21 2,8.5" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#0F172A]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <span>Task</span>
                      </div>
                      <svg className={`w-2.5 h-2.5 ${isPending ? 'text-[#E2E8F0]' : 'text-[#3B82F6]'}`} fill="currentColor" viewBox="0 0 24 24">
                        <polygon points="12,2 22,8.5 18,21 6,21 2,8.5" />
                      </svg>
                    </div>
                  </div>
                </div>

                {!isPending && (
                  <div className="mt-4">
                    {item.isToday ? (
                      <button 
                        onClick={() => setSelectedAssignment(item)}
                        className="w-full bg-[var(--purple-light)] hover:bg-[var(--purple-light)] text-white text-[12px] font-bold py-3 px-4 rounded-[14px] flex justify-center items-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(168,85,247,0.2)] border-0 outline-none cursor-pointer"
                      >
                        Assignment Submission
                        <svg className="w-3.5 h-3.5 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button className="w-full bg-[#E2E8F0] text-[#94A3B8] text-[12px] font-bold py-3 px-4 rounded-[14px] cursor-not-allowed border-0 outline-none">
                        Assignment Submitted
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-2 pt-4 text-[12px] text-[#64748B] font-bold select-none">
          <button 
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border-0 outline-none bg-transparent transition-colors ${
              currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-[#94A3B8] hover:text-[#0F172A]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          {Array.from({ length: totalPages }, (_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1.5 rounded-lg border-0 outline-none transition-all duration-150 ${
                  currentPage === pageNum 
                    ? 'text-[#0F172A] font-black bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)]' 
                    : 'text-[#64748B] hover:bg-white/50 font-semibold'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button 
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-lg border-0 outline-none bg-transparent transition-colors ${
              currentPage === totalPages || totalPages === 0 ? 'text-gray-200 cursor-not-allowed' : 'text-[#94A3B8] hover:text-[#0F172A]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

      </div>
    </div>
  );
}
