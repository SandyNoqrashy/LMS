import React, { useState, useEffect } from 'react';

const GraduationProject = () => {
  const [isUploading, setIsUploading] = useState(() => {
    return sessionStorage.getItem('isUploading') === 'true';
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [projects, setProjects] = useState([]);
  const [leads, setLeads] = useState([]);
  
  const [stages, setStages] = useState(['Project Initiation', 'Planning', 'Design', 'Development']);

  const [formData, setFormData] = useState({
    projectName: '',
    leadProject: '',
    description: '',
    file: null
  });

  const handleDelete = (stageIndex) => {
    const updatedStages = stages.filter((_, index) => index !== stageIndex);
    setStages(updatedStages);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pRes = await fetch('http://localhost:3000/project_names');
        const lRes = await fetch('http://localhost:3000/leads');
        setProjects(await pRes.json());
        setLeads(await lRes.json());
      } catch (err) { console.error("Error fetching data:", err); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isUploading', isUploading);
  }, [isUploading]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
    if (errors.file) setErrors({ ...errors, file: '' });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.projectName) tempErrors.projectName = "Required";
    if (!formData.leadProject) tempErrors.leadProject = "Required";
    if (!formData.description.trim()) tempErrors.description = "Required";
    if (!formData.file) tempErrors.file = "Please upload a file";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const projectPayload = {
      ...formData,
      fileName: formData.file ? formData.file.name : null,
      status: "pending",
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3000/graduation_projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectPayload),
      });
      if (response.ok) {
        alert("Project submitted successfully!");
        setIsUploading(false);
        setFormData({ projectName: '', leadProject: '', description: '', file: null });
      }
    } catch (error) { alert("Error connecting to server."); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-2 md:p-4">
      <div className="w-full max-w-[1039px] mx-auto bg-white px-4 md:px-6 py-4 rounded-xl border border-gray-100 shadow-sm min-h-[600px]">
        {isUploading ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit new project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <select name="projectName" value={formData.projectName} onChange={handleInputChange} className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#B08DF7] ${errors.projectName ? 'border-red-500' : 'border-gray-200'}`}>
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Project</label>
                <select name="leadProject" value={formData.leadProject} onChange={handleInputChange} className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#B08DF7] ${errors.leadProject ? 'border-red-500' : 'border-gray-200'}`}>
                  <option value="">Select Lead</option>
                  {leads.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description Project</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg h-32 outline-none focus:ring-2 focus:ring-[#B08DF7]" placeholder="Input description project for overview" />
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center mb-auto">
              <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
              <label htmlFor="fileInput" className="cursor-pointer w-full">
                <p className="text-gray-600 font-medium text-sm md:text-base">Drag & drop <span className="text-[#B08DF7]">images</span>, <span className="text-[#B08DF7]">videos</span>, or any file</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">txt, docx, pdf, jpeg, xlsx - Up to 50MB</p>
                <span className="text-[#B08DF7] font-semibold mt-2 block">Or Browse files</span>
                {errors.file && <p className="text-red-500 text-xs mt-2">{errors.file}</p>}
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
            
            <div className="flex-grow py-8 space-y-4">
              {stages.map((stage, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-[#B08DF7] transition-all">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-gray-400 shrink-0">⋮⋮</span>
                    <span className="font-medium text-gray-700 truncate">{stage}</span>
                  </div>
                  <div className="flex gap-2 md:gap-4 shrink-0">
                    <button className="text-gray-400 hover:text-[#B08DF7] p-1">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.4496 3.87427C14.1831 3.14096 14.1833 1.9501 13.45 1.2166C12.7166 0.483108 11.5258 0.482959 10.7923 1.21627L1.89496 10.1156C1.74017 10.2699 1.6257 10.46 1.56162 10.6689L0.680957 13.5703C0.645854 13.6877 0.678063 13.815 0.764821 13.9016C0.851579 13.9882 0.978883 14.0202 1.09629 13.9849L3.99829 13.1049C4.20707 13.0414 4.39707 12.9277 4.55162 12.7736L13.4496 3.87427" stroke="#B08DF7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <button onClick={() => handleDelete(index)} className="text-gray-400 hover:text-[#B08DF7] p-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.667 11.334V15.334" stroke="#B08DF7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.333 11.334V15.334" stroke="#B08DF7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.6663 8V17.3333C16.6663 18.0692 16.0689 18.6667 15.333 18.6667H8.66634C7.93045 18.6667 7.33301 18.0692 7.33301 17.3333V8" stroke="#B08DF7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 8H18" stroke="#B08DF7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.33301 8.00065V6.66732C9.33301 5.93143 9.93045 5.33398 10.6663 5.33398H13.333C14.0689 5.33398 14.6663 5.93143 14.6663 6.66732V8.00065" stroke="#B08DF7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button onClick={() => setIsUploading(true)} className="px-6 py-2 text-white rounded-2xl bg-[#B08DF7] hover:bg-[#a07df5]">Upload new file +</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraduationProject;