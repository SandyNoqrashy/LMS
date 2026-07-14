import { MdLanguage } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

// استقبلي الـ prop الجديد هنا
const Header = ({ setSearchQuery }) => {
  return (
    <div> 
        <header className="w-full h-[89px] border-b flex justify-between items-center px-5 bg-[#FFFFFF]">
          <div className="relative w-[400px]" dir="ltr">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
              <CiSearch className="text-xl" />
            </span>
            
            <input 
              type="text" 
              placeholder="Search for tasks, subjects, or sessions..." 
              // التعديل هنا: إضافة onChange ليرسل النص للـ Layout
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[40px] bg-[var(--primary-shade)] border border-[#E5E7EB] rounded-lg pl-10 pr-4 text-sm outline-none text-left focus:border-[#3E63DD] transition-all placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-6 text-[#6B7280]">
            <button className="text-sm font-bold flex items-center gap-1.5">
              <MdLanguage className="text-lg" /> 
              <span>AR</span>
            </button>
          </div>
        </header>
    </div>
  )
}

export default Header;