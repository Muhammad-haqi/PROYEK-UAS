import { useState } from "react";

const dataDestinasi = [
  {
    id: 1,
    asal: "Jakarta",
    tujuan: "Medan",
    maskapai: "Lion Air",
    kelas: "Ekonomi",
    tanggal: "27 Nov 25",
    hargaAsli: 1365900,
    hargaPromo: 1360900,
    refund: true,
    reschedule: true,
  },
  {
    id: 2,
    asal: "Jakarta",
    tujuan: "Pangkalpinang",
    maskapai: "Sriwijaya Air",
    kelas: "Ekonomi",
    tanggal: "21 Nov 25",
    hargaAsli: 713700,
    hargaPromo: 677330,
    refund: true,
    reschedule: true,
  },
  {
    id: 3,
    asal: "Jakarta",
    tujuan: "Padang",
    maskapai: "Pelita Air",
    kelas: "Ekonomi",
    tanggal: "28 Nov 25",
    hargaAsli: 1325000,
    hargaPromo: 1320000,
    refund: true,
    reschedule: true,
  },
];

const kategori = ["Sumatera", "Jawa", "Bali", "Kalimantan", "Sulawesi & Indonesia Timur", "Bisnis"];

export default function HomePage() {
  const [aktif, setAktif] = useState("Sumatera");

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight text-blue-800 mb-4">
            Terbang Nyaman, <span className="text-yellow-400">Tanpa Ribet</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Tiket impian hanya satu klik, Dari tiket ke cerita seru, atau Akses dunia dengan tiket di tanganmu
          </p>
          <a href="/pesan" className="btn-primary-lg inline-block">
            Pesan Sekarang
          </a>
        </div>
        <img src="/skyfly.png" alt="plane" className="w-full rounded-2xl shadow-2xl" />
      </div>

      
      <div className="max-w-7xl mx-auto px-4 w-full py-10">
        <h2 className="text-3xl font-extrabold mb-3 text-blue-800 text-center">
          Jelajahi Nusantara bersama SkyFly Pro
        </h2>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {kategori.map((k) => (
            <button
              key={k}
              onClick={() => setAktif(k)}
              className={`px-4 py-2 rounded-full border font-semibold ${
                aktif === k
                  ? "bg-blue-100 text-blue-700 border-blue-400"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dataDestinasi
            .filter((d) => aktif === "Sumatera") 
            .map((d) => (
              <div
                key={d.id}
                className="border rounded-xl bg-white shadow p-4 space-y-2"
              >
                <div className="text-gray-700 font-semibold">
                  {d.asal} ke <span className="text-xl font-bold">{d.tujuan}</span>
                </div>
                <div className="text-sm text-gray-500">Sekali jalan</div>
                <div className="text-sm text-gray-600 mb-2">{d.tanggal}</div>
                <div>
                  <span className="text-sm text-gray-400 line-through mr-2">
                    IDR {d.hargaAsli.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xl font-bold text-red-600">
                    IDR {d.hargaPromo.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                  <span>{d.maskapai} • {d.kelas}</span>
                </div>
                <div className="text-green-600 text-xs mt-2">
                  {d.refund && "Bisa 100% refund"} {d.reschedule && "Bisa reschedule"}
                </div>
              </div>
            ))}
        </div>
      </div>
      
    </section>
  );
}
