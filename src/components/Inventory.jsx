"use client";
import { useEffect, useState } from "react";

export default function Inventory() {
  const [money, setMoney] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const fetchInventory = async () => {
      try {
        const res = await fetch(`/api/inventory?id=${userId}`);
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg);
        }
        const data = await res.json();
        setMoney(data.money);
        setItems(data.inventory || []);
      } catch (err) {
        console.error("인벤토리 조회 오류:", err.message);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-lg mb-2">
        <span role="img" aria-label="money">
          💰
        </span>{" "}
        보유 금액: <span className="text-2xl">{money} G</span>
      </h2>
      <h3 className="font-bold text-lg mb-4">
        <span role="img" aria-label="bag">
          👜
        </span>{" "}
        인벤토리
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="aspect-square border-2 border-black rounded-lg flex flex-col items-center justify-center"
          >
            <div className="text-lg font-bold">{item.item}</div>
            <div className="mt-2 text-gray-700">{item.count} 개</div>
          </div>
        ))}
      </div>
    </div>
  );
}
