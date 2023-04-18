import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export default function GetKino() {
//   const url = "https://puertorico.secondchancebonuszone.com/kino/past_drawings.php";
  const url = "https://puertorico.secondchancebonuszone.com/kino/past_drawings.php?drawid=601081&number=20&sort=asc"
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDraw();
  }, []);

  const loadDraw = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
      console.log(response.data.json);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Kino past drawings</h1>
      {data.map((item, index) => (
        <Card key={index} className="my-4">
          <Card.Header>
            <h4 className="mb-0">Game Number: {item.gameNumber}</h4>
          </Card.Header>
          <Card.Body>
            <p className="mb-0">Bonus: {item.bonus}</p>
            <p className="mb-0">Draw Numbers: {item.drawNumbers.join(", ")}</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
