import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Pencil, X, Search, Trash2 } from "lucide-react";

import { getChildren, createChild, deleteChild } from "../_services/child";

import { getParents } from "../_services/user";

import {
  createGrowth,
  updateGrowth,
  getGrowthByChild,
} from "../_services/growth";

import Notification from "../components/Notification";

export default function DataBalita() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showChildModal, setShowChildModal] = useState(false);

  const [showGrowthModal, setShowGrowthModal] = useState(false);

  const [showDetailModal, setShowDetailModal] = useState(false);

  const [selectedChild, setSelectedChild] = useState(null);

  const [growthHistory, setGrowthHistory] = useState([]);

  const [isEditGrowth, setIsEditGrowth] = useState(false);

  const [selectedGrowthId, setSelectedGrowthId] = useState(null);

  const [notification, setNotification] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [childForm, setChildForm] = useState({
    user_id: "",
    name: "",
    gender: "L",
    birth_date: "",

    weight: "",
    height: "",
  });

  const [growthForm, setGrowthForm] = useState({
    child_id: "",
    period_month: "",
    weight: "",
    height: "",
  });

  useEffect(() => {
    loadChildren();
    loadParents();
  }, []);

  const loadParents = async () => {
    try {
      const res = await getParents();

      setParents(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadChildren = async () => {
    try {
      setLoading(true);

      const res = await getChildren();
      console.log(res)
      setChildren(res.data || []);
    } catch (err) {
      console.log(err);
      alert("Gagal memuat data balita");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID");
  };

  const getAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    let months =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());

    return `${months} bulan`;
  };

  const statusBadge = (status) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-700";

      case "gizi_kurang":
        return "bg-yellow-100 text-yellow-700";

      case "gizi_lebih":
        return "bg-blue-100 text-blue-700";

      case "stunting":
        return "bg-orange-100 text-orange-700";
        
      case "gizi_buruk":
        return "bg-orange-100 text-orange-700";

      case "tinggi_berlebih":
        return "bg-red-100 text-red-700";

      case "severe_stunting":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCreateChild = async (e) => {
    e.preventDefault();

    if (!childForm.user_id) {
      return alert("Pilih orang tua terlebih dahulu");
    }

    try {
      console.log(childForm);

      await createChild(childForm);

      setNotification({
        show: true,
        type: "success",
        message: "Data balita berhasil dibuat",
      });

      setShowChildModal(false);

      setChildForm({
        user_id: "",
        name: "",
        gender: "L",
        birth_date: "",
        weight: "",
        height: "",
      });

      loadChildren();
    } catch (err) {
      console.log(err);

      setNotification({
        show: true,
        type: "error",
        message: err.response?.data?.message || "Gagal membuat akun",
      });
    }
  };

  const openGrowthModal = (child) => {
    const today = new Date();

    const currentPeriod = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}`;

    setSelectedChild(child);

    setSelectedGrowthId(child.growth_id);

    setGrowthForm({
      child_id: child.id,
      period_month: currentPeriod,
      weight: child.weight || "",
      height: child.height || "",
    });

    setShowGrowthModal(true);
  };

  const handleGrowthSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateGrowth(selectedGrowthId, {
        child_id: growthForm.child_id,
        period_month: growthForm.period_month,
        weight: growthForm.weight,
        height: growthForm.height,
      });

      setNotification({
        show: true,
        type: "success",
        message: "Data pertumbuhan berhasil disimpan",
      });

      await loadChildren();

      setShowGrowthModal(false);
    } catch (err) {
      console.log(err);

      setNotification({
        show: true,
        type: "error",
        message: err.response?.data?.message || "Gagal menyimpan data",
      });
    }
  };

  const handleDeleteChild = async (id, name) => {
    const confirmDelete = window.confirm(
      `Yakin ingin menghapus balita ${name}?`,
    );

    if (!confirmDelete) return;

    try {
      await deleteChild(id);

      setNotification({
        show: true,
        type: "success",
        message: "Berhasil menghapus data",
      });

      loadChildren();
    } catch (err) {
      console.log(err);

      setNotification({
        show: true,
        type: "error",
        message: err.response?.data?.message || "Gagal menghapus data",
      });
    }
  };

  const filteredChildren = children.filter(
    (child) =>
      child.name?.toLowerCase().includes(search.toLowerCase()) ||
      child.parent_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 rounded-3xl p-8  shadow-xl">
        {/* TITLE */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
            Data Balita
          </h1>

          <p className="text-gray-100 mt-1">Manajemen data balita</p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* SEARCH */}
          <div className="relative flex-1 min-w-[280px]">
            <Search
              size={18}
              className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
            />

            <input
              type="text"
              placeholder="Cari nama balita atau orang tua..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              pl-10
              pr-4
              py-2.5
              border
              border-gray-200
              rounded-xl
              bg-white
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-sky-400
              focus:border-sky-400
              transition-all
            "
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setShowChildModal(true)}
            className="
            cursor-pointer
            bg-sky-500
            hover:bg-sky-600
            text-white
            px-5
            py-2.5
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
            whitespace-nowrap
            shadow-sm
            transition
          "
          >
            <Plus size={18} />
            Tambah Balita
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nama</th>
              <th className="p-3">Orang Tua</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Tanggal Lahir</th>
              <th className="p-3">Umur</th>
              <th className="p-3">BB</th>
              <th className="p-3">TB</th>
              <th className="p-3">Status BB/U</th>
              <th className="p-3">Status TB/U</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredChildren.map((child) => (
                <tr key={child.id} className="border-b">
                  <td className="p-3">{child.name}</td>

                  <td className="p-3">{child.parent_name}</td>

                  <td className="p-3">
                    {child.gender === "L" ? "Laki-Laki" : "Perempuan"}
                  </td>

                  <td className="p-3">{formatDate(child.birth_date)}</td>

                  <td className="p-3">{getAge(child.birth_date)}</td>

                  <td className="p-3">{child.weight || "-"} Kg</td>

                  <td className="p-3">{child.height || "-"} Cm</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${statusBadge(
                        child.nutrition_status,
                      )}`}
                    >
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusBadge(
                            child.nutrition_status,
                          )}`}
                        >
                          {child.nutrition_status}
                            
                        </span>
                      </td>
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusBadge(
                        child.stunting_status,
                      )}`}
                    >
                      {child.stunting_status || "Belum Ada"}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/status-gizi/${child.id}`)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => openGrowthModal(child)}
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteChild(child.id, child.name)}
                        className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            p-2
                            rounded
                          "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH BALITA */}

      {showChildModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <div className="flex justify-between mb-4">
              <h2 className="font-boldtext-xl">Tambah Balita</h2>

              <button onClick={() => setShowChildModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleCreateChild} className="space-y-3">
              <select
                className="w-full border p-2 rounded"
                value={childForm.user_id}
                onChange={(e) =>
                  setChildForm({
                    ...childForm,
                    user_id: Number(e.target.value),
                  })
                }
              >
                <option value="">Pilih Orang Tua</option>

                {parents.map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Nama Balita"
                className="w-full border p-2 rounded"
                value={childForm.name}
                onChange={(e) =>
                  setChildForm({
                    ...childForm,
                    name: e.target.value,
                  })
                }
              />

              <select
                className="w-full border p-2 rounded"
                value={childForm.gender}
                onChange={(e) =>
                  setChildForm({
                    ...childForm,
                    gender: e.target.value,
                  })
                }
              >
                <option value="L">Laki-Laki</option>

                <option value="P">Perempuan</option>
              </select>

              <input
                type="date"
                className="w-full border p-2 rounded"
                value={childForm.birth_date}
                onChange={(e) =>
                  setChildForm({
                    ...childForm,
                    birth_date: e.target.value,
                  })
                }
              />

              <input
                type="number"
                step="0.1"
                placeholder="Berat Badan (Kg)"
                className="w-full border p-2 rounded"
                value={childForm.weight}
                onChange={(e) =>
                  setChildForm({
                    ...childForm,
                    weight: e.target.value,
                  })
                }
              />

              <input
                type="number"
                step="0.1"
                placeholder="Tinggi Badan (Cm)"
                className="w-full border p-2 rounded"
                value={childForm.height}
                onChange={(e) =>
                  setChildForm({
                    ...childForm,
                    height: e.target.value,
                  })
                }
              />

              <button className="w-full cursor-pointer bg-sky-500 text-white py-2 rounded">
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PERTUMBUHAN */}

      {showGrowthModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[500px] shadow-xl">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-xl">Update Pertumbuhan</h2>

                <p className="text-sm text-gray-500">{selectedChild?.name}</p>
              </div>

              <button
                onClick={() => {
                  setShowGrowthModal(false);

                  setSelectedChild(null);

                  setSelectedGrowthId(null);

                  setIsEditGrowth(false);
                }}
                className="
            p-2
            rounded-lg
            hover:bg-gray-100
            transition
          "
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGrowthSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Periode
                </label>

                <input
                  type="month"
                  className="
                    w-full
                    border
                    p-3
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-400
                  "
                  value={growthForm.period_month}
                  onChange={(e) =>
                    setGrowthForm({
                      ...growthForm,
                      period_month: e.target.value,
                    })
                  }
                />

                <p className="text-xs text-gray-500 mt-1">
                  Pilih periode pengukuran.
                </p>
              </div>
              {/* BERAT BADAN */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Berat Badan (Kg)
                </label>

                <input
                  type="number"
                  step="0.1"
                  placeholder="Contoh: 8.5"
                  className="
              w-full
              border
              p-3
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-green-400
            "
                  value={growthForm.weight}
                  onChange={(e) =>
                    setGrowthForm({
                      ...growthForm,
                      weight: e.target.value,
                    })
                  }
                />

                <p className="text-xs text-gray-500 mt-1">
                  Masukkan berat badan terbaru dalam kilogram.
                </p>
              </div>

              {/* TINGGI BADAN */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tinggi Badan (Cm)
                </label>

                <input
                  type="number"
                  step="0.1"
                  placeholder="Contoh: 72.3"
                  className="
              w-full
              border
              p-3
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-green-400
            "
                  value={growthForm.height}
                  onChange={(e) =>
                    setGrowthForm({
                      ...growthForm,
                      height: e.target.value,
                    })
                  }
                />

                <p className="text-xs text-gray-500 mt-1">
                  Masukkan tinggi badan terbaru dalam centimeter.
                </p>
              </div>

              {/* BUTTON */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowGrowthModal(false);
                    setSelectedChild(null);
                  }}
                  className="
              flex-1
              border
              border-gray-300
              py-3
              rounded-lg
              hover:bg-gray-50
            "
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="
              flex-1
              bg-green-500
              text-white
              py-3
              rounded-lg
              hover:bg-green-600
            "
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL RIWAYAT */}

      {showDetailModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[900px] max-h-[80vh] overflow-auto">
            <h2 className="font-bold text-2xl mb-4">Riwayat Pertumbuhan</h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Tanggal</th>
                  <th className="p-2">Umur</th>
                  <th className="p-2">BB</th>
                  <th className="p-2">TB</th>
                  <th className="p-2">Gizi</th>
                  <th className="p-2">Stunting</th>
                </tr>
              </thead>

              <tbody>
                {growthHistory.map((row) => (
                  <tr key={row.id} className="border-b">
                    <td className="p-2">{formatDate(row.created_at)}</td>

                    <td className="p-2">{row.age_month} bulan</td>

                    <td className="p-2">{row.weight}</td>

                    <td className="p-2">{row.height}</td>

                    <td className="p-2">{row.nutrition_status}</td>

                    <td className="p-2">{row.stunting_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
