import { useState, useEffect } from "react";
import {
  CalendarDays,
  FileText,
  FileSpreadsheet,
  Download,
  History,
  CheckCircle2,
  FileBarChart,
} from "lucide-react";
import { downloadReport, getReportSummary, } from "../_services/report";

export default function Laporan() {
  const [exportLoading, setExportLoading] =
  useState(false);

  const [totalData, setTotalData] =
  useState(0);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [format, setFormat] =
    useState("pdf");

  useEffect(() => {

      loadSummary();
    
    }, []);
    
    const loadSummary =
    async () => {
    
      try {
    
        const res =
          await getReportSummary();
    
        setTotalData(
          res.data.total
        );
    
      } catch (err) {
    
        console.log(err);
    
      }
    
    };

  const handleExport = async () => {

    if (!selectedDate) {
      alert(
        "Pilih tanggal kegiatan terlebih dahulu"
      );
      return;
    }
  
    try {
  
      setExportLoading(true);
  
      if (format === "pdf") {
  
        const pdfBlob =
          await downloadReport(
            selectedDate
          );
  
        const url =
          window.URL.createObjectURL(
            pdfBlob
          );
  
        const link =
          document.createElement("a");
  
        link.href = url;
  
        link.download =
          `laporan-posyandu-${selectedDate}.pdf`;
  
        document.body.appendChild(
          link
        );
  
        link.click();
  
        link.remove();
  
        window.URL.revokeObjectURL(
          url
        );
      }
  
      else {
  
        alert(
          "Format Excel belum tersedia"
        );
  
      }
  
    } catch (error) {
  
      console.error(error);
  
      alert(
        "Gagal mengunduh laporan"
      );
  
    } finally {
  
      setExportLoading(false);
  
    }
  
  };

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between gap-5">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Export Data Laporan
            </h1>

            <p className="mt-3 text-cyan-100 max-w-2xl">
              Unduh laporan kegiatan
              Posyandu berdasarkan tanggal
              pelaksanaan untuk kebutuhan
              monitoring dan pelaporan
              Dinas Kesehatan.
            </p>
          </div>


        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* DATE */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-100 p-3 rounded-xl">
                <CalendarDays
                  className="text-cyan-600"
                  size={24}
                />
              </div>

              <div>
                <h2 className="font-bold text-xl">
                  Pilih Tanggal Kegiatan
                </h2>

                <p className="text-sm text-gray-500">
                  Tentukan tanggal
                  Posyandu yang ingin
                  diexport
                </p>
              </div>
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(
                  e.target.value
                )
              }
              className="w-full border-2 border-cyan-100 focus:border-cyan-500 rounded-2xl px-5 py-4 outline-none"
            />
          </div>

          {/* DATA EXPORT */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileBarChart
                  className="text-blue-600"
                  size={24}
                />
              </div>

              <h2 className="font-bold text-xl">
                Data Yang Akan Diexport
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* CARD 1 */}
              <div className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-3xl p-5">

                <h3 className="font-bold text-cyan-700 text-lg">
                  Data Balita
                </h3>

                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>✓ Nama Balita</li>
                  <li>✓ Tanggal Lahir</li>
                  <li>✓ Berat Badan</li>
                  <li>✓ Tinggi Badan</li>
                  <li>✓ Status Gizi</li>
                  <li>✓ Umur Balita</li>
                </ul>
              </div>

              {/* CARD 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-5">

                <h3 className="font-bold text-purple-700 text-lg">
                  Data Orang Tua
                </h3>

                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>✓ Nama Ayah / Ibu</li>
                  <li>✓ NIK</li>
                  <li>✓ Tanggal Lahir</li>
                  <li>✓ Alamat</li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* FORMAT */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">

            <h2 className="font-bold text-xl mb-5">
              Format Export
            </h2>

            <div className="space-y-4">

              {/* PDF */}
              <button
                onClick={() =>
                  setFormat("pdf")
                }
                className={`w-full rounded-3xl p-5 border-2 transition-all ${
                  format === "pdf"
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="bg-red-100 p-3 rounded-xl">
                      <FileText
                        size={28}
                        className="text-red-600"
                      />
                    </div>

                    <div className="text-left">
                      <h3 className="font-bold">
                        PDF Report
                      </h3>

                      <p className="text-sm text-gray-500">
                        Siap cetak
                      </p>
                    </div>

                  </div>

                  {format === "pdf" && (
                    <CheckCircle2 className="text-red-500" />
                  )}
                </div>
              </button>

            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl">

            <p className="text-cyan-100">
              Ringkasan Export
            </p>

            <div className="mt-4 flex items-end gap-2">

              <span className="text-6xl font-bold">
                {totalData}
              </span>

              <span className="mb-3">
                Data
              </span>

            </div>

            <div className="bg-white/20 inline-flex items-center gap-2 px-4 py-2 rounded-xl mt-4">
              <CheckCircle2 size={18} />
              Siap Diexport
            </div>

            <div className="mt-6 space-y-2 text-sm text-cyan-100">

              <p>
                Data akan diambil
                berdasarkan tanggal
                kegiatan yang dipilih.
              </p>

              <p>
                Cocok untuk pelaporan
                Posyandu dan Dinas
                Kesehatan.
              </p>

            </div>

            <button
              onClick={handleExport}
              disabled={exportLoading}
              className="mt-6 w-full cursor-pointer bg-white text-cyan-700 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              {
                exportLoading
                  ? "Mengunduh..."
                  : "Download Laporan"
              }
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}