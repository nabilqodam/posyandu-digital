import {
    CheckCircle2,
    AlertCircle,
    X,
  } from "lucide-react";
  import { useEffect } from "react";
  
  export default function Notification({
    show,
    type = "success",
    message,
    onClose,
  }) {
    useEffect(() => {
      if (!show) return;
  
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [show, onClose]);
  
    if (!show) return null;
  
    const styles = {
      success:
        "bg-emerald-50 border-emerald-200 text-emerald-700",
  
      error:
        "bg-red-50 border-red-200 text-red-700",
  
      warning:
        "bg-amber-50 border-amber-200 text-amber-700",
    };
  
    return (
      <div className="fixed top-5 right-5 z-[9999] animate-[slideIn_.3s_ease]">
        <div
          className={`min-w-[350px] max-w-md border shadow-xl rounded-2xl backdrop-blur-lg p-4 ${styles[type]}`}
        >
          <div className="flex items-start gap-3">
            {type === "success" ? (
              <CheckCircle2 size={22} />
            ) : (
              <AlertCircle size={22} />
            )}
  
            <div className="flex-1">
              <p className="font-semibold">
                {type === "success"
                  ? "Berhasil"
                  : "Terjadi Kesalahan"}
              </p>
  
              <p className="text-sm mt-1">
                {message}
              </p>
            </div>
  
            <button
              onClick={onClose}
              className="opacity-70 hover:opacity-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }