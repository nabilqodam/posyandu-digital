import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Activity,
  Calendar,
  TrendingUp,
  Shield,
  HelpCircle,
  Info,
  Filter,
} from "lucide-react";

import { getActivityLogs } from "../_services/activity";

export default function LogAktivitas() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] =
    useState("Semua");

  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const response =
        await getActivityLogs();

      setLogs(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityType = (
    activity = ""
  ) => {
    const text =
      activity.toLowerCase();

    if (
      text.includes("menambahkan")
    )
      return "Tambah";

    if (
      text.includes("mengubah") ||
      text.includes("update") ||
      text.includes("memperbarui")
    )
      return "Edit";

    if (
      text.includes("menghapus")
    )
      return "Hapus";

    if (
      text.includes("melihat") ||
      text.includes("membaca")
    )
      return "View";

    return "Aktivitas";
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchSearch =
        log.activity
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchFilter =
        actionFilter === "Semua"
          ? true
          : getActivityType(
              log.activity
            ) === actionFilter;

      return (
        matchSearch &&
        matchFilter
      );
    });
  }, [
    logs,
    search,
    actionFilter,
  ]);

  const totalPages = Math.ceil(
    filteredLogs.length /
      rowsPerPage
  );

  const currentData =
    filteredLogs.slice(
      (page - 1) *
        rowsPerPage,
      page * rowsPerPage
    );

  // const exportCSV = () => {
  //   const csv = [
  //     [
  //       "ID",
  //       "User ID",
  //       "Aktivitas",
  //       "Tanggal",
  //     ],
  //     ...filteredLogs.map(
  //       (item) => [
  //         item.id,
  //         item.user_id,
  //         item.activity,
  //         new Date(
  //           item.created_at
  //         ).toLocaleString(
  //           "id-ID"
  //         ),
  //       ]
  //     ),
  //   ]
  //     .map((e) => e.join(","))
  //     .join("\n");

  //   const blob = new Blob(
  //     [csv],
  //     {
  //       type: "text/csv;charset=utf-8;",
  //     }
  //   );

  //   const link =
  //     document.createElement(
  //       "a"
  //     );

  //   link.href =
  //     URL.createObjectURL(
  //       blob
  //     );

  //   link.download =
  //     "log-aktivitas.csv";

  //   link.click();
  // };

  const todayLogs =
    logs.filter((item) => {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      return item.created_at.startsWith(
        today
      );
    });

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">

        <h1 className="text-3xl md:text-4xl font-bold">
          Log Aktivitas Sistem
        </h1>

        <p className="mt-3 text-cyan-100">
          Rekaman audit seluruh
          aktivitas pengguna
          untuk keamanan dan
          validasi data Posyandu.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <StatCard
          title="Total Aktivitas"
          value={logs.length}
          icon={
            <Activity size={22} />
          }
          color="cyan"
        />

        <StatCard
          title="Aktivitas Hari Ini"
          value={
            todayLogs.length
          }
          icon={
            <Calendar size={22} />
          }
          color="green"
        />

        <StatCard
          title="Data Ditampilkan"
          value={
            filteredLogs.length
          }
          icon={
            <TrendingUp size={22} />
          }
          color="purple"
        />

      </div>

      {/* FILTER */}

      <div className="bg-white rounded-3xl border shadow-sm p-5">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          <div className="lg:col-span-7 relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari aktivitas..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full pl-11 py-3 border rounded-xl bg-gray-50"
            />

          </div>

          <div className="lg:col-span-3">

            <div className="relative">

              <Filter
                size={18}
                className="absolute left-3 top-4 text-gray-400"
              />

              <select
                value={
                  actionFilter
                }
                onChange={(e) =>
                  setActionFilter(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl py-3 pl-10 pr-4"
              >
                <option>
                  Semua
                </option>
                <option>
                  Tambah
                </option>
                <option>
                  Edit
                </option>
                <option>
                  Hapus
                </option>
                <option>
                  View
                </option>
              </select>

            </div>

          </div>

          {/* <div className="lg:col-span-2">

            <button
              onClick={
                exportCSV
              }
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Export
            </button>

          </div> */}

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-5 text-left">
                  Timestamp
                </th>

                <th className="p-5 text-left">
                  User
                </th>

                <th className="p-5 text-left">
                  Tipe Aksi
                </th>

                <th className="p-5 text-left">
                  Deskripsi Aktivitas
                </th>

                <th className="p-5"></th>

              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-10"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : currentData.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-10"
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                currentData.map(
                  (item) => {
                    const action =
                      getActivityType(
                        item.activity
                      );

                    return (
                      <tr
                        key={
                          item.id
                        }
                        className="border-t hover:bg-sky-50 transition"
                      >
                        <td className="p-5">

                          <div className="font-semibold">
                            {new Date(
                              item.created_at
                            ).toLocaleDateString(
                              "id-ID"
                            )}
                          </div>

                          <div className="text-sm text-gray-500">
                            {new Date(
                              item.created_at
                            ).toLocaleTimeString(
                              "id-ID"
                            )}
                          </div>

                        </td>

                        <td className="p-5">
                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center">
                              {item.name
                                ?.split(" ")
                                .map((word) => word[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </div>

                            <div>

                              <h3 className="font-semibold text-slate-800">
                                {item.name}
                              </h3>

                              <p className="text-sm text-gray-500">
                                User ID: {item.user_id}
                              </p>

                            </div>

                          </div>
                        </td>

                        <td className="p-5">
                          <ActionBadge
                            action={
                              action
                            }
                          />
                        </td>

                        <td className="p-5 text-gray-700">
                          {
                            item.activity
                          }
                        </td>

                        <td className="p-5">

                          <Info
                            size={18}
                            className="text-gray-400"
                          />

                        </td>

                      </tr>
                    );
                  }
                )
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}

        <div className="flex flex-col md:flex-row justify-between items-center p-5 border-t gap-4">

          <p className="text-gray-500">

            Menampilkan{" "}
            {filteredLogs.length ===
            0
              ? 0
              : (page - 1) *
                  rowsPerPage +
                1}

            {" - "}

            {Math.min(
              page *
                rowsPerPage,
              filteredLogs.length
            )}

            {" dari "}
            {
              filteredLogs.length
            }

          </p>

          <div className="flex gap-2">

            <button
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
              className="border rounded-lg p-2 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              disabled={
                page ===
                  totalPages ||
                totalPages ===
                  0
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
              className="border rounded-lg p-2 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5 flex gap-4">

          <Shield className="text-blue-600" />

          <div>

            <h3 className="font-semibold text-blue-900">
              Audit Keamanan
            </h3>

            <p className="text-blue-700 mt-2">
              Log aktivitas tidak
              dapat dihapus atau
              dimodifikasi oleh
              Admin biasa.
            </p>

          </div>

        </div>

        <div className="bg-white border rounded-3xl p-5 flex gap-4">

          <HelpCircle className="text-slate-600" />

          <div>

            <h3 className="font-semibold">
              Butuh Bantuan?
            </h3>

            <p className="text-gray-600 mt-2">
              Jika menemukan
              aktivitas
              mencurigakan,
              segera laporkan
              kepada Super
              Admin.
            </p>

            <button className="text-cyan-600 font-semibold mt-3">
              Lapor
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

function ActionBadge({
  action,
}) {
  const styles = {
    Tambah:
      "bg-green-100 text-green-700 border border-green-200",

    Edit:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",

    Hapus:
      "bg-red-100 text-red-700 border border-red-200",

    View:
      "bg-blue-100 text-blue-700 border border-blue-200",

    Aktivitas:
      "bg-slate-100 text-slate-700 border border-slate-200",
  };

  return (
    <span
      className={`px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2 ${styles[action]}`}
    >
      ● {action}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  const colors = {
    cyan: "bg-cyan-100 text-cyan-600",
    green:
      "bg-green-100 text-green-600",
    purple:
      "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`p-3 rounded-2xl ${colors[color]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}