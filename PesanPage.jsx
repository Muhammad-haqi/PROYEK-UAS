import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PesanPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    namaPemesan: "",
    nomorHp: "",
    email: "",
    maskapai: "",
    kelas: "",
    asal: "",
    tujuan: "",
    tanggalBerangkat: "",
    penumpang: 1,
    namaPenumpang: [""],
    kursi: [],
  });

  const maskapaiData = [
    { nama: "Lion Air", harga: 800000 },
    { nama: "Sriwijaya Air", harga: 950000 },
    { nama: "Garuda Indonesia", harga: 1500000 },
    { nama: "Pelita Air", harga: 1200000 },
  ];

  const kelasOptions = [
    { label: "Ekonomi", multiplier: 1 },
    { label: "Bisnis", multiplier: 1.8 },
    { label: "First Class", multiplier: 2.5 },
  ];

  const seatRows = 10;
  const seatColumns = ["A", "B", "C", "D", "E", "F"];

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "penumpang") {
      const jumlah = Number(value);
      let namaArr = [...form.namaPenumpang];
      if (jumlah > namaArr.length) {
        while (namaArr.length < jumlah) namaArr.push("");
      } else {
        namaArr = namaArr.slice(0, jumlah);
      }
      setForm({
        ...form,
        penumpang: jumlah,
        namaPenumpang: namaArr,
        kursi: [],
      });
      return;
    }
    setForm({ ...form, [name]: value });
  }

  function handleNamaPenumpang(i, value) {
    const updated = [...form.namaPenumpang];
    updated[i] = value;
    setForm({ ...form, namaPenumpang: updated });
  }

  function toggleSeat(seat) {
    let selected = [...form.kursi];
    if (selected.includes(seat)) {
      selected = selected.filter((s) => s !== seat);
    } else {
      if (selected.length < form.penumpang) {
        selected.push(seat);
      } else {
        alert(`Jumlah kursi dipilih sesuai jumlah penumpang`);
        return;
      }
    }
    setForm({ ...form, kursi: selected });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.kursi.length !== form.penumpang) {
      alert("Jumlah kursi harus sesuai jumlah penumpang!");
      return;
    }
    navigate("/riwayat");
  }

  const hargaMaskapai = maskapaiData.find(m => m.nama === form.maskapai)?.harga || 0;
  const kelasMultiplier = kelasOptions.find(k => k.label === form.kelas)?.multiplier || 1;
  const totalHarga = hargaMaskapai * kelasMultiplier * form.penumpang;

  return (
    <section className="min-h-screen bg-[#F5F7FC] py-8">
      <div className="max-w-4xl mx-auto rounded-xl shadow-lg bg-white p-8">
        <h2 className="text-2xl font-extrabold mb-5 text-blue-800">Detail Pemesan & Penumpang</h2>
        
        {}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Nama Pemesan*</label>
              <input
                type="text"
                name="namaPemesan"
                value={form.namaPemesan}
                onChange={handleChange}
                required
                className="input-field mt-1"
                placeholder="Nama sesuai KTP/SIM"
              />
            </div>
            <div>
              <label className="font-semibold">Nomor HP*</label>
              <input
                type="tel"
                name="nomorHp"
                value={form.nomorHp}
                onChange={handleChange}
                required
                className="input-field mt-1"
                placeholder="+62..."
              />
            </div>
            <div>
              <label className="font-semibold">Email*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="input-field mt-1"
                placeholder="email@contoh.com"
              />
            </div>
          </div>

          {}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Asal*</label>
              <input
                type="text"
                name="asal"
                value={form.asal}
                onChange={handleChange}
                required
                className="input-field mt-1"
                placeholder="Contoh: Jakarta"
              />
            </div>
            <div>
              <label className="font-semibold">Tujuan*</label>
              <input
                type="text"
                name="tujuan"
                value={form.tujuan}
                onChange={handleChange}
                required
                className="input-field mt-1"
                placeholder="Contoh: Denpasar"
              />
            </div>
            <div>
              <label className="font-semibold">Tanggal Berangkat*</label>
              <input
                type="date"
                name="tanggalBerangkat"
                value={form.tanggalBerangkat}
                onChange={handleChange}
                required
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Maskapai*</label>
              <select
                name="maskapai"
                value={form.maskapai}
                onChange={handleChange}
                required
                className="input-field mt-1"
              >
                <option value="">-- Pilih Maskapai --</option>
                {maskapaiData.map(m => (
                  <option key={m.nama} value={m.nama}>{m.nama}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold">Kelas*</label>
              <select
                name="kelas"
                value={form.kelas}
                onChange={handleChange}
                required
                className="input-field mt-1"
              >
                <option value="">-- Pilih Kelas --</option>
                {kelasOptions.map(k => (
                  <option key={k.label} value={k.label}>{k.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold">Jumlah Penumpang*</label>
              <input
                type="number"
                min="1"
                name="penumpang"
                value={form.penumpang}
                onChange={handleChange}
                required
                className="input-field mt-1"
              />
            </div>
          </div>

          {}
          <div>
            <label className="font-semibold">Nama Penumpang</label>
            {form.namaPenumpang.map((np, i) => (
              <input
                key={i}
                type="text"
                className="input-field mt-1"
                placeholder={`Nama Penumpang ${i + 1}`}
                value={np}
                onChange={e => handleNamaPenumpang(i, e.target.value)}
                required
              />
            ))}
          </div>
          
          {}
          <div>
            <label className="font-semibold">Pilih Kursi</label>
            <div className="grid grid-cols-6 gap-2 mt-2 p-2 bg-gray-50 border rounded">
              {Array.from({ length: seatRows }).map((_, rowIndex) =>
                seatColumns.map((col) => {
                  const seatId = `${rowIndex + 1}${col}`;
                  const selected = form.kursi.includes(seatId);
                  return (
                    <button
                      type="button"
                      key={seatId}
                      className={`border rounded p-2 text-sm ${selected ? 'bg-blue-500 text-white' : 'bg-white'}`}
                      onClick={() => toggleSeat(seatId)}
                    >{seatId}</button>
                  );
                })
              )}
            </div>
          </div>
          
          {}
          <div>
            <label className="font-semibold">Total Harga</label>
            <div className="bg-gray-100 p-2 rounded border font-bold text-lg">
              Rp {totalHarga.toLocaleString("id-ID")}
            </div>
          </div>

          {}
          <button type="submit" className="btn-primary-lg w-full">Lanjut Bayar</button>
        </form>
      </div>
    </section>
  );
}
