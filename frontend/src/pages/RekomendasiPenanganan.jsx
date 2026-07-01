import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getRecommendationByChild
} from "../_services/recommendation";

export default function RekomendasiPenanganan() {

    const navigate = useNavigate();

    const { childId } =
      useParams();

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, [childId]);

  const loadData = async () => {

    try {

      const res =
        await getRecommendationByChild(
          childId
        );

      setData(res);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  if (!data) {

    return (
      <div className="p-10">
        Data tidak ditemukan
      </div>
    );

  }

  const status =
    data.nutrition.nutrition_status;

  const config = {

    normal: {
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-800",
      badge: "bg-green-300",
      icon: "✅"
    },

    gizi_kurang: {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      text: "text-yellow-800",
      badge: "bg-yellow-300",
      icon: "⚠️"
    },

    stunting: {
      bg: "bg-red-100",
      border: "border-red-400",
      text: "text-red-800",
      badge: "bg-red-300",
      icon: "🚨"
    },

    gizi_lebih: {
      bg: "bg-blue-100",
      border: "border-blue-400",
      text: "text-blue-800",
      badge: "bg-blue-300",
      icon: "ℹ️"
    }

  }[status];

  return (

    <div className="min-h-screen bg-gray-100 p-5">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8">

        {/* HEADER */}

        <div
          className={`
            ${config.bg}
            ${config.border}
            border
            rounded-3xl
            p-6
            flex
            gap-5
            items-center
          `}
        >

          <div className="text-5xl">
            {config.icon}
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Hasil analisis status gizi
            </h1>

            <p
              className={`${config.text}`}
            >
              {data.interpretation.detail}
            </p>

            <div
              className={`
                inline-block
                px-4
                py-2
                rounded-full
                mt-2
                font-semibold
                ${config.badge}
              `}
            >
              {data.interpretation.title}
            </div>

          </div>

        </div>

        {/* INFO BALITA */}

        <div className="grid grid-cols-4 gap-4 mt-6">

          <div className="bg-amber-50 rounded-2xl p-4">

            <p className="text-gray-500">
              Nama Balita
            </p>

            <h3 className="font-bold text-xl">
              {data.child.child_name}
            </h3>

          </div>

          <div className="bg-amber-50 rounded-2xl p-4">

            <p className="text-gray-500">
              Usia
            </p>

            <h3 className="font-bold text-xl">
              {data.child.age_month} bulan
            </h3>

          </div>

          <div className="bg-amber-50 rounded-2xl p-4">

            <p className="text-gray-500">
              Indikator
            </p>

              <h3 className="font-bold text-xl">
                {data.child.weight ?? "-"} kg / {data.child.age_month} bulan
              </h3>

          </div>

          <div className="bg-amber-50 rounded-2xl p-4">

            <p className="text-gray-500">
              Z-Score
            </p>

            <h3 className="font-bold text-xl">
              {data.nutrition.weight_zscore} SD
            </h3>

          </div>

        </div>

        {/* REKOMENDASI */}

        <h2 className="font-bold text-xl mt-10 mb-5">

          REKOMENDASI PENANGANAN (WHO)

        </h2>

        <div className="space-y-5">

          {data.recommendations
            .slice(0, 4)
            .map((item, index) => (

              <div
                key={item.id}
                className={`
                  border
                  ${config.border}
                  rounded-2xl
                  p-5
                  flex
                  gap-5
                `}
              >

                <div
                  className={`
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-lg
                    ${config.badge}
                  `}
                >
                  {index + 1}
                </div>

                <div>

                  <h3 className="font-bold text-lg">

                    {item.title}

                  </h3>

                  <p className="mt-2 text-gray-700">

                    {item.description}

                  </p>

                </div>

              </div>

          ))}

          <div className="flex justify-end mt-10">
            <button
              onClick={() =>
                navigate(
                  `/parent/anak/${childId}`
                )
              }
              className={`
                cursor-pointer
                px-8
                py-3
                rounded-2xl
                font-semibold
                flex
                items-center
                gap-2
                shadow-md
                transition-all
                duration-300
                hover:scale-105
                ${config.bg}
                ${config.text}
                border
                ${config.border}
              `}
            >
              Mengerti
              <span className="text-lg">✓</span>
            </button>
          </div>

        </div>

      </div>

    </div>

  );

}