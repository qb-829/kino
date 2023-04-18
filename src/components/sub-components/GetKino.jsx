import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Getkino() {
  const url = "https://puertorico.secondchancebonuszone.com/kino/past_drawings.php";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDraw();
  }, []);

  const loadDraw = async (itemGameNumber, itemBonus) => {
    try {
      const response = await axios.get(url, {
        params: {
          gameNumber: itemGameNumber,
          bonus: itemBonus,
        },
      });
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <div>
        <h1>kino get data</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div>
          {data.map((item, index) => {
            return (
              <div key={index}>
                <h2>gameNumber: {item.gameNumber}</h2>
                <h3>bonus: {item.bonus}</h3>
                <h3>drawNumbers: {item.drawNumbers}</h3>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
