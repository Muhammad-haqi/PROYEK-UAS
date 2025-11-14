import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveOrderObj } from "../utils/storage";

export default function PesanPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pemesan: "",
    maskapai: "",
    kelas: "",
    asal: "",
    tujuan: "",
    tanggalBerangkat: "",
    penumpang: 1,
    harga: 0,
    namaPenumpang: [""],
    kursi: [],
  });

  const maskapaiData = {
    "Garuda Indonesia": 1500000,
    "Citilink": 900000,
    "Lion Air": 800000,
    "Sriwijaya Air": 950000,
  };

  const kelasMultiplier = {
    Ekonomi: 1,
    Bisnis: 1.8,
    First: 2.5,
  };

  const seatRows = 20;
  const seatColumns = ["A", "B", "C", "D", "E", "F"];

  // Hitung harga otomatis
  useEffect(() => {
    if (form.maskapai && form.kelas) {
      const base = maskapaiData[form.maskapai];
      const multi = kelasMultiplier[form.kelas];
      const total = base * multi * Number(form.penumpang);
      setForm((prev) => ({ ...prev, harga: total }));
    }
  }, [form.maskapai, form.kelas, form.penumpang]);

  // Handle input biasa
  function handleChange(e) {
    let { name, value } = e.target;

    // Jika penumpang berubah → update array nama penumpang
    if (name === "penumpang") {
      let jumlah = Number(value);
      let newArr = [...form.namaPenumpang];

      if (jumlah > newArr.length) {
        while (newArr.length < jumlah) newArr.push("");
      } else {
        newArr = newArr.slice(0, jumlah);
      }

      setForm({
        ...form,
        penumpang: jumlah,
        namaPenumpang: newArr,
        kursi: [], // reset kursi jika jumlah penumpang berubah
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  }

  // handle nama penumpang
  function handleNamaPenumpang(i, value) {
    const updated = [...form.namaPenumpang];
    updated[i] = value;
    setForm({ ...form, namaPenumpang: updated });
  }

  // handle seat selection
  function toggleSeat(seat) {
    let selected = [...form.kursi];

    if (selected.includes(seat)) {
      selected = selected.filter((s) => s !== seat);
    } else {
      if (selected.length < form.penumpang) {
        selected.push(seat);
      } else {
        alert(`Anda harus memilih ${form.penumpang} kursi`);
        return;
      }
    }

    setForm({ ...form, kursi: selected });
  }

  // submit
  function handleSubmit(e) {
    e.preventDefault();

    if (form.kursi.length !== form.penumpang) {
      alert("Jumlah kursi yang dipilih harus sesuai jumlah penumpang!");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("riwayatPemesanan") || "[]");

    const newData = {
      ...form,
      id: Date.now(),
    };

    saveOrderObj(newData);

    navigate("/riwayat");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Pemesanan Tiket</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Nama Pemesan */}
        <div>
          <label className="block mb-1 font-medium">Nama Pemesan</label>
          <input
            type="text"
            name="pemesan"
            value={form.pemesan}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Maskapai */}
        <div>
          <label className="block mb-1 font-medium">Maskapai</label>
          <select
            name="maskapai"
            value={form.maskapai}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">-- Pilih Maskapai --</option>
            {Object.keys(maskapaiData).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Kelas */}
        <div>
          <label className="block mb-1 font-medium">Kelas</label>
          <select
            name="kelas"
            value={form.kelas}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">-- Pilih Kelas --</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Bisnis">Bisnis</option>
            <option value="First">First Class</option>
          </select>
        </div>

        {/* Asal */}
        <div>
          <label className="block mb-1 font-medium">Asal</label>
          <input
            type="text"
            name="asal"
            value={form.asal}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tujuan */}
        <div>
          <label className="block mb-1 font-medium">Tujuan</label>
          <input
            type="text"
            name="tujuan"
            value={form.tujuan}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tanggal Berangkat */}
        <div>
          <label className="block mb-1 font-medium">Tanggal Berangkat</label>
          <input
            type="date"
            name="tanggalBerangkat"
            value={form.tanggalBerangkat}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Jumlah Penumpang */}
        <div>
          <label className="block mb-1 font-medium">Jumlah Penumpang</label>
          <input
            type="number"
            min="1"
            name="penumpang"
            value={form.penumpang}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Nama penumpang (dinamis) */}
        <div>
          <label className="block font-medium mb-2">Nama Penumpang</label>
          {form.namaPenumpang.map((np, i) => (
            <input
              key={i}
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder={`Nama Penumpang ${i + 1}`}
              value={np}
              onChange={(e) => handleNamaPenumpang(i, e.target.value)}
              required
            />
          ))}
        </div>

        {/* Seat Map */}
        <div>
          <label className="block font-medium mb-2">Pilih Kursi</label>
          <div className="grid grid-cols-6 gap-2 p-4 border rounded bg-gray-50">

            {Array.from({ length: seatRows }).map((_, rowIndex) =>
              seatColumns.map((col) => {
                const seatId = `${rowIndex + 1}${col}`;
                const selected = form.kursi.includes(seatId);

                return (
                  <button
                    type="button"
                    key={seatId}
                    className={`p-2 border rounded text-sm
                      ${selected ? "bg-blue-500 text-white" : "bg-white"}
                    `}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {seatId}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Harga */}
        <div>
          <label className="block mb-1 font-medium">Total Harga</label>
          <div className="p-3 bg-gray-100 rounded border">
            Rp {form.harga.toLocaleString("id-ID")}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Simpan Pesanan
        </button>

      </form>
    </div>
  );
}
