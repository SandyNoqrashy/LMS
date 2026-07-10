import  { useState, useEffect } from 'react';
import { useAuth } from '../../../Components/Context/Context.jsx';
import Header from '../../../Components/Header/Header';
import Sidebar from '../../../Components/Sidebar/Sidebar.jsx';
import { BookOpen, ShieldCheck, Video, Award, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const Support = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/support_page')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-[var(--gray-base)]">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <main className="w-full max-w-[1038px] mt-6 flex flex-col gap-[32px] ms-5">
          
          {/* قسم الترحيب */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-[var(--primary)]">
              {data.header_data.greeting} {user?.name || 'User'}. {data.header_data.question}
            </h1>
            <p className="text-[16px] text-[var(--dark-gray)]">{data.header_data.description}</p>
          </div>
<section className="flex flex-col gap-[24px]">
  <h2 className="text-[24px] font-bold text-black">Quick Actions</h2>
  <div className="grid grid-cols-2 gap-[32px]">
    {data.quick_actions.map((item, index) => (
      <div key={item.id} className="bg-white p-6 rounded-xl border border-[var(--gray-base)] shadow-sm flex items-start gap-4">
        {/* الأيقونة بحجم 35x35 */}
        <div className="w-[35px] h-[35px] flex items-center justify-center text-[var(--primary)]">
          {index === 0 && <BookOpen size={35} />}
          {index === 1 && <ShieldCheck size={35} />}
          {index === 2 && <Video size={35} />}
          {index === 3 && <Award size={35} />}
        </div>
        <div>
          <h3 className="font-bold text-[var(--primary)]">{item.title}</h3>
          <p className="text-sm text-[var(--dark-gray)] mt-1">{item.description}</p>
          <Link 
      to="/SubmitProblem" 
      state={{ category: item.title }}
      className="text-sm font-semibold text-[var(--primary)] mt-2 block hover:underline"
    >
      {item.link_text} →
    </Link>
        </div>
      </div>
    ))}
  </div>
</section>

{/* 2. قسم Talk to a Human */}
<section className="bg-[var(--gray-base)] p-[40px] rounded-[16px] flex flex-col gap-[24px]">
  <div>
    <h2 className="text-[20px] font-bold text-black">Talk to a Human</h2>
    <p className="text-sm text-[var(--dark-gray)]">Need direct assistance? Our team is standing by.</p>
  </div>
  
  <div className="grid grid-cols-3 gap-[32px]">
    {data.human_support_section.contact_methods.map((method) => (
      <div key={method.id} className="bg-white p-6 rounded-xl text-center shadow-sm flex flex-col items-center gap-3">
        <div className="text-[var(--primary)]">
          {method.id === 'hotline' && <Phone size={35} />}
          {method.id === 'email' && <Mail size={35} />}
          {method.id === 'whatsapp' && <MessageCircle size={35} />}
        </div>
        <p className="text-xs font-bold text-[var(--dark-gray)] uppercase">{method.label}</p>
        <p className="text-[var(--primary)] font-semibold">{method.value}</p>
       <button 
  className="w-full bg-white text-[var(--primary)] border border-[var(--primary)] py-2 rounded-lg font-bold 
             transition-all duration-300 
             hover:bg-[var(--primary)] hover:text-white"
>
  {method.button_text}
</button>
      </div>
    ))}
  </div>
</section>
        </main>
      </div>
    </div>
  );
};

export default Support;