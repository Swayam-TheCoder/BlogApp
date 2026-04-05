import { useEffect, useState } from "react";
import API from "../services/api";

function Notifications() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/notifications").then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl text-green-400">Notifications</h2>

      {data.map((n) => (
        <div key={n._id} className="bg-[#1e293b] p-3 my-2 rounded">
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Notifications;