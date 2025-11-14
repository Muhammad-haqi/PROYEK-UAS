import { useState, useEffect } from "react";
import { loadOrders, deleteOrder, updateOrderObj } from "../utils/storage";
import RiwayatItem from "../components/RiwayatItem";

export default function RiwayatPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  function handleDelete(id) {
    deleteOrder(id);
    setOrders(loadOrders());
  }

  function handleEdit(updatedOrder) {
    updateOrderObj(updatedOrder);
    setOrders(loadOrders());
  }

  function handlePay(id) {
    const order = orders.find((o) => o.id === id);
    if (order) {
      updateOrderObj({ ...order, paid: true });
      setOrders(loadOrders());
    }
  }

  if (orders.length === 0) {
    return (
      <section className="min-h-screen py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-blue-700 mb-6">Riwayat Pemesanan</h3>
          <div className="space-y-4 p-4 border rounded-xl bg-white shadow">
            <p className="text-gray-500">Belum ada riwayat pemesanan…</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-blue-700 mb-6">Riwayat Pemesanan</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <RiwayatItem
              key={order.id}
              o={order}
              onDelete={() => handleDelete(order.id)}
              onEdit={() => handleEdit(order)}
              onPay={() => handlePay(order.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
