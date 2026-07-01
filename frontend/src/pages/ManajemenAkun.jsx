import { useMemo, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  updateUser,
  deleteUser
} from "../_services/user";
import {
  Plus,
  Search,
  X,
  Eye,
  EyeOff
} from "lucide-react";

export default function ManajemenAkun() {
  const navigate = useNavigate();
  // simulasi role login
  const currentRole = "super_admin";

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] =
    useState("Semua");

  const [showModal, setShowModal] =
    useState(false);

  const [editData, setEditData] =
    useState(null);

    const [showPassword, setShowPassword] =
    useState(false);

    const [users, setUsers] =
    useState([]);

    useEffect(() => {
      loadUsers();
    }, []);
    
    const loadUsers = async () => {
    
      try {
    
        const res =
          await getUsers();
    
        setUsers(
          res.data || []
        );
    
      } catch (error) {
    
        console.log(error);
    
      }
    
    };

    const [form, setForm] = useState({
      name: "",
      nik: "",
      email: "",
      phone: "",
      password: "",
      role: "parent",
    });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.phone.includes(search);

      const matchRole =
        roleFilter === "Semua"
          ? true
          : user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  if (currentRole !== "super_admin") {
    return (
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-2xl font-bold text-red-600">
          Akses Ditolak
        </h1>

        <p>
          Halaman ini hanya dapat diakses oleh
          Super Admin.
        </p>
      </div>
    );
  }

  const resetForm = () => {

    setForm({
      name: "",
      email: "",
      phone: "",
      role: "parent",
    });

    setEditData(null);

  };

  const handleSubmit = async () => {
    if (
      !form.phone ||
      !form.email
    ) {
      alert("Lengkapi data!");
      return;
    }
  
    try {
  
      if (editData) {
  
        await updateUser(
          editData.id,
          form
        );
  
        alert(
          "Data berhasil diupdate"
        );
  
        await loadUsers();
  
      }
  
      resetForm();
      setShowModal(false);
  
    } catch (error) {
  
      console.log(error);
  
      alert(
        error?.response?.data?.message ||
        "Gagal menyimpan data"
      );
  
    }
  };

  const handleEdit = (user) => {

    setEditData(user);
  
    setForm({
      name: user.name || "",
      nik: user.nik || "",
      email: user.email || "",
      phone: user.phone || "",
      password: user.password || "",
      role: user.role || "parent",
    });
  
    setShowModal(true);
  
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Yakin ingin menghapus akun ini?"
      );
  
    if (!confirmDelete)
      return;
  
    try {
  
      await deleteUser(id);
  
      alert(
        "User berhasil dihapus"
      );
  
      await loadUsers();
  
    } catch (error) {
  
      console.log(error);
  
      alert(
        error?.response?.data?.message ||
        "Gagal menghapus user"
      );
  
    }
  
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Manajemen Akun
          </h1>

          <p className="text-slate-500 mt-1">
            Kelola akun kader dan orang tua
            secara terpusat
          </p>
        </div>
      </div>

      {/* TOOLBAR */}

      <div className="bg-white p-4 rounded-2xl border">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex flex-col md:flex-row gap-3">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Cari email atau nomor HP..."
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                focus:outline-none
                focus:ring-4
                focus:ring-cyan-100
                focus:border-cyan-500
                transition
              "
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

            <select
              className="border rounded-xl px-4"
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(
                  e.target.value
                )
              }
            >
              <option>Semua</option>
              <option>Kader</option>
              <option>OrangTua</option>
            </select>
          </div>

          <button
          onClick={() => navigate("/register")}
          className="
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            px-6
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            shadow-lg
            shadow-cyan-200
            transition
          "
        >
          <Plus size={18} />
          Tambah Akun
        </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Nama
              </th>

              <th className="p-4 text-left">
                NIK
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-center">
                Edit
              </th>

              <th className="p-4 text-center">
                Hapus
              </th>
            </tr>
          </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
  key={user.id}
  className="
    border-t
    hover:bg-slate-50
    transition
  "
>
  <td className="p-4">
    {user.id}
  </td>

  <td className="p-4 font-medium">
    {user.name}
  </td>

  <td className="p-4">
    {user.nik}
  </td>

  <td className="p-4">
    {user.phone}
  </td>

  <td className="p-4">
    {user.email}
  </td>

  <td className="p-4">
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-semibold
        ${
          user.role === "super_admin"
            ? "bg-purple-100 text-purple-700"
            : user.role === "admin"
            ? "bg-cyan-100 text-cyan-700"
            : "bg-green-100 text-green-700"
        }
      `}
    >
      {user.role}
    </span>
  </td>

  <td className="p-4 text-center">
    <button
      onClick={() =>
        handleEdit(user)
      }
      className="
        border-2
        border-cyan-500
        text-cyan-600
        px-4
        py-2
        rounded-xl
        hover:bg-cyan-50
      "
    >
      EDIT
    </button>
  </td>

  <td className="p-4 text-center">
    <button
      onClick={() =>
        handleDelete(user.id)
      }
      className="
        bg-red-500
        text-white
        px-4
        py-2
        rounded-xl
        hover:bg-red-600
      "
    >
      HAPUS
    </button>
  </td>
</tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t p-4 text-gray-500">
          Menampilkan {filteredUsers.length}
          data
        </div>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-xl">
                {editData
                  ? "Edit Akun"
                  : "Tambah Akun"}
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X />
              </button>
            </div>


            <div className="space-y-3">
            <input
              type="text"
              placeholder="Nama"
              className="w-full border rounded-xl p-3"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="NIK"
              className="w-full border rounded-xl p-3"
              value={form.nik}
              onChange={(e) =>
                setForm({
                  ...form,
                  nik: e.target.value,
                })
              }
            />
              <input
                type="text"
                placeholder="Nomor HP"
                className="w-full border rounded-xl p-3"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone:
                      e.target.value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-xl p-3"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
              />

            <input
              type="text"
              placeholder="Password"
              className="w-full border rounded-xl p-3"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
            />

              <select
                className="w-full border rounded-xl p-3"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                  })
                }
              >
                <option value="admin">
                  Admin
                </option>

                <option value="parent">
                  Parent
                </option>
              </select>

              <button
                onClick={handleSubmit}
                className="w-full bg-cyan-600 text-white py-3 rounded-xl"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}