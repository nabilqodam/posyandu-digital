import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getChildById,
} from "../_services/child";

import {
  getGrowthHistory,
} from "../_services/growth";

import {
    getNutritionByChild,
  } from "../_services/nutrition";



  import {
    getWhoCurve
  } from "../_services/who";


import {
  Weight,
  Ruler,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DasbhoardOrtu() {
  const { childId } = useParams();

  const navigate =
  useNavigate();

  const [weightCurve, setWeightCurve] = useState([]);
  const [heightCurve, setHeightCurve] = useState([]);

  const [child, setChild] =
    useState(null);

  const [chartType, setChartType] =
  useState("weight");

  const [growthHistory,
    setGrowthHistory] = useState([]);

  const [nutritionHistory,
    setNutritionHistory] = useState([]);

  const [loading,
    setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [childId]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        childData,
        growthData,
        nutritionData,
      ] = await Promise.all([
        getChildById(childId),
        getGrowthHistory(childId),
        getNutritionByChild(childId)
      ]);
      console.log("growthData", growthData);
      setChild(childData.data);
      setGrowthHistory(
        growthData?.data || []
      );
    
      setNutritionHistory(
        nutritionData?.data || []
      );



      const [
        weightCurveRes,
        heightCurveRes
      ] = await Promise.all([
      
        getWhoCurve(
          childData.data.gender,
          "BB"
        ),
      
        getWhoCurve(
          childData.data.gender,
          "TB"
        )
      
      ]);
      
      setWeightCurve(
        weightCurveRes.data || []
      );
      
      setHeightCurve(
        heightCurveRes.data || []
      );


  


    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div>Loading...</div>;

  const latestGrowth =
    growthHistory[0];

  const latestNutrition =
    nutritionHistory[0];

    const previousGrowth =
    growthHistory[1];
  
  const weightDiff =
    previousGrowth
      ? (
          Number(latestGrowth?.weight) -
          Number(previousGrowth?.weight)
        ).toFixed(1)
      : 0;
  
  const heightDiff =
    previousGrowth
      ? (
          Number(latestGrowth?.height) -
          Number(previousGrowth?.height)
        ).toFixed(1)
      : 0;

        
      const firstAge =
      growthHistory.length > 0
        ? Math.min(
            ...growthHistory.map(
              item => Number(item.age_month)
            )
          )
        : 0;

        const activeCurve =
  chartType === "weight"
    ? weightCurve
    : heightCurve;

          const kiaChartData =
          activeCurve
            .filter(
              who =>
                Number(who.age_month) >= firstAge
            )
            .map((who) => {
        
              const childRecord =
                growthHistory.find(
                  g =>
                    Number(g.age_month) ===
                    Number(who.age_month)
                );
        
              return {
        
                age: Number(who.age_month),
        
                upper:
                  Number(who.sd2),
        
                median:
                  Number(who.sd0),
        
                lower:
                  Number(who.sd2neg),
        
                childWeight:
                  childRecord
                    ? Number(childRecord.weight)
                    : null,
        
                childHeight:
                  childRecord
                    ? Number(childRecord.height)
                    : null
        
              };
        
            });





    
  //BADGE WARNA UNTUK BB/U
  const getNutritionColor = (status) => {
    switch (status) {
      case "normal":
        return {
          bg: "bg-green-500",
          text: "Normal",
        };
  
      case "gizi_kurang":
        return {
          bg: "bg-yellow-500",
          text: "Gizi Kurang",
        };
  
      case "gizi_lebih":
        return {
          bg: "bg-orange-500",
          text: "Gizi Lebih",
        };
      case "gizi_buruk":
        return {
          bg: "bg-red-500",
          text: "Gizi Buruk",
        };
  
      default:
        return {
          bg: "bg-gray-500",
          text: "-",
        };
    }
  };

  //BADGE WARNA UNTUK TB/U
  const getStuntingColor = (status) => {
    switch (status) {
      case "normal":
        return {
          bg: "bg-green-500",
          text: "Normal",
        };
  
      case "stunting":
        return {
          bg: "bg-yellow-500",
          text: "Stunting",
        };
  
      case "severe_stunting":
        return {
          bg: "bg-red-500",
          text: "Stunting Berat",
        };
  
      default:
        return {
          bg: "bg-gray-500",
          text: "-",
        };
    }
  };


      
    //AMBIL INFO STATUS BALITA
    const nutritionInfo =
    getNutritionColor(
      latestNutrition?.nutrition_status
    );
  
  const stuntingInfo =
    getStuntingColor(
      latestNutrition?.stunting_status
    );

  return (
    <div className="space-y-6">

      {/* HEADER */}
    <div className="flex justify-between">

      <div>
        <h1 className="text-3xl font-bold">
          Progress Pertumbuhan
        </h1>

        <p className="text-gray-500 mt-1">
          Pantau perkembangan anak
          {` ${child?.name}`}
        </p>
      </div>
            <button
        onClick={() =>
          navigate(
            `/parent/rekomendasi/${child.id}`
          )
        }
        className="
          w-[220px]
          h-[80px]
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-cyan-600
          text-white
          font-semibold
          shadow-lg
          hover:shadow-cyan-300/50
          hover:scale-105
          hover:from-cyan-600
          hover:to-cyan-700
          active:scale-95
          transition-all
          duration-300
          flex
          items-center
          justify-center
          text-center
          px-4
          cursor-pointer
        "
      >
        Lihat Rekomendasi
        <br />
        Penanganan
      </button>
    </div>

      {/* CARD */}

{/* CARD */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  

  {/* BERAT BADAN */}
  <div className="
    bg-white
    border
    rounded-3xl
    p-6
    shadow-sm
  ">
    <div className="flex justify-between items-start">

      <div className="
        w-8 h-8
        rounded-lg
        bg-cyan-100
        flex items-center justify-center
      ">
        <Weight
          size={16}
          className="text-cyan-600"
        />
      </div>

      <div
        className={`
          flex items-center gap-1
          px-3 py-1
          rounded-full
          text-sm
          font-semibold
          ${
            weightDiff >= 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}
      >
        <TrendingUp size={14} />
        {weightDiff > 0 ? "+" : ""}
        {weightDiff} kg
      </div>

    </div>

    <p className="
      text-gray-500
      mt-4
      text-lg
    ">
      Berat Badan
    </p>

    <h2 className="
      text-5xl
      font-bold
      mt-2
      text-gray-900
    ">
      {latestGrowth?.weight}
      <span className="
        text-2xl
        text-gray-400
        ml-2
      ">
        kg
      </span>
    </h2>

    <p className="
      text-gray-400
      mt-3
      text-sm
    ">
      Update terakhir
    </p>

    <p className="text-sm text-gray-500">
      {latestGrowth?.created_at
        ? new Date(
            latestGrowth.created_at
          ).toLocaleDateString()
        : "-"
      }
    </p>
  </div>

  {/* TINGGI BADAN */}
  <div className="
    bg-white
    border
    rounded-3xl
    p-6
    shadow-sm
  ">
    <div className="flex justify-between items-start">

      <div className="
        w-8 h-8
        rounded-lg
        bg-cyan-100
        flex items-center justify-center
      ">
        <Ruler
          size={16}
          className="text-cyan-600"
        />
      </div>

      <div
  className={`
    flex items-center gap-1
    px-3 py-1
    rounded-full
    text-sm
    font-semibold
    ${
      heightDiff >= 0
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }
  `}
>
  <TrendingUp size={14} />
  {heightDiff > 0 ? "+" : ""}
  {heightDiff} cm
</div>

    </div>

    <p className="
      text-gray-500
      mt-4
      text-lg
    ">
      Tinggi Badan
    </p>

    <h2 className="
      text-5xl
      font-bold
      mt-2
      text-gray-900
    ">
      {latestGrowth?.height}
      <span className="
        text-2xl
        text-gray-400
        ml-2
      ">
        cm
      </span>
    </h2>

    <p className="
      text-gray-400
      mt-3
      text-sm
    ">
      Update terakhir
    </p>

    <p className="text-sm text-gray-500">
      {latestGrowth?.created_at
        ? new Date(
            latestGrowth.created_at
          ).toLocaleDateString()
        : "-"
      }
    </p>
  </div>

  {/* STATUS GIZI */}
  <div className="
  bg-white
  border
  rounded-3xl
  p-6
  shadow-sm
">
  <p className="
    text-gray-500
    text-lg
  ">
    Status BB/U
  </p>

  <div className="mt-5">
    <span
      className={`
        ${nutritionInfo.bg}
        text-white
        px-5
        py-2
        rounded-xl
        font-bold
      `}
    >
      {nutritionInfo.text}
    </span>
  </div>

  <p className="
    text-sm
    text-gray-400
    mt-4
  ">
    Berdasarkan standar WHO
  </p>
</div>

<div className="
  bg-white
  border
  rounded-3xl
  p-6
  shadow-sm
">
  <p className="
    text-gray-500
    text-lg
  ">
    Status TB/U
  </p>

  <div className="mt-5">
    <span
      className={`
        ${stuntingInfo.bg}
        text-white
        px-5
        py-2
        rounded-xl
        font-bold
      `}
    >
      {stuntingInfo.text}
    </span>
  </div>

  <p className="
    text-sm
    text-gray-400
    mt-4
  ">
    Berdasarkan standar WHO
  </p>
</div>

</div>

      {/* GRAFIK */}

<div
  className="
  bg-white
  border
  rounded-3xl
  p-8
  shadow-sm
"
>
  {/* HEADER */}

  <div className="
    flex
    justify-between
    items-start
    mb-8
  ">

    <div>

      <h2 className="
        text-3xl
        font-bold
      ">
        Grafik
        <br />
        Pertumbuhan
      </h2>

      <span
        className="
        inline-block
        mt-3
        px-3 py-1
        rounded-lg
        bg-gray-100
        text-gray-400
        text-sm
      "
      >
        WHO Standard
      </span>

    </div>

    {/* SWITCH */}

    <div
      className="
      flex
      bg-gray-100
      rounded-xl
      p-1
    "
    >
      <button
        onClick={() =>
          setChartType("weight")
        }
        className={`
          px-5 py-2
          rounded-lg
          text-sm
          font-medium
          ${
            chartType === "weight"
              ? "bg-white text-cyan-600 shadow"
              : "text-gray-500"
          }
        `}
      >
        Berat/Umur
      </button>

      <button
        onClick={() =>
          setChartType("height")
        }
        className={`
          px-5 py-2
          rounded-lg
          text-sm
          font-medium
          ${
            chartType === "height"
              ? "bg-white text-cyan-600 shadow"
              : "text-gray-500"
          }
        `}
      >
        Tinggi/Umur
      </button>
    </div>

  </div>

<div
  className="
  flex
  justify-end
  gap-6
  mb-4
  text-sm
"
>
  <div className="flex items-center gap-2">
    <div
      className="
      w-3 h-3
      rounded-full
      bg-cyan-500
    "
    />
    Anak Anda
  </div>

  <div className="flex items-center gap-2">
    <div
      className="
      w-5
      border-t-2
      border-dashed
      border-gray-400
    "
    />
    Median WHO
  </div>
</div>

<div
  style={{
    width: "100%",
    height: 450,
  }}
>
  <ResponsiveContainer width="100%" height={300}>

  <LineChart data={kiaChartData}>
  <CartesianGrid stroke="#E5E7EB" />

  <XAxis dataKey="age" />

  <YAxis />

  <Tooltip />

  <Line
  dataKey="upper"
  stroke="#fca5a5"
  dot={false}
/>

<Line
  dataKey="median"
  stroke="#94a3b8"
  strokeDasharray="5 5"
  dot={false}
/>

<Line
  dataKey="lower"
  stroke="#fca5a5"
  dot={false}
/>

<Line
  dataKey={
    chartType === "weight"
      ? "childWeight"
      : "childHeight"
  }
  stroke="#06b6d4"
  strokeWidth={4}
  connectNulls
/>
</LineChart>

  </ResponsiveContainer>
</div>

</div>

      {/* RIWAYAT */}

      <div className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        border
      ">
        <h2 className="
          text-xl
          font-bold
          mb-5
        ">
          Riwayat Pertumbuhan
        </h2>

        <div className="space-y-3">

          {growthHistory.map(
            (item) => (
              <div
                key={item.id}
                className="
                  border
                  rounded-xl
                  p-4
                  flex
                  justify-between
                "
              >
                <div>
                  <p className="font-medium">
                    Usia
                    {" "}
                    {item.age_month}
                    {" "}
                    bulan
                  </p>

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    {
                      new Date(
                        item.created_at
                      )
                      .toLocaleDateString()
                    }
                  </p>
                </div>

                <div className="
                  text-right
                ">
                  <p>
                    BB:
                    {" "}
                    {item.weight}
                    kg
                  </p>

                  <p>
                    TB:
                    {" "}
                    {item.height}
                    cm
                  </p>
                </div>
              </div>
            )
          )}

        </div>
      </div>

    </div>
  );
}