// import React, { useState, useEffect } from 'react';

// const GraduationProject = () => {
//   const [isUploading, setIsUploading] = useState(() => localStorage.getItem('isUploading') === 'true');
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [projects, setProjects] = useState([]);
//   const [leads, setLeads] = useState([]);

//   const [formData, setFormData] = useState({
//     projectName: '',
//     leadProject: '',
//     description: '',
//     file: null
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const pRes = await fetch('http://localhost:3000/project_names');
//         const lRes = await fetch('http://localhost:3000/leads');
//         setProjects(await pRes.json());
//         setLeads(await lRes.json());
//       } catch (err) { console.error("Error fetching data:", err); }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('isUploading', isUploading);
//   }, [isUploading]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, file: e.target.files[0] });
//     if (errors.file) setErrors({ ...errors, file: '' });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.projectName) tempErrors.projectName = "Required";
//     if (!formData.leadProject) tempErrors.leadProject = "Required";
//     if (!formData.description.trim()) tempErrors.description = "Required";
//     if (!formData.file) tempErrors.file = "Please upload a file";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     const projectPayload = {
//       ...formData,
//       fileName: formData.file ? formData.file.name : null,
//       status: "pending",
//       submittedAt: new Date().toISOString()
//     };

//     try {
//       const response = await fetch('http://localhost:3000/graduation_projects', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(projectPayload),
//       });
//       if (response.ok) {
//         alert("Project submitted successfully!");
//         setIsUploading(false);
//         setFormData({ projectName: '', leadProject: '', description: '', file: null });
//       }
//     } catch (error) { alert("Error connecting to server."); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-4">
//       <div className="w-[1039px] mx-auto bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-sm min-h-[600px]">
//         {isUploading ? (
//           <form onSubmit={handleSubmit} className="flex flex-col h-full">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit new project</h2>
//             <div className="grid grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
//                 <select name="projectName" value={formData.projectName} onChange={handleInputChange} className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#B08DF7] ${errors.projectName ? 'border-red-500' : 'border-gray-200'}`}>
//                   <option value="">Select Project</option>
//                   {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Lead Project</label>
//                 <select name="leadProject" value={formData.leadProject} onChange={handleInputChange} className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#B08DF7] ${errors.leadProject ? 'border-red-500' : 'border-gray-200'}`}>
//                   <option value="">Select Lead</option>
//                   {leads.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description Project</label>
//               <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg h-32 outline-none focus:ring-2 focus:ring-[#B08DF7]" placeholder="Input description project for overview" />
//             </div>

//             {/* تم إزالة الكور الثلاثة فقط مع بقاء باقي التنسيق كما هو */}
//             <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center mb-auto">
//               <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//               <label htmlFor="fileInput" className="cursor-pointer">
//                 <p className="text-gray-600 font-medium">Drag & drop <span className="text-[#B08DF7]">images</span>, <span className="text-[#B08DF7]">videos</span>, or any file</p>
//                 <p className="text-gray-400 text-sm mt-1">txt, docx, pdf, jpeg, xlsx - Up to 50MB</p>
//                 <span className="text-[#B08DF7] font-semibold mt-2 block">Or Browse files</span>
//                 {errors.file && <p className="text-red-500 text-xs mt-2">{errors.file}</p>}
//               </label>
//             </div>

//         {/* جزء الأزرار في نهاية الفورم */}
// <div className="flex justify-between pt-4">
//   {/* زر الكانسل: الناحية التانية (يسار) + حواف ملونة */}
//   <button 
//     type="button" 
//     onClick={() => setIsUploading(false)} 
//     className="px-6 py-2 text-[#B08DF7] border border-[#B08DF7] rounded-lg "
//   >
//     Cancel
//   </button>
  
//   {/* زر الرفع */}
//   <button 
//     type="submit" 
//     disabled={loading} 
//     className="px-6 py-2 bg-[#B08DF7] text-white rounded-lg hover:bg-[#a07df5]"
//   >
//     {loading ? "Uploading..." : "Upload"}
//   </button>
// </div>
//           </form>
//         ) : (
//           <div className="flex flex-col h-full min-h-[600px]">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Graduation Project</h2>
//               <p className="text-gray-500 mt-1">Set up your project workflow for management and efficiency</p>
//             </div>
//             <div className="flex-grow flex flex-col items-center justify-center">
//               <img src="Image.png" alt="No data" className="w-64 h-64 object-contain" />
//               <p className="text-center mt-4 text-gray-700 font-bold">There is no data to display. <span className="block font-normal text-gray-500">Setup your business.</span></p>
//             </div>
//             <div className="flex justify-end pt-4">
//               <button onClick={() => setIsUploading(true)} className="px-6 py-2 text-white rounded-2xl bg-[#B08DF7] hover:bg-[#a07df5]">Upload new file +</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GraduationProject;