import { useEffect, useState } from "react";
import {
  Plus,
  ChevronLeft,
  Save,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../_services/schedule";

import Notification from "../components/Notification";

export default function JadwalPosyandu() {
  const [showForm, setShowForm] =
    useState(false);

    const [notification, setNotification] =
    useState({
      show: false,
      type: "success",
      message: "",
    });

    const timeOptions = [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00"
    ];

  

  const [editId, setEditId] =
    useState(null);

  const [jadwal, setJadwal] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      title: "",
      schedule_date: "",
      start_time: "",
      end_time: "",
      activity: "",
    });

    const role = localStorage.getItem("role");

  // ================= LOAD DATA =================

  const fetchSchedules =
    async () => {
      try {
        setLoading(true);

        const response =
          await getSchedules();

        setJadwal(
          response.data || []
        );
      } catch (error) {
        console.error(error);

        setNotification({
          show: true,
          type: "error",
          message: "Gagal mengambil data",
        });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ================= FORMAT =================

  const formatTanggal = (
    tanggal
  ) => {
    return new Date(
      tanggal
    ).toLocaleDateString("id-ID");
  };

  // ================= CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= CREATE =================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createSchedule(
          formData
        );

        setNotification({
          show: true,
          type: "success",
          message: "Jadwal berhasil ditambahkan",
        });

        await fetchSchedules();

        setFormData({
          title: "",
          schedule_date: "",
          start_time: "",
          end_time: "",
          activity: "",
        });

        setShowForm(false);
      } catch (error) {
        console.error(error);

        setNotification({
          show: true,
          type: "error",
          message:
            error.response?.data?.message ||
            "Gagal menambahkan jadwal",
        });
      }
    };

  // ================= DELETE =================

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Yakin ingin menghapus jadwal?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteSchedule(
          id
        );

        setNotification({
          show: true,
          type: "success",
          message: "Jadwal berhasil dihapus",
        });

        fetchSchedules();
      } catch (error) {
        console.error(error);

        setNotification({
          show: true,
          type: "success",
          message: "Gagal menghapus jadwal",
        });
      }
    };

  // ================= EDIT =================

  const handleEdit = (
    item
  ) => {
    setEditId(item.id);

    setFormData({
      title: item.title,
      schedule_date:
        item.schedule_date
          ?.split("T")[0],
      start_time:
        item.start_time,
      end_time:
        item.end_time,
      activity:
        item.activity,
    });

    setShowForm(true);
  };

  // ================= UPDATE =================

  const handleUpdate =
    async (e) => {
      e.preventDefault();

      try {
        await updateSchedule(
          editId,
          formData
        );

        setNotification({
          show: true,
          type: "success",
          message: "Jadwal berhasil diperbarui",
        });

        await fetchSchedules();

        setEditId(null);

        setFormData({
          title: "",
          schedule_date: "",
          start_time: "",
          end_time: "",
          activity: "",
        });

        setShowForm(false);
      } catch (error) {
        console.error(error);

        setNotification({
          show: true,
          type: "error",
          message:
            error.response?.data?.message ||
            "Gagal update jadwal",
        });
      }
    };

  return (
    <div className=" min-h-screen">
      {!showForm ? (
        <>
          <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 rounded-3xl p-8  shadow-xl">
            <div>
              <h1 className="text-4xl font-bold text-gray-100">
                Jadwal Posyandu
              </h1>

              <p className="text-gray-100 mt-2">
                Kelola jadwal
                posyandu
              </p>
            </div>

            {role !== "parent" && (
              <button
                onClick={() => {
                  setShowForm(true);

                  setEditId(null);

                  setFormData({
                    title: "",
                    schedule_date: "",
                    start_time: "",
                    end_time: "",
                    activity: "",
                  });
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md"
              >
                <Plus size={20} />
                Tambah Jadwal
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4">
                      ID
                    </th>

                    <th className="px-5 py-4">
                      Judul
                    </th>

                    <th className="px-5 py-4">
                      Tanggal
                    </th>

                    <th className="px-5 py-4">
                      Jam
                    </th>

                    <th className="px-5 py-4">
                      Kegiatan
                    </th>

                    <th className="px-5 py-4">
                      Dibuat Oleh
                    </th>

                    {role != "parent" && (
                      <>
                    <th className="px-5 py-4">
                      Edit
                    </th>
                    <th className="px-5 py-4">
                      Hapus
                    </th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-10"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    jadwal.map(
                      (
                        item
                      ) => (
                        <tr
                          key={
                            item.id
                          }
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="px-5 py-4">
                            {
                              item.id
                            }
                          </td>

                          <td className="px-5 py-4">
                            {
                              item.title
                            }
                          </td>

                          <td className="px-5 py-4">
                            {formatTanggal(
                              item.schedule_date
                            )}
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            {
                              item.start_time
                            }{" "}
                            -
                            {" "}
                            {
                              item.end_time
                            }
                          </td>

                          <td className="px-5 py-4">
                            {
                              item.activity
                            }
                          </td>

                          <td className="px-5 py-4">
                            {
                              item.created_by_name
                            }
                          </td>

                          {role !== "parent" && (
                              <>
                                <td className="px-5 py-4">
                                  <button
                                    onClick={() =>
                                      handleEdit(item)
                                    }
                                    className="text-sky-600 flex items-center gap-2"
                                  >
                                    <Pencil size={16} />
                                    Edit
                                  </button>
                                </td>

                                <td className="px-5 py-4">
                                  <button
                                    onClick={() =>
                                      handleDelete(item.id)
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                  >
                                    <Trash2 size={16} />
                                    Hapus
                                  </button>
                                </td>
                              </>
                            )}
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-5 border-t text-gray-500">
              Menampilkan{" "}
              {jadwal.length} data
              jadwal
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => {
                setShowForm(
                  false
                );

                setEditId(
                  null
                );
              }}
              className="p-2 hover:bg-gray-200 rounded-lg"
            >
              <ChevronLeft size={28} />
            </button>

            <h1 className="text-3xl font-bold">
              {editId
                ? "Edit Jadwal"
                : "Tambah Jadwal"}
            </h1>
          </div>

          <div className="bg-white rounded-3xl p-10 border shadow-sm max-w-5xl">
            <form
              onSubmit={
                editId
                  ? handleUpdate
                  : handleSubmit
              }
              className="space-y-6"
            >
              <input
                type="text"
                name="title"
                placeholder="Judul Kegiatan"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-5 py-4"
                required
              />

              <input
                type="date"
                name="schedule_date"
                value={
                  formData.schedule_date
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-5 py-4"
                required
              />

<div className="grid md:grid-cols-2 gap-4">

  <div>
    <label className="block mb-2 font-medium">
      Jam Mulai
    </label>

    <select
      name="start_time"
      value={formData.start_time}
      onChange={handleChange}
      className="w-full border rounded-xl px-5 py-4"
      required
    >
      <option value="">
        Pilih Jam Mulai
      </option>

      {timeOptions.map(time => (
        <option
          key={time}
          value={time}
        >
          {time}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="block mb-2 font-medium">
      Jam Selesai
    </label>

    <select
      name="end_time"
      value={formData.end_time}
      onChange={handleChange}
      className="w-full border rounded-xl px-5 py-4"
      required
    >
      <option value="">
        Pilih Jam Selesai
      </option>

      {timeOptions.map(time => (
        <option
          key={time}
          value={time}
        >
          {time}
        </option>
      ))}
    </select>
  </div>

</div>

              <textarea
                rows="5"
                name="activity"
                placeholder="Deskripsi kegiatan"
                value={
                  formData.activity
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-5 py-4 resize-none"
                required
              />

              <button
                type="submit"
                className={`${
                  editId
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-sky-500 hover:bg-sky-600"
                } text-white px-8 py-5 cursor-pointer rounded-xl flex items-center gap-2`}
              >
                <Save size={20} />

                {editId
                  ? "Update Jadwal"
                  : "Simpan Jadwal"}
              </button>
            </form>
          </div>
        </>
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