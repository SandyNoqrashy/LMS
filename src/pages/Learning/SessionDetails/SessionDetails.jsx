import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdPlayCircleOutline } from "react-icons/md";

import { Link } from 'react-router-dom'; // تأكدي من استيراد Link
const SessionDetails = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [allSessions, setAllSessions] = useState([]);
  const [filter, setFilter] = useState('all'); // للتبديل بين All, Viewed, Uncompleted

  useEffect(() => {
    // جلب بيانات السيشن الحالية
    fetch(`http://localhost:3000/live_sessions/${id}`)
      .then(res => res.json())
      .then(data => setSession(data));

    // جلب كل السيشنات للقائمة الجانبية
    fetch(`http://localhost:3000/live_sessions`)
      .then(res => res.json())
      .then(data => setAllSessions(data.live_sessions || data));
  }, [id]);

  if (!session) return <div>Loading...</div>;

  return (
    <div className="flex p-8 gap-8 bg-gray-50 min-h-screen ">
      <div className="w-[1039px] mx-auto bg-white p-6 rounded-xl border border-gray-100 flex gap-8">
{/* الجزء الرئيسي (الفيديو والتفاصيل) */}
<div className="flex-1 ">
  
 <div className="flex items-center gap-3 mb-6">
    <Link to="/LiveSessions" className="text-[#193FB3] transition-colors">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </Link>
    <h1 className="text-2xl font-bold text-[#193FB3]">
      Session {session.session_number}
      <span className="text-gray-900 font-bold ml-2">{session.subject_name}</span>
    </h1>
  </div>
  
  {/* كارد الفيديو */}
  <div className="w-full h-[450px] bg-black rounded-2xl flex items-center justify-center text-white mb-6">
    <MdPlayCircleOutline size={80} />
  </div>

  {/* 2. التاجات */}
  <div className="flex gap-3 mb-6">
    <span className="bg-[#FAFAFA] border-[0.5px] border-[#FAFAFA] shadow-[2px_2px_4px_rgba(0,0,0,0.1)] rounded-[500px] px-5 py-2 text-sm text-gray-700">
      Week {session.week}
    </span>
    <span className="bg-[#FAFAFA] border-[0.5px] border-[#FAFAFA] shadow-[2px_2px_4px_rgba(0,0,0,0.1)] rounded-[500px] px-5 py-2 text-sm text-gray-700">
      {session.type}
    </span>
    <span className="bg-[#FAFAFA] border-[0.5px] border-[#FAFAFA] shadow-[2px_2px_4px_rgba(0,0,0,0.1)] rounded-[500px] px-5 py-2 text-sm text-gray-700">
      {session.delivery_mode}
    </span>
  </div>

  {/* 3. الاسم الثانوي + الديسكربشن */}
  <div className="mt-4">
    <h3 className="text-lg font-semibold text-gray-800">
      {session.title_secondary}
    </h3>
    <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-2xl">
      {session.description}
    </p>
  </div>
</div>

      {/* القائمة الجانبية */}
      <div className="w-[350px] bg-white p-6 rounded-xl border border-gray-100">
   <div className="flex gap-2 mb-6 text-sm font-semibold">
    {['all', 'viewed', 'uncompleted'].map((f) => (
      <button
        key={f}
        onClick={() => setFilter(f)}
        className={`
          w-[117px] h-[40px] rounded-[700px] capitalize transition-colors
          ${filter === f 
            ? 'bg-[#F5F7FF] text-primary border-none' 
            : 'bg-transparent text-gray-400 hover:bg-gray-50'
          }
        `}
      >
        {f}
      </button>
    ))}
  </div>



<div className="space-y-4">
{allSessions.map((s) => {
  // المقارنة بين الـ ID الحالي والـ ID في القائمة
  const isActive = String(s.id) === String(id);

  return (
    <Link key={s.id} to={`/SessionDetails/${s.id}`} className="block">
      <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
        
        {/* هنا التغيير: الأيقونة فقط هي التي تتغير بناءً على الحالة */}
        {isActive ? (
          // الأيقونة الملونة (المفعلة)
          <svg width="40" height="40" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_316_4818)">
              <path d="M6 23.5C6 13.835 13.835 6 23.5 6C33.165 6 41 13.835 41 23.5C41 33.165 33.165 41 23.5 41C13.835 41 6 33.165 6 23.5Z" fill="#F8F5FF" shapeRendering="crispEdges"/>
              <path d="M23.5 6.0498C33.1374 6.0498 40.9502 13.8626 40.9502 23.5C40.9502 33.1374 33.1374 40.9502 23.5 40.9502C13.8626 40.9502 6.0498 33.1374 6.0498 23.5C6.0498 13.8626 13.8626 6.0498 23.5 6.0498Z" stroke="#B08DF7" strokeWidth="0.1" shapeRendering="crispEdges"/>
              <path d="M14.5685 22.2416C14.4772 23.0148 14.4772 23.7967 14.5685 24.5698M18.0698 15.8985C18.6646 15.429 19.3124 15.0378 19.9987 14.7337M15.2086 19.7438C15.499 19.0264 15.8727 18.349 16.3212 17.7269M23.5168 14C28.4787 14 32.5 18.2531 32.5 23.5C32.5 28.7469 28.4787 33 23.5168 33C20.0979 33 17.1249 30.9802 15.607 28.0074M20.7241 26.0782V20.9218C20.7241 20.3255 21.3866 19.9485 21.9261 20.2378L26.7357 22.8175C26.8601 22.8779 26.9654 22.9743 27.0392 23.0952C27.1129 23.2161 27.1521 23.3566 27.1521 23.5C27.1521 23.6434 27.1129 23.7839 27.0392 23.9048C26.9654 24.0257 26.8601 24.1221 26.7357 24.1825L21.9275 26.7622C21.3866 27.0515 20.7241 26.6745 20.7241 26.0782Z" stroke="#7944E4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        ) : (
          // الأيقونة الرمادية العادية
          <svg width="40" height="40" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_316_4817)">
              <path d="M6 23.5C6 13.835 13.835 6 23.5 6C33.165 6 41 13.835 41 23.5C41 33.165 33.165 41 23.5 41C13.835 41 6 33.165 6 23.5Z" fill="white" shapeRendering="crispEdges"/>
              <path d="M23.5 6.0498C33.1374 6.0498 40.9502 13.8626 40.9502 23.5C40.9502 33.1374 33.1374 40.9502 23.5 40.9502C13.8626 40.9502 6.0498 33.1374 6.0498 23.5C6.0498 13.8626 13.8626 6.0498 23.5 6.0498Z" stroke="#D7D7D7" strokeWidth="0.1" shapeRendering="crispEdges"/>
              <path d="M14.5685 22.2416C14.4772 23.0148 14.4772 23.7967 14.5685 24.5698M18.0698 15.8985C18.6646 15.429 19.3124 15.0378 19.9987 14.7337M15.2086 19.7438C15.499 19.0264 15.8727 18.349 16.3212 17.7269M23.5168 14C28.4787 14 32.5 18.2531 32.5 23.5C32.5 28.7469 28.4787 33 23.5168 33C20.0979 33 17.1249 30.9802 15.607 28.0074M20.7241 26.0782V20.9218C20.7241 20.3255 21.3866 19.9485 21.9261 20.2378L26.7357 22.8175C26.8601 22.8779 26.9654 22.9743 27.0392 23.0952C27.1129 23.2161 27.1521 23.3566 27.1521 23.5C27.1521 23.6434 27.1129 23.7839 27.0392 23.9048C26.9654 24.0257 26.8601 24.1221 26.7357 24.1825L21.9275 26.7622C21.3866 27.0515 20.7241 26.6745 20.7241 26.0782Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        )}

        {/* بقية البيانات (النص كما هو دون أي تغيير) */}
        <div>
          <p className="text-sm font-medium text-gray-900">
            Session {s.session_number}. {s.subject_name}
          </p>
          <p className="text-xs text-gray-400">
            {s.resources?.duration || "00:00:00"}
          </p>
        </div>
      </div>
    </Link>
  
  );
})}
</div>
</div>
      </div>
    </div>
  );
};

export default SessionDetails;


{/* <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_316_4817)">
<path d="M6 23.5C6 13.835 13.835 6 23.5 6C33.165 6 41 13.835 41 23.5C41 33.165 33.165 41 23.5 41C13.835 41 6 33.165 6 23.5Z" fill="white" shape-rendering="crispEdges"/>
<path d="M23.5 6.0498C33.1374 6.0498 40.9502 13.8626 40.9502 23.5C40.9502 33.1374 33.1374 40.9502 23.5 40.9502C13.8626 40.9502 6.0498 33.1374 6.0498 23.5C6.0498 13.8626 13.8626 6.0498 23.5 6.0498Z" stroke="#D7D7D7" stroke-width="0.1" shape-rendering="crispEdges"/>
<path d="M14.5685 22.2416C14.4772 23.0148 14.4772 23.7967 14.5685 24.5698M18.0698 15.8985C18.6646 15.429 19.3124 15.0378 19.9987 14.7337M15.2086 19.7438C15.499 19.0264 15.8727 18.349 16.3212 17.7269M23.5168 14C28.4787 14 32.5 18.2531 32.5 23.5C32.5 28.7469 28.4787 33 23.5168 33C20.0979 33 17.1249 30.9802 15.607 28.0074M20.7241 26.0782V20.9218C20.7241 20.3255 21.3866 19.9485 21.9261 20.2378L26.7357 22.8175C26.8601 22.8779 26.9654 22.9743 27.0392 23.0952C27.1129 23.2161 27.1521 23.3566 27.1521 23.5C27.1521 23.6434 27.1129 23.7839 27.0392 23.9048C26.9654 24.0257 26.8601 24.1221 26.7357 24.1825L21.9275 26.7622C21.3866 27.0515 20.7241 26.6745 20.7241 26.0782Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_d_316_4817" x="0" y="0" width="51" height="51" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_316_4817"/>
<feOffset dx="2" dy="2"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_316_4817"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_316_4817" result="shape"/>
</filter>
</defs>
</svg> */}
