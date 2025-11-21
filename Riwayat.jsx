import { useState } from "react";

const riwayatData = [
  {
    id: 1,
    asal: "Medan",
    tujuan: "Denpasar-Bali",
    tanggal: "Jum, 21 Nov 2025",
    waktu: "20:25",
    harga: 3455174,
    bisaRefund: true,
    maskapai: "Lion Air",
    status: "Belum dibayar",
  },
];

const metodePembayaran = [
  { key: "virtual", bank: "BCA Virtual Account", logo: "/bca.png", kode: "1234567890" },
  { key: "virtual", bank: "Mandiri Virtual Account", logo: "/mandiri.png", kode: "2345678901" },
  { key: "virtual", bank: "BRI Virtual Account", logo: "/bri.png", kode: "3456789012" },
  { key: "ewallet", bank: "GoPay", logo: "/gopay.png" },
  { key: "ewallet", bank: "Dana", logo: "/dana.png" },
  { key: "card", bank: "Kartu Kredit/Debit", logo: "/creditcard.png" },
];

export default function RiwayatPage() {
  const [showMetode, setShowMetode] = useState(false);
  const [selectedMetode, setSelectedMetode] = useState("");
  const [step, setStep] = useState(0);

  const handlePilihMetode = (metode) => {
    setSelectedMetode(metode);
    setStep(1);
  };

  const resetPopup = () => {
    setShowMetode(false);
    setStep(0);
    setSelectedMetode("");
  };

  return (
    <section className="min-h-screen bg-[#F5F7FC] py-14">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-5 text-blue-800">Riwayat Pemesanan Tiket</h2>
        {riwayatData.map(riwayat => (
          <div className="border-b pb-6 mb-6" key={riwayat.id}>
            <div className="flex place-content-between items-center">
              <div>
                <div className="font-semibold text-blue-700 mb-1">
                  {riwayat.asal} → {riwayat.tujuan}
                </div>
                <div className="text-gray-600">{riwayat.tanggal} {riwayat.waktu}</div>
                {riwayat.bisaRefund && (
                  <div className="mt-1 px-2 py-1 bg-green-100 text-green-800 rounded text-sm inline-block">
                    Bisa refund & reschedule s.d. {riwayat.tanggal}
                  </div>
                )}
                <div className="mt-2 text-gray-500 text-xs">{riwayat.status}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-blue-800">
                  IDR {riwayat.harga.toLocaleString("id-ID")}
                </div>
                {riwayat.status === "Belum dibayar" && (
                  <button
                    className="mt-3 py-2 px-4 bg-blue-600 text-white rounded font-semibold"
                    onClick={() => setShowMetode(true)}
                  >
                    Bayar Sekarang
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {}
        {showMetode && (
          <div
            className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center"
            onClick={resetPopup}
          >
            <div
              className="bg-white p-8 rounded-xl shadow-xl max-w-xl w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute right-7 top-7 text-2xl font-bold"
                onClick={resetPopup}
              >×</button>
              {step === 0 && (
                <>
                  <h3 className="text-xl font-bold mb-5 text-blue-800">
                    Pilih Metode Pembayaran
                  </h3>
                  <div className="space-y-4">
                    {metodePembayaran.map(metode => (
                      <label key={metode.bank} className="flex items-center gap-4 border-b py-3 cursor-pointer">
                        <input
                          type="radio"
                          name="bank"
                          checked={selectedMetode === metode.bank}
                          onChange={() => setSelectedMetode(metode.bank)}
                        />
                        <img src={metode.logo} alt={metode.bank} className="w-12" />
                        <span className="font-semibold text-gray-700">{metode.bank}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    className="mt-6 py-2 px-5 bg-blue-600 text-white rounded font-semibold w-full"
                    disabled={!selectedMetode}
                    onClick={() => handlePilihMetode(selectedMetode)}
                  >
                    Lanjut Bayar
                  </button>
                </>
              )}
              {step === 1 && (
                <>
                  {}
                  {(() => {
                    const metode = metodePembayaran.find(m => m.bank === selectedMetode);
                    if (!metode) return null;
                    if (metode.key === "virtual") {
                    
                      return (
                        <div className="text-center py-8">
                          <h3 className="text-blue-700 font-bold text-xl mb-3">{metode.bank}</h3>
                          <div className="text-xl font-mono bg-gray-100 p-3 rounded border">
                            {metode.kode}
                          </div>
                          <div className="mt-4 text-gray-600">Silakan transfer ke kode virtual di atas untuk menyelesaikan pembayaran.</div>
                        </div>
                      );
                    } else if (metode.key === "ewallet") {
                     
                      return (
                        <div className="text-center py-8">
                          <h3 className="text-blue-700 font-bold text-xl mb-3">{metode.bank}</h3>
                          <button className="py-3 px-6 bg-green-500 text-white rounded-xl font-bold text-lg">
                            Klik di sini untuk melanjutkan pembayaran
                          </button>
                          <div className="mt-4 text-gray-600">Bayar instan lewat {metode.bank} di smartphone kamu.</div>
                        </div>
                      );
                    } else if (metode.key === "card") {
                     
                      return (
                        <div className="py-8">
                          <h3 className="text-blue-700 font-bold text-xl mb-3">Kartu Kredit / Debit</h3>
                          <div className="mb-2 text-gray-700">Masukkan data kartu debit atau kredit untuk pembayaran:</div>
                          <input
                            type="text"
                            className="input-field mb-2"
                            placeholder="Nomor Kartu 16 digit"
                            maxLength={16}
                          />
                          <input
                            type="text"
                            className="input-field mb-2"
                            placeholder="Nama di Kartu"
                          />
                          <div className="flex gap-3">
                            <input
                              type="text"
                              className="input-field mb-2 w-1/2"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            <input
                              type="text"
                              className="input-field mb-2 w-1/2"
                              placeholder="CVV"
                              maxLength={4}
                            />
                          </div>
                          <button className="mt-4 py-3 px-6 bg-blue-600 text-white rounded-xl font-bold text-lg">
                            Proses Pembayaran
                          </button>
                        </div>
                      );
                    }
                  })()}
                  <button
                    className="mt-8 py-2 px-5 bg-gray-200 text-gray-700 rounded font-semibold w-full"
                    onClick={resetPopup}
                  >
                    Tutup
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
