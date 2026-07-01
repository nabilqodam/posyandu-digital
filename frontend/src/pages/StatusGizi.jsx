import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Baby,
  Scale,
  Calendar,
  User,
  Activity,
  ShieldCheck,
  FileText,
  BadgeAlert,
  CheckCircle2,
} from "lucide-react";

import { getRecommendationByChild } from "../_services/recommendation";

import { getChildById } from "../_services/child";
import { getGrowthByChild } from "../_services/growth";

export default function StatusGizi() {
  const { id } = useParams();
  const [recommendationData, setRecommendationData] = useState(null);

  const [child, setChild] = useState(null);
  const [growth, setGrowth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const childRes = await getChildById(id);

      const growthRes = await getGrowthByChild(id);

      const recommendationRes = await getRecommendationByChild(id);

      setChild(childRes.data);
      console.log("RECOMMENDATION:", recommendationRes);

      const latestValidGrowth =
        growthRes.data.find((item) => item.nutrition_status !== null) ||
        growthRes.data[0];

      setGrowth(latestValidGrowth);

      setRecommendationData(recommendationRes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const recommendations = recommendationData?.recommendations || [];

  // ================= FORMAT TANGGAL =================

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const hitungUmur = (tanggalLahir) => {
    if (!tanggalLahir) return "-";

    const birthDate = new Date(tanggalLahir);

    const today = new Date();

    let bulan =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth());

    return `${bulan} Bulan`;
  };





  return (
    <div className="min-h-screen bg-[#f4f7fb] p-8">
      {/* ================= HEADER ================= */}

      <div className="mb-10">
      <h1 className="text-4xl font-bold text-gray-800">
  Status Gizi & Pertumbuhan Balita
</h1>

<p className="text-gray-500 mt-2 text-lg">
  Hasil pemantauan pertumbuhan balita berdasarkan standar WHO
</p>
      </div>

      {/* ================= GRID ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ================= PROFIL ANAK ================= */}

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Profil Anak</h2>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold
              ${
                growth?.nutrition_status === "Aktif"
                  ?  "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {growth?.nutrition_status}
            </span>
          </div>

          {/* FOTO */}

          <div className="flex flex-col items-center text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-800">{child?.name}</h3>

            <p className="text-gray-500 mt-2">Data Balita Posyandu</p>
          </div>

          {/* DETAIL */}

          <div className="space-y-7">
            {/* USIA */}

            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3 text-gray-500">
                <Calendar size={18} />

                <span>Usia</span>
              </div>

              <span className="font-bold text-lg text-gray-800">
                {hitungUmur(child?.birth_date)}
              </span>
            </div>

            {/* GENDER */}

            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3 text-gray-500">
                <User size={18} />

                <span>Jenis Kelamin</span>
              </div>

              <span className="font-bold text-lg text-gray-800">
                {child?.gender}
              </span>
            </div>

            {/* TANGGAL LAHIR */}

            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3 text-gray-500">
                <Calendar size={18} />

                <span>Tanggal Lahir</span>
              </div>

              <span className="font-bold text-gray-800">
                {formatTanggal(child?.birth_date)}
              </span>
            </div>

            {/* PENGUKURAN */}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <Activity size={18} />

                <span>Pengukuran Terakhir</span>
              </div>

              <span className="font-bold text-gray-800">
                {growth?.created_at ? formatTanggal(growth.created_at) : "-"}
              </span>
            </div>
          </div>

          {/* BERAT & TINGGI */}

          <div className="grid  gap-4 mt-10">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Scale size={18} />

                <span>Berat</span>
              </div>

              <h3 className="text-3xl font-bold text-gray-800">
                {growth?.weight || "-"}
                <span className="text-lg font-medium ml-1">kg</span>
              </h3>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Activity size={18} />

                <span>Tinggi</span>
              </div>

              <h3 className="text-3xl font-bold text-gray-800">
                {growth?.height || "-"}
                <span className="text-lg font-medium ml-1">cm</span>
              </h3>
            </div>
          </div>
        </div>

        {/* ================= CONTENT RIGHT ================= */}

        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* ================= STATUS GIZI ================= */}

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
              <p className="text-gray-500 font-medium">
                Status Pertumbuhan Anak
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                Hasil Evaluasi Pertumbuhan
              </h2>
              </div>

              <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium">
                Standar WHO 2006
              </div>
            </div>


            {/* NILAI Z SCORE */}

            <div className="mt-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="rounded-2xl border border-gray-200 p-5">

                  <p className="text-gray-500 text-sm">
                    Status Berat Badan (BB/U)
                  </p>

                  <h3 className="text-3xl font-bold mt-2">

                    {growth?.nutrition_status === "normal"
                      ? "Normal"
                      : growth?.nutrition_status === "gizi_kurang"
                      ? "Gizi Kurang"
                      : growth?.nutrition_status === "gizi_lebih"
                      ? "Gizi Lebih"
                      : "Belum Dinilai"}

                  </h3>

                </div>

                <div className="rounded-2xl border border-gray-200 p-5">

                  <p className="text-gray-500 text-sm">
                    Status Tinggi Badan (TB/U)
                  </p>

                  <h3 className="text-3xl font-bold mt-2">

                    {growth?.stunting_status === "normal"
                      ? "Normal"
                      : growth?.stunting_status === "stunting"
                      ? "Pendek (Stunting)"
                      : growth?.stunting_status === "severe_stunting"
                      ? "Sangat Pendek"
                      : growth?.stunting_status === "tinggi_berlebih"
                      ? "Tinggi Berlebih"
                      : "Belum Dinilai"}

                  </h3>

                </div>

              </div>

            </div>
          </div>

          {/* ================= BOTTOM CARD ================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ================= INTERPRETASI ================= */}

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6">

              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Hasil Pemantauan Pertumbuhan
              </h3>

              <p className="text-gray-700 leading-relaxed text-lg">
                {recommendationData?.interpretation?.description ||
                  "Pertumbuhan anak dievaluasi berdasarkan standar WHO sesuai usia dan jenis kelamin."}
              </p>

              </div>

            {/* ================= REKOMENDASI ================= */}

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-sky-500" />

                  <h2 className="text-3xl font-bold text-gray-800">
                    Rekomendasi
                  </h2>
                </div>

                <div className="space-y-6 max-h-[650px] overflow-y-auto">
                  {recommendations.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="text-green-500" />
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
