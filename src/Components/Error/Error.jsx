const Error = ({ message, onRetry }) => (
  <div className="flex items-center justify-center min-h-[400px] w-full p-4">
    
    {/* الكارد بحدود زرقاء خفيفة جداً تليق مع ثيم الموقع */}
    <div className="bg-white border border-blue-100 p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(92,128,237,0.15)] text-center w-full max-w-[420px]">
      
      {/* الأيقونة: دمج لون الأزرق الخاص بـ MCIT/DEPI مع خلفية خفيفة */}
      {/* <div className="w-20 h-20 bg-blue-50 text-[#5C80ED] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div> */}

      <h3 className="text-xl font-bold text-blue-900 mb-3">Connection Unstable</h3>
      <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
        {message || "We're currently having trouble reaching the server. Please ensure you're connected to the network and try again."}
      </p>

      {/* الزر: استخدام الـ Gradient أو اللون الأزرق الأساسي المعتمد في موقعك */}
      <button 
        onClick={onRetry} 
        className="w-full bg-[linear-gradient(90deg,#344987_0%,#5C80ED_100%)] hover:opacity-90 text-white py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98]"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default Error;