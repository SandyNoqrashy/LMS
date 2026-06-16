import React, { useState, useEffect } from "react";

export default function Timeline() {
  const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const monthKeys = [
    "january", "february", "march", "april", "may", "june", 
    "july", "august", "september", "october", "november", "december"
  ];
  
  // أسماء الشهور للعرض الافتراضي في حال عدم وجودها بالسيرفر
  const fallbackMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const [currentMonthIndex, setCurrentMonthIndex] = useState(5); 
  
  const [viewType, setViewType] = useState("Month"); 
  const [activeTab, setActiveTab] = useState("Today's sessions");

  const weekDaysHeaders = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
        setTimelineData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(monthKeys.length - 1);
    } else {
      setCurrentMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === monthKeys.length - 1) {
      setCurrentMonthIndex(0);
    } else {
      setCurrentMonthIndex((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-[var(----light-gray)] p-6 flex flex-col items-center justify-center text-sm font-bold text-[#1A1A2E] gap-3">
        <div className="w-8 h-8 border-4 border-[#5570F1] border-t-transparent rounded-full animate-spin"></div>
        <span>جاري تحميل التايم لاين...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 min-h-screen bg-[var(--light-gray)] p-6 flex items-center justify-center text-sm text-red-500 font-bold">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center shadow-sm">
          <p>⚠️ حدث خطأ أثناء الاتصال بالسيرفر</p>
          <p className="text-xs bg-white p-2 rounded border mt-2 font-mono text-left">{error}</p>
        </div>
      </div>
    );
  }

  const activeMonthKey = monthKeys[currentMonthIndex];
  const activeMonthData = timelineData ? timelineData[activeMonthKey] : null;

  // 1. التعديل هنا: إذا كان الشهر غير موجود، ننشئ مصفوفة أيام افتراضية (مثلاً 30 يوم) للعرض الفاضي
  // أو يمكنك تركها مصفوفة فارغة [] تماماً كما تحب. هنا جعلتها تولد أياماً افتراضية لكي لا يظهر الكويمبو فاضي تماماً.
  const timelineDays = activeMonthData?.days || Array.from({ length: 30 }, (_, i) => ({
    day_number: i + 1,
    has_sessions: false,
    sessions: []
  }));
  
  const displayDays = viewType === "Week" ? timelineDays.slice(0, 7) : timelineDays;

  // 2. التعديل هنا: جلب اسم الشهر الافتراضي من المصفوفة إذا لم يكن متوفراً من السيرفر
  const currentMonthName = activeMonthData?.month_name || fallbackMonthNames[currentMonthIndex];
  
  // جلب السنة من أي شهر متاح، أو استخدام السنة الحالية كاحتياطي
  const getAvailableYear = () => {
    if (timelineData) {
      for (let key of monthKeys) {
        if (timelineData[key]?.year) return timelineData[key].year;
      }
    }
    return 2026;
  };
  const currentYear = activeMonthData?.year || getAvailableYear();

  const getSessionColor = (session, tab) => {
    if (tab === "All Sessions") {
      return session.type === "Extra" ? "var(--yellow)" : "#5570F1";
    }
    if (tab === "Today's sessions") return "#A78BFA";
    if (tab === "Completed") return "var(--green)";
    if (tab === "Extra") return "var(--yellow)";
    if (tab === "Missed") return "var(--red)";
    return "#5570F1";
  };

  return (
    <div style={{ fontFamily: "'Cairo', sans-serif" }} className="flex-1 min-h-screen bg-[var(--light-gray)] p-6 flex flex-col gap-6 items-start">
      
      <div style={{ width: "821px", height: "56px" }} className="flex items-center justify-between rounded-xl px-4 select-none flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-base font-bold text-[#1A1A2E]">{currentYear}</span>
          
          <div className="flex items-center gap-2">
            <button onClick={handlePrevMonth} className="flex h-7 w-7 items-center justify-center rounded-lg text-[#1A1A2E] hover:bg-[#F5F7FF] transition-colors duration-150 border-0 outline-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span className="min-w-[80px] text-center text-sm font-bold text-[#1A1A2E]">{currentMonthName}</span>
            <button onClick={handleNextMonth} className="flex h-7 w-7 items-center justify-center rounded-lg text-[#1A1A2E] hover:bg-[#F5F7FF] transition-colors duration-150 border-0 outline-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        <div className="flex items-center rounded-lg bg-white p-1">
          <button onClick={() => setViewType("Week")} className={`rounded-md px-4 py-1 text-xs font-bold transition-all duration-150 border-0 outline-none ${viewType === "Week" ? "bg-[var(--light-gray)] text-black shadow-sm" : "bg-white"}`}>Week</button>
          <button onClick={() => setViewType("Month")} className={`rounded-md px-4 py-1 text-xs font-bold transition-all duration-150 border-0 outline-none ${viewType === "Month" ? "bg-[var(--light-gray)] text-black shadow-sm" : "bg-white"}`}>Month</button>
        </div>
      </div>

      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ width: "821px" }} className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-[#E5E7EB] bg-[#FAFBFF]">
          {weekDaysHeaders.map((day, index) => (
            <div key={index} className="py-3 text-center text-xs font-bold text-[#1A1A2E] border-r border-[#E5E7EB] last:border-r-0">{day}</div>
          ))}
        </div>

        <div className={`grid grid-cols-7 grid-flow-row ${viewType === "Week" ? "divide-x divide-[#E5E7EB]" : ""}`}>
          {displayDays.map((day, dayIdx) => {
          
            const todayDate = new Date();
            const isTargetToday = 
              Number(day.day_number) === Number(todayDate.getDate()) &&
              currentMonthIndex === todayDate.getMonth() &&
              currentYear === todayDate.getFullYear();

            let displaySessions = [];

            if (activeTab === "Today's sessions") {
             if (activeTab === "Today's sessions") {
  if (isTargetToday) {
    displaySessions = day.sessions || [];  // بس كده — من غير mock
  } else {
    displaySessions = [];
  }
}
            } else {
              displaySessions = (day.sessions || []).filter(session => {
                if (activeTab === "All Sessions") return true;
                if (activeTab === "Completed") return session.status === "Completed";
                if (activeTab === "Extra") return session.type === "Extra";
                if (activeTab === "Missed") return session.status === "Missed";
                return false;
              });
            }

            return (
              <div 
                key={dayIdx} 
                className={`p-2 border-[#E5E7EB] flex flex-col justify-between
                  ${viewType === "Month" ? "min-h-[140px] border-r border-b last:border-r-0" : "min-h-[450px] border-b-0"}`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-xs font-bold text-[#1A1A2E]">
                    {day.day_number < 10 ? `0${day.day_number}` : day.day_number}
                  </span>
                  
                  {((activeTab === "Today's sessions" && isTargetToday) || (activeTab !== "Today's sessions" && day.has_sessions)) ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill={activeTab === "Today's sessions" ? "#A78BFA" : "#5570F1"}>
                      <polygon points="12,2 22,8.5 18,21 6,21 2,8.5" />
                    </svg>
                  ) : (
                    <div className="h-1.5 w-1.5 rounded-full bg-[#E5E7EB]" />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-start h-full w-full">
                  {displaySessions.length > 0 ? (
                    <div className={`flex flex-col gap-1.5 w-full ${viewType === "Week" ? "h-full" : ""}`}>
                      {displaySessions.map((session) => (
                        <div 
                          key={session.id} 
                          style={{ backgroundColor: getSessionColor(session, activeTab) }}
                          className={`rounded-2xl p-3 flex flex-col text-left shadow-sm select-none text-white w-full
                            ${viewType === "Week" ? "h-full justify-start items-start pt-4 pb-4 gap-1" : "gap-1 justify-center"}`}
                        >
                          <span className="text-medium font-bold opacity-90">{session.time}</span>
                          <span className="text-sm font-bold truncate w-full">{session.subject_name}</span>
                          <span className="text-xs font-medium opacity-90 truncate w-full">{session.week}</span>
                          {session.session_number && (
                            <span className="text-xs font-medium opacity-90 truncate w-full">{session.session_number}</span>
                          )}
                          <span className="text-[10px] font-black opacity-95 uppercase block mt-1">
                            {session.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    activeTab !== "Today's sessions" ? (
                      <div className="flex-1 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-400 text-center block select-none">
                          No session
                        </span>
                      </div>
                    ) : (
                      <div className="flex-1" />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

function FilterTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "All Sessions", label: "All Sessions", color: "#5570F1" },
    { id: "Today's sessions", label: "Today's session", color: "#A78BFA" }, 
    { id: "Completed", label: "Completed", color: "var(--green)" }, 
    { id: "Extra", label: "Extra", color: "var(--yellow)" },
    { id: "Missed", label: "Missed", color: "var(--red)" }
  ];

  return (
    <div className="flex items-center gap-2.5">
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: isSelected ? tab.color : "transparent",
              borderColor: isSelected ? tab.color : "#EEEEEE",
              color: isSelected ? "#FFFFFF" : "#666666"
            }}
            className={`rounded-full px-5 py-1.5 text-xs font-bold transition-all duration-150 border outline-none shadow-sm
              ${!isSelected && "bg-white hover:bg-[#F9FAFB]"}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}