import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LucidePhoneCall, Users, Cross } from "lucide-react";
import { login } from "../_services/auth";
import { getMyChildren } from "../_services/child";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!form.phone || !form.password) {
      setError("Nomor telepon dan password wajib diisi");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const data = await login({
        phone: form.phone.trim(),
        password: form.password,
      });
  
      const { token, user } = data;
  
      // simpan token
      localStorage.setItem("token", token);
  
      // simpan data user
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
  
      // simpan role
      localStorage.setItem(
        "role",
        user.role
      );
  
      localStorage.setItem(
        "isLogin",
        "true"
      );
  

// redirect berdasarkan role
if (user.role === "parent") {
  try {
    const childrenResponse =
      await getMyChildren();

    // sesuaikan dengan response backend
    const children =
      childrenResponse.data ||
      childrenResponse;

    if (
      Array.isArray(children) &&
      children.length > 0
    ) {
      navigate(
        `/parent/anak/${children[0].id}`
      );
    } else {
      setError(
        "Belum ada data anak yang terdaftar"
      );
    }
  } catch (err) {
    console.log(err);
    setError(
      "Gagal memuat data anak"
    );
  }
} else {
  navigate("/dashboard");
}
  
    } catch (err) {
      console.error("LOGIN ERROR:", err);
  
      if (err.response) {
        setError(
          err.response.data.message ||
          "Login gagal"
        );
      } else if (err.request) {
        setError(
          "Backend tidak dapat dihubungi"
        );
      } else {
        setError(
          "Terjadi kesalahan sistem"
        );
      }
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    const token =
      localStorage.getItem("token");
  
    const role =
      localStorage.getItem("role");
  
      if (token) {
        if (role === "parent") {
      
          getMyChildren()
            .then((res) => {
      
              const children =
                res.data || res;
      
              if (
                Array.isArray(children) &&
                children.length > 0
              ) {
                navigate(
                  `/parent/anak/${children[0].id}`
                );
              }
      
            })
            .catch(console.error);
      
        } else {
          navigate("/dashboard");
        }
      }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden px-4">

      {/* Background */}
      <div className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-cyan-500 rounded-full top-[-80px] left-[-80px] opacity-70"></div>

      <div className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-blue-400 rounded-full bottom-[-80px] right-[-80px] opacity-70"></div>

      {/* Card */}
      <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-lg text-center z-10">

        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div className="bg-cyan-500 text-white p-2 sm:p-3 rounded-xl text-lg sm:text-xl">
            <Cross size={30}/>
          </div>
        </div>

        <h2 className="text-base sm:text-lg font-semibold">
          Posyandu Digital
        </h2>

        <h1 className="text-lg sm:text-xl font-bold mt-3">
          Selamat Datang
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6">
          Sistem Monitoring Pertumbuhan Balita
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="text-left">

          {/* NOMOR HP */}
          <label className="text-sm font-medium">
            Nomor Telepon
          </label>

          <input
            type="text"
            placeholder="Masukkan nomor telepon"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="w-full mt-1 mb-4 px-3 py-2 border rounded-lg"
            required
          />

          {/* PASSWORD */}
          <label className="text-xs sm:text-sm font-medium">
            Kata Sandi
          </label>

          <div className="relative mt-1 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan kata sandi"
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              required
            />

            <button
              type="button"
              className="absolute cursor-pointer right-3 top-2 text-gray-500"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Forgot */}
          <div className="text-right text-xs sm:text-sm text-cyan-600 mb-4 cursor-pointer">
            Lupa kata sandi?
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-cyan-600 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-cyan-700 transition"
          >
            {loading ? "Loading..." : "Masuk →"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-[10px] sm:text-xs text-gray-400 mt-5 sm:mt-6">
          © 2024 Kementerian Kesehatan / Posyandu
          <br />
          Versi 1.2.0
        </p>
      </div>
    </div>
  );
}