import { useState } from "react";
import {
  ArrowLeft,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { register } from "../_services/auth";
import Notification from "../components/Notification";

export default function Register() {
  const navigate = useNavigate();

  const [notification, setNotification] =
  useState({
    show: false,
    type: "success",
    message: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [form, setForm] =
    useState({
      nik: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      };
  
      // hanya kirim NIK jika parent
      if (form.role === "parent") {
        payload.nik = form.nik;
      }
  
      await register(payload);
  
      setNotification({
        show: true,
        type: "success",
        message: "Akun berhasil dibuat",
      });
  
      setForm({
        nik: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
  
      setTimeout(() => {
        navigate("/manajemen-akun");
      }, 1500);
  
    } catch (err) {
  
      console.log(err);
  
      setNotification({
        show: true,
        type: "error",
        message:
          err.response?.data?.message ||
          "Gagal membuat akun",
      });
  
    } finally {
  
      setLoading(false);
  
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 md:px-8 py-5">

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowLeft
              size={28}
            />
          </button>

          <h1 className="font-bold text-xl">
            Register
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-white border px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-600">
            System Online &
            Ready
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        <h2 className="text-3xl font-bold mb-8">
          Register
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="bg-white border rounded-3xl p-6 md:p-10 shadow-sm"
        >

          {/* ALERT */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-5">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5">

            {/* NIK */}
            <div>
              <label className="font-medium">
                NIK
              </label>

              <input
                type="text"
                name="nik"
                value={
                  form.nik
                }
                onChange={
                  handleChange
                }
                placeholder="Masukkan NIK"
                className="w-full mt-2 px-4 py-3 border rounded-xl"
              />
            </div>

            {/* NAMA */}
            <div>
              <label className="font-medium">
                Nama
              </label>

              <input
                type="text"
                name="name"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
                placeholder="Masukkan Nama"
                className="w-full mt-2 px-4 py-3 border rounded-xl"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
                placeholder="Masukkan Email"
                className="w-full mt-2 px-4 py-3 border rounded-xl"
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="font-medium">
                No. Telepon
              </label>

              <input
                type="text"
                name="phone"
                value={
                  form.phone
                }
                onChange={
                  handleChange
                }
                placeholder="Masukkan Nomor Telepon"
                className="w-full mt-2 px-4 py-3 border rounded-xl"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                placeholder="Masukkan Password"
                className="w-full mt-2 px-4 py-3 border rounded-xl"
                required
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="font-medium">
                Role
              </label>

              <select
                name="role"
                value={
                  form.role
                }
                onChange={
                  handleChange
                }
                className="w-full mt-2 px-4 py-3 border rounded-xl"
                required
              >
                <option value="">
                  Pilih Role
                </option>

                <option value="admin">
                  Admin
                </option>

                <option value="parent">
                  Orang Tua
                </option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={
                  loading
                }
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-3 rounded-xl flex items-center gap-2"
              >
                <Save
                  size={18}
                />

                {loading
                  ? "Menyimpan..."
                  : "Simpan"}
              </button>
            </div>

          </div>
        </form>
      </div>
      <Notification
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() =>
          setNotification({
            ...notification,
            show: false,
          })
        }
      />
    </div>
  );
  
}