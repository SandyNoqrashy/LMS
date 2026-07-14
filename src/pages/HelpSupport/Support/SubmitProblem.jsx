import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Components/Context/Context.jsx'; // استيراد الـ Context
import { HiOutlineCloudArrowUp, HiCircleStack } from "react-icons/hi2";

const SubmitProblem = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // جلب بيانات المستخدم
  const fileInputRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [categories] = useState([
    { id: "1", name: "Course Content Help" },
    { id: "2", name: "Account & Security" },
    { id: "3", name: "Video & Lesson Issues" },
    { id: "4", name: "Certification Support" }
  ]);
  const [systemStatus] = useState({ message: "All systems operational" });
  const [formData, setFormData] = useState({ subject: "", category: "", description: "" });
  const [errors, setErrors] = useState({ subject: false, category: false, description: false });

  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) setFormData(prev => ({ ...prev, category: savedCategory }));
  }, []);

  const handleUploadClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => { if (e.target.files[0]) setFile(e.target.files[0]); };

const handleSubmit = async (e) => {
  e.preventDefault();

  // إرسال البيانات كـ JSON صريح
  await fetch("http://campus.runasp.net/api/Support/tickets", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("tc"),
      "Content-Type": "application/json" // ضروري جداً للـ 415
    },
    body: JSON.stringify({
      studentId: parseInt(user?.UserId) || 0,
      title: formData.subject,
      description: formData.description,
      category: formData.category,
      priority: "Normal"
    })
  });

  localStorage.removeItem('selectedCategory');
  navigate('/Support');
};

  return (
    <div className="flex min-h-screen w-full bg-[var(--gray-base)] overflow-x-hidden">
      <div className="flex-1 flex flex-col w-full">
        <main className="flex justify-center p-4 md:p-8 w-full">
          <div className="bg-white rounded-2xl border border-[var(--gray-base)] shadow-sm p-6 md:p-8 w-full max-w-[1000px] min-h-[auto]">
            <h1 className="text-xl md:text-2xl font-bold mb-2">Submit your Problem</h1>
            <p className="text-[var(--dark-gray)] mb-8 text-sm md:text-base">Our team typically responds within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                className={`w-full p-4 rounded-xl border outline-none transition-all ${errors.subject ? 'border-red-500' : 'border-[var(--gray-base)] focus:border-[var(--primary)]'}`}
                placeholder="Briefly describe your issue"
                value={formData.subject}
                onChange={(e) => {
                    setFormData({...formData, subject: e.target.value});
                    if(errors.subject) setErrors({...errors, subject: false});
                }}
              />

              <select 
                className={`w-full p-4 rounded-xl border outline-none transition-all ${errors.category ? 'border-red-500' : 'border-[var(--gray-base)] focus:border-[var(--primary)]'}`}
                value={formData.category}
                onChange={(e) => {
                    setFormData({...formData, category: e.target.value});
                    if(errors.category) setErrors({...errors, category: false});
                }}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <textarea 
                className={`w-full p-4 h-40 rounded-xl border outline-none transition-all ${errors.description ? 'border-red-500' : 'border-[var(--gray-base)] focus:border-[var(--primary)]'}`}
                placeholder="Tell us more about the problem..."
                value={formData.description}
                onChange={(e) => {
                    setFormData({...formData, description: e.target.value});
                    if(errors.description) setErrors({...errors, description: false});
                }}
              />

              <div className="border-2 border-dashed border-[var(--gray-base)] rounded-xl p-6 md:p-10 text-center cursor-pointer" onClick={handleUploadClick}>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                <HiOutlineCloudArrowUp className="mx-auto text-[#7944E4] mb-2" size={40} />
                <p className="font-bold text-[#7944E4] break-all">{file ? file.name : "Click to upload"}</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[var(--gray-base)] gap-4">
                <div className="flex items-center gap-2 text-sm text-[var(--green)] font-semibold">
                  <HiCircleStack size={18} /> {systemStatus.message}
                </div>
                <button type="submit" className="w-full sm:w-auto bg-[#7944E4] text-white px-12 py-3 rounded-xl font-bold hover:bg-[#531DBD]">Submit</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubmitProblem;