import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  HiOutlineClipboardList, 
  HiOutlineCheckCircle, 
  HiOutlineDocumentText, 
  HiOutlineXCircle 
} from "react-icons/hi";
import Error from '../../../Components/Error/Error';
const Dashboard = () => {
const totalIcon = <HiOutlineClipboardList className="w-8 h-8 text-[#193FB3]" />;
const completedIcon = <HiOutlineCheckCircle className="w-8 h-8 text-[#1DBD53]" />;
const reviewedIcon = <HiOutlineDocumentText className="w-8 h-8 text-[#7944E4]" />;
const missedIcon = <HiOutlineXCircle className="w-8 h-8 text-[#DE5743]" />;

  const [data, setData] = useState({ stats: null, attendanceSummary: null, growth: [], chartData: null });
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
    setError(false);
      try {
        const [statsRes, attendanceRes, growthRes, chartRes] = await Promise.all([
          fetch('http://localhost:3000/stats'),
          fetch('http://localhost:3000/attendanceSummary'),
          fetch('http://localhost:3000/growthAreas'),
          fetch('http://localhost:3000/chartData')
        ]);
        
        setData({
          stats: await statsRes.json(),
          attendanceSummary: await attendanceRes.json(),
          growth: await growthRes.json(),
          chartData: await chartRes.json()
        });
        setLoading(false);
      } catch (error) {
       setError(true); // 2. يجب تفعيل الخطأ هنا
      setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  const chartDataFormatted = data.chartData.labels.map((label, index) => ({
    name: label,
    technical: data.chartData.technical[index],
    nonTechnical: data.chartData.nonTechnical[index]
  }));


  if (error) {
  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <Error onRetry={fetchData} />
    </div>
  );
}
  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F9FAFB] min-h-screen">
      <div className="w-full max-w-[1100px] mx-auto bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Tasks", val: data.stats.totalTasks, icon: totalIcon },
            { label: "Completed Tasks", val: data.stats.completedTasks, icon: completedIcon },
            { label: "Reviewed Tasks", val: data.stats.reviewedTasks, icon: reviewedIcon },
            { label: "Missed Tasks", val: data.stats.missedTasks, icon: missedIcon },
          ].map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <h2 className="text-2xl font-bold mt-1">{item.val}</h2>
              </div>
              <div className="mt-1">{item.icon}</div>
            </div>
          ))}
        </div>

        {/* التعديل هنا: استخدام grid-cols-[330px,1fr] عشان الـ Chart يكون أكبر */}
        <div className="grid grid-cols-1 lg:grid-cols-[330px,1fr] gap-8 mb-8">
          
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-6 text-lg">Attendance Summary</h3>
            <div className="flex items-center gap-6">
              <div className="h-[120px] w-[120px] relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {[
                      { val: data.attendanceSummary.totalSessions, color: '#193FB3', inner: 50, outer: 60, max: 50 },
                      { val: data.attendanceSummary.passedSessions, color: '#7944E4', inner: 40, outer: 48, max: 40 },
                      { val: data.attendanceSummary.attendSessions, color: '#44E479', inner: 30, outer: 38, max: 30 },
                      { val: data.attendanceSummary.missedSessions, color: '#C54216', inner: 20, outer: 28, max: 10 },
                    ].map((entry, index) => {
                      const percentage = (entry.val / entry.max) * 360;
                      return (
                        <Pie
                          key={index}
                          data={[{ value: entry.val }]}
                          innerRadius={entry.inner}
                          outerRadius={entry.outer}
                          startAngle={90}
                          endAngle={90 - percentage}
                          stroke="none"
                          cornerRadius={10}
                        >
                          <Cell fill={entry.color} />
                        </Pie>
                      );
                    })}
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col">
                <p className="text-2xl font-bold">{data.attendanceSummary.percentage}%</p>
                <p className="text-[11px] text-gray-500 font-medium">Attendance</p>
              </div>
            </div>
            <div className="w-full mt-6 space-y-3">
              {[
                { label: "Total Sessions", val: data.attendanceSummary.totalSessions, color: '#193FB3' },
                { label: "Passed Sessions", val: data.attendanceSummary.passedSessions, color: '#7944E4' },
                { label: "Attend Sessions", val: data.attendanceSummary.attendSessions, color: '#44E479' },
                { label: "Missed Sessions", val: data.attendanceSummary.missedSessions, color: '#C54216' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="font-bold text-gray-900">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-6 font-semibold text-sm">
                <span className="text-black border-b-2 border-black pb-1 cursor-pointer">Active in sessions</span>
                <span className="text-gray-400 cursor-pointer">Technical</span>
                <span className="text-gray-400 cursor-pointer">Non-technical</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-black"></span> This year
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-gray-300"></span> This month
                </span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartDataFormatted}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
                  <Tooltip cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }} />
                  <Line type="monotone" dataKey="technical" stroke="#1DBD53" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="nonTechnical" stroke="#7944E4" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

<div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
  <div className="flex justify-between items-center mb-6">
    <h3 className="font-bold text-lg">Growth Areas</h3>
    
    <button className=" text-[#7944E4] text-sm font-semibold">Analyze Full Performance</button>
  </div>
   <h3 className=" text-base mb-5 text-[#666666]">Topics where you have scored below 60% in recent quizzes</h3>
  <table className="w-full">
    <thead>
      <tr className="text-left text-xs text-gray-400 border-b">
        <th className="pb-3 font-medium">Topic</th>
        <th className="pb-3 font-medium">Proficiency</th>
        <th className="pb-3 font-medium">Rate</th>
        <th className="pb-3 font-medium">Recommended Action</th>
      </tr>
    </thead>
    <tbody>
      {data.growth.map((item) => {
        // تحديد الألوان بناءً على النسبة
        const isHigh = item.proficiency > 70; // أداء عالي -> أزرق
        const isMedium = item.proficiency > 50; // أداء متوسط -> بنفسجي
        const barColor = isHigh ? '#5C80ED' : (isMedium ? '#7944E4' : '#DE5743');
        const textColor = isHigh ? '#5C80ED' : (isMedium ? '#7944E4' : '#DE5743');

        return (
          <tr key={item.id} className="text-sm border-b last:border-0 hover:bg-gray-50 transition-colors">
            <td className="py-4 font-semibold text-gray-800">{item.topic}</td>
            
            <td className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-1.5 rounded-full" 
                    style={{ width: `${item.proficiency}%`, backgroundColor: barColor }} 
                  />
                </div>
                <span className="font-bold text-xs" style={{ color: textColor }}>
                  {item.proficiency}%
                </span>
              </div>
            </td>
            
            <td className="py-4 text-gray-600">{item.rate}</td>
            
            <td className="py-4">
              <a href={item.actionUrl} className="text-[#7944E4] font-medium flex items-center gap-1 hover:underline">
                {item.actionText || "Topic name"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default Dashboard;