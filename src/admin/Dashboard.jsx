import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  UtensilsCrossed,
  IndianRupee,
} from "lucide-react";

export default function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/count")
      .then((res) => res.json())
      .then((data) => setCount(data.totalUsers));
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: count,
      icon: <Users size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Bookings",
      value: 0,
      icon: <Calendar size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Menu Items",
      value: 0,
      icon: <UtensilsCrossed size={28} />,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: "₹0",
      icon: <IndianRupee size={28} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>

     

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} rounded-xl text-white p-6 shadow-lg`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg">
                  {card.title}
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {card.value}
                </p>
              </div>

              {card.icon}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}