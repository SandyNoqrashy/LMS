import React, { useState } from 'react';

const faqData = [
  { id: 1, question: "How do I access and join live sessions?", answer: "You can join live sessions by navigating to the Sessions page. Upcoming sessions will display their date, time, instructor, and a Join Session button when the session is available." },
  { id: 2, question: "How do I track my learning progress?", answer: "Your progress is automatically tracked as you complete lessons, attend sessions, and submit assignments. Visit your Timeline or Profile to view your completed activities and overall progress." },
  { id: 3, question: "How do I submit assignments?", answer: "Open the relevant course or session, select the assignment, upload the required files before the deadline, and click Submit. You'll receive a confirmation once your submission is successful." },
  { id: 4, question: "What happens if I miss a live session?", answer: "If a session recording is available, you can watch it later from the Resources or Sessions section. Some instructors may also upload presentation materials and notes." },
  { id: 5, question: "Where can I find course materials?", answer: "Course resources, presentations, recordings, templates, and reference documents are available in the Resources section." },
  { id: 6, question: "How do I participate in the community?", answer: "Visit the Community page to ask questions, share ideas, participate in discussions, and connect with instructors and fellow learners." },
  { id: 7, question: "How can I contact support?", answer: "Go to the Support section to report technical issues, ask questions, or request assistance. Our support team will respond as soon as possible." },
];

const FAQs = () => {
  const [openIds, setOpenIds] = useState([]);

  const toggleAccordion = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="w-full max-w-[1039px] mx-auto bg-white p-6 rounded-xl border border-gray-100">
        
        {/* العنوان */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-500 mt-2">
            Everything you need to know about learning, sessions, deadlines, resources, and your account—all in one place.
          </p>
        </div>

        {/* قائمة الأسئلة */}
        <div className="flex flex-col gap-4">
          {faqData.map((item) => (
            <div 
              key={item.id} 
              className={`rounded-xl overflow-hidden transition-all duration-300 border ${
                openIds.includes(item.id) 
                  ? "border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] bg-white" 
                  : "border-transparent hover:border-gray-100"
              }`}
            >
              <div 
                onClick={() => toggleAccordion(item.id)}
                className={`w-full flex justify-between items-center p-4 cursor-pointer transition-colors ${
                  openIds.includes(item.id) ? "bg-white" : "hover:bg-gray-50"
                }`}
              >
                <span className={`font-medium ${openIds.includes(item.id) ? "text-gray-900" : "text-gray-800"}`}>
                  {item.id}. {item.question}
                </span>
                
                {/* تبديل الأيقونات بناءً على الحالة */}
                {openIds.includes(item.id) ? (
                  <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <g filter="url(#filter0_dii_806_2770)">
                      <rect width="34.4175" height="34.4175" rx="17.2088" transform="matrix(1 0 0 -1 6 38.418)" fill="url(#paint0_linear_806_2770)" shapeRendering="crispEdges"/>
                      <path d="M17.2539 23.2793L23.209 17.3242L29.1641 23.2793" stroke="white" strokeWidth="1.70146" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <filter id="filter0_dii_806_2770" x="0" y="0" width="46.418" height="46.418" filterUnits="userSpaceOnUse">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_806_2770"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_806_2770" result="shape"/>
                      </filter>
                      <linearGradient id="paint0_linear_806_2770" x1="23.5892" y1="0" x2="15.8169" y2="33.5092" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#897FFF"/><stop offset="1" stopColor="#4A3AFF"/>
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </div>
              
              {/* الإجابة */}
              {openIds.includes(item.id) && (
                <div className="px-4 pb-4 text-gray-500 text-sm animate-in fade-in slide-in-from-top-2 duration-300 bg-white">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default FAQs;
