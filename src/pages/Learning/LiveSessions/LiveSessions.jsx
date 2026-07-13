import { useState, useEffect } from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { MdChevronLeft, MdChevronRight } from "react-icons/md"; 
import { CiCalendar } from "react-icons/ci";
import { PiClockCountdownLight } from "react-icons/pi";
import { MdOutlineHexagon, MdHexagon } from "react-icons/md";
import { Link } from 'react-router-dom';
import Header from '../../../Components/Header/Header';
import { useOutletContext } from 'react-router-dom';
import Error from '../../../Components/Error/Error'

const LiveSessions = () => {
  const [activeTab, setActiveTab] = useState('online');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 
  const [searchQuery] = useOutletContext(); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 

  const fetchSessions = async () => {
    setLoading(true);
    setError(false);
    try {
      const url = import.meta.env.VITE_API_URL;
      const req = await fetch(`${url}/api/LiveSessions2`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await req.json();
      setSessions(data.live_sessions || data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

const filteredSessions = sessions.filter((session) => {
  const matchesTab = session.delivery_mode === activeTab;
  const matchesSearch = session.subject_name.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesTab && matchesSearch;
});
  // حساب الـ Pagination
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const currentSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // تصفير الصفحة عند تغيير التاب
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab,searchQuery]);

  if (loading) return <div className="text-center mt-20 font-bold text-[#3E63DD]">Loading Sessions...</div>;

  return (
    <div className="flex min-h-screen bg-[var(--gray-base)]">
      <div className="flex-1 flex flex-col ">
      <main className="w-[1038px] min-h-[1183px] mt-6 flex flex-col ms-5 ">
          <div className="w-[232px] h-[56px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] flex p-1" dir="ltr ">
            <button
              onClick={() => setActiveTab('online')}
              className={`flex-1 rounded-[400px] text-sm font-medium transition-all ${activeTab === 'online' ? 'bg-[var(--primary-shade)] text-black' : 'text-gray-500'}`}
            >
              online
            </button>
            <button
              onClick={() => setActiveTab('onsite')}
              className={`flex-1 rounded-[400px] text-sm font-medium transition-all ${activeTab === 'onsite' ? 'bg-[var(--primary-shade)] text-black' : 'text-gray-500'}`}
            >
              Onsite
            </button>
          </div>

          {/* Sessions Grid */}
          <div className="w-full grid grid-cols-3 gap-5 mb-10 mt-8">
            {error ? (
              <div className="col-span-3 flex justify-center">
              <Error onRetry={fetchSessions} />
              </div>
            ) : currentSessions.length > 0 ? (
              currentSessions.map((session) => (
                <SessionCard key={session.id} data={session} />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400 py-20">
                No sessions found for this category.
              </div>
            )}
          </div>

          {/* Pagination Controls - مطابق للتصميم */}
          {totalPages > 1 && !error && (
            <div className="flex justify-center items-center gap-2 mb-10 mt-6" dir="ltr">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-30"
              >
                <MdChevronLeft className="text-xl" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // منطق إظهار الأرقام (1 2 3 4 5 ... 8)
                if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center text-sm font-medium ${currentPage === pageNum ? 'text-[#3E63DD] font-bold' : 'text-gray-500'}`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
              
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-30"
              >
                <MdChevronRight className="text-xl" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
// Sub-Component: Session Card
const SessionCard = ({ data }) => {
  const isToday = data.status === "today";
  const isCompleted = data.status === "completed";

  return (
    <div className="w-[330px] h-[357px] bg-white border-[0.5px] border-black/5 rounded-xl p-5 flex flex-col justify-between shadow-sm">
      <div>
        <span className={`text-[12px] font-semibold px-2 py-1 rounded ${
          isCompleted ? 'bg-[var(--primary-shade)] text-black' :
          isToday ? 'bg-[var(--primary-shade)] text-black' : 'bg-[var(--primary-shade)] text-black'
        }`}>
          {data.status === "completed" ? "Completed" : data.status === "today" ? "Today Session" : "Pending"}
        </span>

        <div className="mt-3">
          <p className="text-[14px] text-gray-700">Week {data.week} - Session {data.session_number} - {data.type}</p>
          <h3 className="text-[16px] font-bold text-[#3E63DD] mt-1">{data.subject_name}</h3>
        </div>
        <div className="flex gap-4 mt-4 text-[12px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <CiCalendar className="text-lg" />
            {data.date}
          </span>
          <span className="flex items-center gap-1.5">
            <PiClockCountdownLight className="text-lg" />
            {data.time}
          </span>
        </div>

        <div className="mt-5 space-y-2">
          <CheckItem label="Attendance" isDone={data.checklist?.attendance} />
          <CheckItem label="Task" isDone={data.checklist?.task} />
          <CheckItem label="Survey" isDone={data.checklist?.survey} />
        </div>
      </div>

      {(isCompleted || isToday) && (
        <Link to={`/SessionDetails/${data.id}`} className="w-full">
          <button className={`w-full h-10 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 text-white transition-opacity hover:opacity-90 ${
            isToday ? 'bg-[#B08DF7]' : 'bg-[#5C80ED]'
          }`}>
            {data.resources?.button_text || "View Record"} <span>›</span>
          </button>
        </Link>
      )}
    </div>
  );
};

const CheckItem = ({ label, isDone }) => (
  <div className="flex justify-between items-center text-[14px] text-gray-500 mb-2">
    <span>{label}</span>
    <div className="flex items-center justify-center">
      {isDone ? (
        <MdHexagon className="text-[22px] text-[#3E63DD] transition-all duration-300" />
      ) : (
        <MdOutlineHexagon className="text-[22px] text-gray-300 transition-all duration-300" />
      )}
    </div>
  </div>
);

export default LiveSessions;