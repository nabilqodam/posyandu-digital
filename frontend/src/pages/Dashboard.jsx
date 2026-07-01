import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { getDashboardStats, getGrowthTrend } from "../_services/dashboard";
import { getSchedules } from "../_services/schedule";

export default function Dashboard() {

  const role = localStorage.getItem("role")


  const [loading, setLoading] =
  useState(true);

const today = new Date();

const [selectedMonth, setSelectedMonth] =
  useState(today.getMonth() + 1);

const [selectedYear, setSelectedYear] =
  useState(today.getFullYear());

  const [stats, setStats] =
  useState({
    total_registered: 0,
    total_children: 0,
    normal_growth: 0,
    not_updated: 0,
    risk_stunting: 0,
    nutrition_problem: 0
  });

  const pieData = [
    {
      name: "Risiko Stunting",
      value: stats.risk_stunting
    },
    {
      name: "Masalah BB/U",
      value: stats.nutrition_problem
    },
    {
      name: "Belum Ditimbang",
      value: stats.not_updated
    },
    {
      name: "Pertumbuhan Normal",
      value: stats.normal_growth
    }
  ];


  const [schedules, setSchedules] =
  useState([]);

  const [scheduleIndex, setScheduleIndex] =
  useState(0);

    const fetchStats = async () => {

      try {
    
        setLoading(true);
    
        const res =
          await getDashboardStats(
            selectedMonth,
            selectedYear
          );

          console.log(res.data);
    
          setStats(res.data);;
    
      } catch (error) {
    
        console.log(error);
    
      } finally {
    
        setLoading(false);
    
      }
    
    };

  const fetchGrowthTrend =
  async () => {

    try {

      const res =
        await getGrowthTrend();

      const formatted =
        res.data.map(
          item => ({

            name:
              new Date(
                item.month + "-01"
              ).toLocaleDateString(
                "id-ID",
                {
                  month: "short"
                }
              ),

            normal:
              Number(item.normal),

            stunting:
              Number(item.stunting)

          })
        );

      setChartData(
        formatted
      );

      

    } catch (error) {

      console.log(error);

    }

};

  const fetchSchedules = async () => {
    try {
      const res =
        await getSchedules();
  
      setSchedules(
        res.data || []
      );
  
    } catch (error) {
      console.log(error);
    }
  };




  const [chartData, setChartData] =
  useState([]);

  const visibleSchedules =
  schedules.slice(
    scheduleIndex,
    scheduleIndex + 2
  );

  useEffect(() => {

    fetchStats();
  
  }, [
    selectedMonth,
    selectedYear
  ]);

  useEffect(() => {

    fetchSchedules();
    fetchGrowthTrend();
  
  }, []);



  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Dashboard Overview
          </h1>

          <p className="text-gray-500 text-sm">
            {new Date().toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
        </div>


      </div>

      {/* GREETING */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold">
          Selamat Datang {role}👋
        </h2>

        <p className="text-gray-500 text-sm">
          Berikut laporan pertumbuhan dan
          status kesehatan balita di wilayah Griya Bunga Asri
        </p>
      </div>

      {/* STATISTIK */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="bg-white rounded-2xl h-28 animate-pulse"
              />
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          <StatCard
            title="Total Terdaftar"
            value={stats.total_registered}
            subtitle="Seluruh Balita"
            color="bg-indigo-500"
          />

          <StatCard
            title="Terdaftar Bulan Ini"
            value={stats.total_children}
            subtitle="Bulan Dipilih"
            color="bg-blue-500"
          />

          <StatCard
            title="Normal"
            value={stats.normal_growth}
            subtitle="BB/U & TB/U Normal"
            color="bg-green-500"
          />

          <StatCard
            title="Risiko Stunting"
            value={stats.risk_stunting}
            subtitle="TB/U Bermasalah"
            color="bg-red-500"
          />

          <StatCard
            title="Masalah BB/U"
            value={stats.nutrition_problem}
            subtitle="BB/U Bermasalah"
            color="bg-yellow-500"
          />

          <StatCard
            title="Belum Ditimbang"
            value={stats.not_updated}
            subtitle="Bulan Dipilih"
            color="bg-gray-500"
          />

        </div>
      )}

      {/* CHART + SIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex gap-3">

<select
  value={selectedMonth}
  onChange={(e) =>
    setSelectedMonth(
      Number(e.target.value)
    )
  }
  className="border rounded-lg p-2"
>
  {[...Array(12)].map((_, i) => (
    <option
      key={i + 1}
      value={i + 1}
    >
      {i + 1}
    </option>
  ))}
</select>

<select
  value={selectedYear}
  onChange={(e) =>
    setSelectedYear(
      Number(e.target.value)
    )
  }
  className="border rounded-lg p-2"
>
  <option value={2025}>2025</option>
  <option value={2026}>2026</option>
  <option value={2027}>2027</option>
</select>

</div>
        {/* CHART */}
        <div className="bg-white rounded-2xl shadow p-4 lg:col-span-2">



          <ResponsiveContainer
  width="100%"
  height={250}
>
<ResponsiveContainer
  width="100%"
  height={300}
>
  <PieChart>

    <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      label
    >
      <Cell fill="#ef4444" />
      <Cell fill="#f59e0b" />
      <Cell fill="#233D4D" />
      <Cell fill="#2FA084" />
    </Pie>

    <Tooltip />
    <Legend />

  </PieChart>
</ResponsiveContainer>
</ResponsiveContainer>

        </div>


        {/* SIDE PANEL */}
        <div className="bg-white rounded-2xl shadow p-4">

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">
            Jadwal Posyandu
          </h3>

          <div className="flex gap-2">

            <button
              disabled={scheduleIndex === 0}
              onClick={() =>
                setScheduleIndex(
                  Math.max(
                    0,
                    scheduleIndex - 2
                  )
                )
              }
              className="
              cursor-pointer
                p-2
                border
                rounded-lg
                disabled:opacity-40
              "
            >
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={
                scheduleIndex + 2 >=
                schedules.length
              }
              onClick={() =>
                setScheduleIndex(
                  scheduleIndex + 2
                )
              }
              className="
              cursor-pointer
                p-2
                border
                rounded-lg
                disabled:opacity-40
              "
            >
              <ChevronRight size={16} />
            </button>

          </div>
        </div>

        <div className="space-y-3">

          {visibleSchedules.map(
            (item) => (
              <div
                key={item.id}
                className="
                  p-4
                  bg-gray-100
                  rounded-xl
                "
              >
                <p className="font-semibold">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {item.start_time?.slice(0, 5)}
                  {" - "}
                  {item.end_time?.slice(0, 5)}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(
                    item.schedule_date
                  ).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            )
          )}

        </div>


        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">

      <div
        className={`${color} h-2`}
      />

      <div className="p-5">
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          {subtitle}
        </p>
      </div>

    </div>
  );
}