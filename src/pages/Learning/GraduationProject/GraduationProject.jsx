import React, { useState, useEffect } from 'react';

const GraduationProject = () => {
  const [isUploading, setIsUploading] = useState(() => sessionStorage.getItem('isUploading') === 'true');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [stages, setStages] = useState([]);

  const [formData, setFormData] = useState({
    StudentId: '',
    ProjectName: '',
    LeadProject: '',
    DescriptionProject: '',
    UploadDocument: null
  });

  // دالة لجلب التوكن من الـ LocalStorage باستخدام المفتاح 'tc'
  const getToken = () => localStorage.getItem('tc');

  const handleDelete = (stageIndex) => {
    const updatedStages = stages.filter((_, index) => index !== stageIndex);
    setStages(updatedStages);
  };

  useEffect(() => {
    const fetchStages = async () => {
      const url = import.meta.env.VITE_API_URL;
      const token = getToken();

      try {
        const response = await fetch(`${url}/api/GraduationProject/my-submission`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 200) {
          const data = await response.json();
          setStages(Array.isArray(data) ? data : []);
        } else {
          console.error("غير مصرح لك بالدخول، يرجى تسجيل الدخول.");
        }
      } catch (err) { console.error("Error fetching data:", err); }
    };
    fetchStages();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isUploading', isUploading);
  }, [isUploading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'StudentId' ? parseInt(value) || '' : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, UploadDocument: e.target.files[0] }));
    if (errors.UploadDocument) setErrors(prev => ({ ...prev, UploadDocument: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    
    const data = new FormData();
    data.append('StudentId', formData.StudentId);
    data.append('ProjectName', formData.ProjectName);
    data.append('LeadProject', formData.LeadProject);
    data.append('DescriptionProject', formData.DescriptionProject);
    if (formData.UploadDocument) {
      data.append('UploadDocument', formData.UploadDocument);
    }

    setLoading(true);
    const url = import.meta.env.VITE_API_URL;
    
    try {
      const response = await fetch(`${url}/api/GraduationProject/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      if (response.status === 200 || response.status === 201) {
        setMessage("Project submitted successfully!");
        setIsUploading(false);
        setFormData({ StudentId: '', ProjectName: '', LeadProject: '', DescriptionProject: '', UploadDocument: null });
        
        const updatedRes = await fetch(`${url}/api/GraduationProject/my-submission`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const updatedData = await updatedRes.json();
        console.log("البيانات القادمة من السيرفر:", updatedData);
        setStages(updatedData);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage("Error submitting project.");
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      setMessage("Server connection error.");
      setTimeout(() => setMessage(null), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-2 md:p-4">
      <div className="w-full max-w-[1039px] mx-auto bg-white px-4 md:px-6 py-4 rounded-xl border border-gray-100 shadow-sm min-h-[600px] relative">
        {message && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {message}
          </div>
        )}
        
        {isUploading ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit new project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                <input type="number" name="StudentId" value={formData.StudentId} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B08DF7]" placeholder="Enter Student ID" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input type="text" name="ProjectName" value={formData.ProjectName} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B08DF7]" placeholder="Enter project name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Project</label>
                <input type="text" name="LeadProject" value={formData.LeadProject} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B08DF7]" placeholder="Enter lead name" required />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description Project</label>
              <textarea name="DescriptionProject" value={formData.DescriptionProject} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg h-32 outline-none focus:ring-2 focus:ring-[#B08DF7]" placeholder="Input description project" required />
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center mb-auto">
              <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" required />
              <label htmlFor="fileInput" className="cursor-pointer w-full">
                <p className="text-gray-600 font-medium text-sm md:text-base">Click to <span className="text-[#B08DF7]">upload document</span></p>
                <span className="text-[#B08DF7] font-semibold mt-2 block">Browse files</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row justify-between pt-4 gap-3">
              <button type="button" onClick={() => setIsUploading(false)} className="px-6 py-2 text-[#B08DF7] border border-[#B08DF7] rounded-lg w-full sm:w-auto">Cancel</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-[#B08DF7] text-white rounded-lg hover:bg-[#a07df5] w-full sm:w-auto">{loading ? "Uploading..." : "Upload"}</button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col h-full min-h-[600px]">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Graduation Project</h2>
              <p className="text-gray-500 mt-1">Set up your project workflow for management and efficiency</p>
            </div>
            
{stages.length > 0 ? (
  <div className="flex flex-col h-full min-h-[600px]">
    {/* القائمة */}
    <div className="flex-grow py-8 space-y-4">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-[#B08DF7] transition-all">
          <span className="font-medium text-gray-700">{stage.projectName}</span>
          <button onClick={() => handleDelete(index)} className="text-[#B08DF7] font-semibold">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66699 7.33398V11.334" stroke="#B08DF7" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.33301 7.33398V11.334" stroke="#B08DF7" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.6663 4V13.3333C12.6663 14.0692 12.0689 14.6667 11.333 14.6667H4.66634C3.93045 14.6667 3.33301 14.0692 3.33301 13.3333V4" stroke="#B08DF7" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 4H14" stroke="#B08DF7" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.33301 4.00065V2.66732C5.33301 1.93143 5.93045 1.33398 6.66634 1.33398H9.33301C10.0689 1.33398 10.6663 1.93143 10.6663 2.66732V4.00065" stroke="#B08DF7" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      ))}
    </div>

    {/* الزر بالأسفل */}
<div className="mt-auto pt-6 border-t border-gray-100 flex justify-end">
  <button 
    onClick={() => setIsUploading(true)} 
    className="px-8 py-3 bg-[#B08DF7] text-white rounded-xl hover:bg-[#a07df5]"
  >
    Upload new file +
  </button>
</div>
  </div>
) : (
  // حالة عدم وجود بيانات
  <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
    <div className="mb-6">
      <img src="/Image.png" alt="No data" className="w-64 h-auto object-contain" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800">There is no data to display.</h3>
    <p className="text-gray-500 mb-6">Setup your business. Enter your details to proceed further</p>
    <button onClick={() => setIsUploading(true)} className="px-8 py-3 bg-[#B08DF7] text-white rounded-xl hover:bg-[#a07df5]">Upload new file +</button>
  </div>
)}
          </div>
        )}
      </div>
    </div>
  );
};

export default GraduationProject;