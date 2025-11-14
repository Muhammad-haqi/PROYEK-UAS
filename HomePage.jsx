// HomePage.jsx dengan Slideshow Banner + warna menarik
import React, { useState, useEffect } from "react";
import { Plane, Calendar, CreditCard, Star } from "lucide-react";
import Navbar from "../components/Navbar";


export default function HomePage() {
  // ===== SLIDESHOW DATA =====
  const slides = [
    {
      title: "Jelajahi Dunia Dengan Nyaman",
      desc: "Pesan tiket pesawat dengan cepat, mudah, dan harga terbaik hanya di SkyFly.",
    },
    {
      title: "Promo Terbaik Setiap Minggu",
      desc: "Nikmati diskon eksklusif ke berbagai destinasi favorit Anda!",
    },
    {
      title: "Terbang Lebih Mudah & Aman",
      desc: "Pembayaran aman, maskapai terpercaya, pengalaman terbaik.",
    },
  ];

  // Slideshow state
  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-600 to-sky-300 flex flex-col items-center gap-16 pb-20 pt-24">

      <Navbar />


      {/* ========== SLIDESHOW HERO ========== */}
      <section className="relative w-full h-[320px] md:h-[380px] bg-white/10 backdrop-blur-lg shadow-xl rounded-b-3xl overflow-hidden">

        {/* Slide Content */}
        <div
          key={index}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 transition-all duration-700 opacity-0 animate-fadeIn"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            {slides[index].title}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mt-3">
            {slides[index].desc}
          </p>

          <button className="mt-6 bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300">
            Mulai Cari Tiket
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-white scale-125" : "bg-white/40"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <FeatureCard
          icon={<Plane className="w-14 h-14 text-blue-700" />}
          title="Cari Penerbangan"
          desc="Temukan tiket pesawat terbaik dengan cepat dan mudah."
        />

        <FeatureCard
          icon={<Calendar className="w-14 h-14 text-green-700" />}
          title="Jadwal Perjalanan"
          desc="Kelola itinerary Anda dengan tampilan simple & rapi."
        />

        <FeatureCard
          icon={<CreditCard className="w-14 h-14 text-purple-700" />}
          title="Pembayaran Aman"
          desc="Metode pembayaran lengkap, aman, dan cepat."
        />
      </div>

      {/* ===== PROMO SECTION ===== */}
      <section className="w-full max-w-5xl bg-white/90 backdrop-blur shadow-xl rounded-3xl p-10 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Star className="w-8 h-8 text-yellow-500" /> Promo & Penawaran Spesial
        </h2>
        <p className="text-gray-600 max-w-xl">
          Dapatkan diskon hingga <span className="font-bold text-blue-600">50%</span> untuk destinasi pilihan bulan ini.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full">
          <PromoCard city="Bali" price="Rp 799.000" />
          <PromoCard city="Singapore" price="Rp 1.200.000" />
          <PromoCard city="Tokyo" price="Rp 4.500.000" />
        </div>
      </section>

      {/* DESTINATION SECTION */}
<section className="w-full max-w-6xl mt-10">
  <h2 className="text-3xl font-bold text-white text-center drop-shadow-lg mb-6">
    Destinasi Populer
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <DestinationCard city="Bali" img="https://source.unsplash.com/featured/?bali" />
    <DestinationCard city="Dubai" img="https://source.unsplash.com/featured/?dubai" />
    <DestinationCard city="Tokyo" img="https://source.unsplash.com/featured/?tokyo" />
    <DestinationCard city="Paris" img="https://source.unsplash.com/featured/?paris" />
    <DestinationCard city="Bangkok" img="https://source.unsplash.com/featured/?bangkok" />
    <DestinationCard city="Sydney" img="https://source.unsplash.com/featured/?sydney" />
  </div>
</section>


      {/* FOOTER */}
      <footer className="mt-10 text-white/80 text-sm">
        © 2025 SkyFly Travel • Semua Hak Dilindungi
      </footer>
    </div>
  );
}

// ===== COMPONENTS =====
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/90 backdrop-blur border border-white/40 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-all duration-300">
      {icon}
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function PromoCard({ city, price }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
      <h3 className="text-xl font-bold text-gray-800">{city}</h3>
      <p className="text-blue-600 font-semibold mt-2">Mulai dari {price}</p>
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition">Pesan Sekarang</button>
    </div>
  );
}

function DestinationCard({ city, img }) {
  return (
    <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group">
      <div
        className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${img})` }}
      ></div>

      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-gray-800">{city}</h3>
        <p className="text-sm text-gray-500">Destinasi favorit para traveler</p>
      </div>
    </div>
  );
}
