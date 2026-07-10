// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { HiOutlineCloudArrowUp, HiCircleStack } from "react-icons/hi2";
// import Nav from '../../../Components/Sidebar/Sidebar';
// import Header from '../../../Components/Header/Header';

// const SubmitProblem = () => {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
  
//   const [file, setFile] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [systemStatus] = useState({ message: "All systems operational" });
//   const [formData, setFormData] = useState({ subject: "", category: "", description: "" });
  
//   // حالة الأخطاء (للتحكم في اللون الأحمر)
//   const [errors, setErrors] = useState({ subject: false, category: false, description: false });

//   useEffect(() => {
//     const savedCategory = localStorage.getItem('selectedCategory');
//     if (savedCategory) setFormData(prev => ({ ...prev, category: savedCategory }));

//     const fetchData = async () => {
//       try {
//         const catRes = await fetch("http://localhost:3000/categories");
//         const catData = await catRes.json();
//         setCategories(catData);
//       } catch (err) {
//         console.error("Failed to fetch data");
//       }
//     };
//     fetchData();
//   }, []);

//   const handleUploadClick = () => fileInputRef.current.click();
//   const handleFileChange = (e) => { if (e.target.files[0]) setFile(e.target.files[0]); };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // التحقق من الحقول قبل الإرسال
//     const newErrors = {
//       subject: !formData.subject,
//       category: !formData.category,
//       description: !formData.description
//     };
//     setErrors(newErrors);

//     // إذا كان هناك أي خطأ، لا نكمل الإرسال
//     if (Object.values(newErrors).some(err => err)) return;

//     const dataToSend = new FormData();
//     dataToSend.append("subject", formData.subject);
//     dataToSend.append("category", formData.category);
//     dataToSend.append("description", formData.description);
//     if (file) dataToSend.append("file", file);

//     const response = await fetch("http://localhost:3000/problems", {
//       method: "POST",
//       body: dataToSend, 
//     });
//     if (response.ok) {
//       localStorage.removeItem('selectedCategory');
//       navigate('/Support');
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-[var(--gray-base)]">
//       <Nav />
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         <Header />
//         <main className="flex justify-center p-8 w-full">
//           <div 
//             className="bg-white rounded-2xl border border-[var(--gray-base)] shadow-sm p-8"
//             style={{ width: '1000px', minHeight: '948px' }}
//           >
//             <h1 className="text-2xl font-bold mb-2">Submit your Problem</h1>
//             <p className="text-[var(--dark-gray)] mb-8">Our team typically responds within 24 hours.</p>

//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               <input 
//                 className={`w-full p-4 rounded-xl border outline-none transition-all ${errors.subject ? 'border-red-500' : 'border-[var(--gray-base)] focus:border-[var(--primary)]'}`}
//                 placeholder="Briefly describe your issue"
//                 onChange={(e) => {
//                     setFormData({...formData, subject: e.target.value});
//                     if(errors.subject) setErrors({...errors, subject: false});
//                 }}
//               />

//               <select 
//                 className={`w-full p-4 rounded-xl border outline-none transition-all ${errors.category ? 'border-red-500' : 'border-[var(--gray-base)] focus:border-[var(--primary)]'}`}
//                 value={formData.category}
//                 onChange={(e) => {
//                     setFormData({...formData, category: e.target.value});
//                     if(errors.category) setErrors({...errors, category: false});
//                 }}
//               >
//                 <option value="">Select a category</option>
//                 {Array.isArray(categories) && categories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <textarea 
//                 className={`w-full p-4 h-40 rounded-xl border outline-none transition-all ${errors.description ? 'border-red-500' : 'border-[var(--gray-base)] focus:border-[var(--primary)]'}`}
//                 placeholder="Tell us more about the problem..."
//                 onChange={(e) => {
//                     setFormData({...formData, description: e.target.value});
//                     if(errors.description) setErrors({...errors, description: false});
//                 }}
//               />

//               <div className="border-2 border-dashed border-[var(--gray-base)] rounded-xl p-10 text-center cursor-pointer" onClick={handleUploadClick}>
//                 <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
//                 <HiOutlineCloudArrowUp className="mx-auto text-[#7944E4] mb-2" size={40} />
//                 <p className="font-bold text-[#7944E4]">{file ? file.name : "Click to upload"}</p>
//               </div>

//               <div className="flex justify-between items-center pt-8 border-t border-[var(--gray-base)]">
//                 <div className="flex items-center gap-2 text-sm text-[var(--green)] font-semibold">
//                   <HiCircleStack size={18} /> {systemStatus.message}
//                 </div>
//                 <button type="submit" className="bg-[#7944E4] text-white px-12 py-3 rounded-xl font-bold hover:bg-[#531DBD]">Submit</button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SubmitProblem;