import React, { useState , useEffect } from 'react';

export default function DetailsTask({ taskData, onBack }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'});
  }, []);
  if (!taskData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center w-full">
       <p className="text-red-500 font-bold mb-4">⚠️ No assignment data found.</p>
      <button onClick={onBack} className="text-[#4F46E5] underline cursor-pointer">
        Go Back
      </button>
      </div>
    );
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf" || f.name.endsWith('.pdf'));
    setFiles(prev => {
      const names = prev.map(f => f.name);
      return [...prev, ...droppedFiles.filter(f => !names.includes(f.name))];
    });
  };

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files).filter(f => f.type === "application/pdf" || f.name.endsWith('.pdf'));
    setFiles(prev => {
      const names = prev.map(f => f.name);
      return [...prev, ...selected.filter(f => !names.includes(f.name))];
    });
    e.target.value = '';
  };

  const removeFile = (name) => {
    setFiles(prev => prev.filter(f => f.name !== name));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div style={{ fontFamily: "'Cairo', sans-serif" }} className="flex-1 min-h-screen bg-[#F8FAFC] p-8 flex flex-col items-center justify-start w-full">

      <div className="w-full max-w-[1016px] mb-4 flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors cursor-pointer border-0 outline-none bg-transparent"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Materials
        </button>
      </div>

      <div className="w-full max-w-[1016px] bg-white rounded-[30px] p-6 flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.015)] border border-[#E2E8F0]/60">

        <div className="flex justify-between items-center w-full mb-4">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full text-[#0F172A] bg-[#F1F5F9]">
            {taskData.status || "Today's task"}
          </span>
          <span className="text-[11px] text-[#666a70] font-bold tracking-wide">
            {taskData.week || `${taskData.week} - ${taskData.session_number} - ${taskData.rawAssignment?.session_type || 'Technical'}`}
          </span>
        </div>

        <h2 className="text-[#2563EB] font-bold text-[22px] mb-4 tracking-wide">
          {taskData.subject_name || taskData.subject || "The name of subject"}
        </h2>

        <p className="text-[13px] text-[#334155] leading-[1.8] text-justify font-medium mb-5 whitespace-pre-line">
          {taskData.description || "Design a web app for e-commerce (for example: selling kids' clothes). You will carry out research, market/competitive analysis. Deliverables PDF File that contains the activities below..."}
        </p>

        <div className="flex gap-5 text-[12px] text-[#94A3B8] font-bold mb-6" dir="ltr">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#94A3B8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>{taskData.assignment?.due_date || taskData.date || "25-10-2025"}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#94A3B8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{taskData.assignment?.due_time || taskData.time || "19:00:00"}</span>
          </div>
        </div>

        <h3 className="text-[#2563EB] font-bold text-[16px] mb-4">
          Upload Your Answer
        </h3>

        <div className="w-full flex flex-col items-center justify-center">

          <div className="flex flex-col gap-2 mb-5 w-full max-w-[560px]">
            <span className="text-[15px] text-[#575a61]  self-start">Submission Type</span>
            <div className="relative w-full">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <select
                value="PDF"
                onChange={() => {}}
                className="w-full bg-white border border-[#E2E8F0] rounded-[14px] pl-10 pr-10 py-3 text-xs font-bold text-[#7b7d81] appearance-none cursor-pointer focus:outline-none focus:border-[#2563EB]"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <option value="PDF">PDF</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8] w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>

          <div className="w-full max-w-[560px] border border-dashed border-[#93C5FD] rounded-[24px]   bg-white">
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload-input').click()}
              className={`w-full rounded-[18px] p-12 flex flex-col items-center justify-center transition-all cursor-pointer  '
              }`}
             
            >
    <div className="w-24 h-24 rounded-full bg-[#EBF2FF] flex items-center justify-center mb-5 animate-pulse-slow">
     <div className="w-20 h-20 rounded-full bg-[#DCE8FF] flex items-center justify-center">
     <div className="w-14 h-14 rounded-full bg-[#B9D3FF] flex items-center justify-center">
      <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a3 3 0 003-3V9.172a2 2 0 00-.586-1.414l-4.172-4.172A2 2 0 0013.828 3H7a3 3 0 00-3 3v12a3 3 0 003 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4a2 2 0 002 2h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v5m0 0l-2-2m2 2l2-2" />
      </svg>
    </div>
    </div>
   </div>
              <p className="text-[14px] font-bold text-[#0F172A] mb-1">
                Drop your PDF file here, or{' '}
                <span className="text-[#2563EB] font-black hover:underline">browse</span>
              </p>
              <p className="text-[11px] text-[#94A3B8] font-bold tracking-wide">
                PDF files only, up to 10MB
              </p>
            </div>
          </div>

          <input
            id="file-upload-input"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileSelect}
            multiple
          />

          {files.length > 0 && (
            <div className="flex flex-col gap-2 mt-4 w-full max-w-[560px]">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] px-4 py-3"
                  
                >
                  <svg className="w-5 h-5 text-[#2563EB] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V9l-5-6z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5a1 1 0 001 1h4"/>
                  </svg>
                  <span className="text-[12px] font-bold text-[#0F172A] flex-1 truncate">{file.name}</span>
                  <span className="text-[11px] text-[#94A3B8] font-bold shrink-0">{formatSize(file.size)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(file.name); }}
                    className="text-[#CBD5E1] hover:text-[#EF4444] transition-colors border-0 bg-transparent cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            disabled={files.length === 0}
            className={`mt-6 w-full max-w-[560px] text-white font-bold text-xs py-4 rounded-[16px] transition-all tracking-wide border-0 outline-none ${
              files.length > 0
                ? 'bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer'
                : 'bg-[#93C5FD] cursor-not-allowed'
            }`}
          >
            Submit Assignment
          </button>

        </div>
      </div>
    </div>
  );
}