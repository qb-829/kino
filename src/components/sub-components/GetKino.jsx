import React, { useEffect, useState } from 'react';
import axios from "axios";

export default async function GetKino() {
    // const [data, setData] = useState([])
    const url = "https://puertorico.secondchancebonuszone.com/kino/past_drawings.php"

    try{
        const data = await axios.get( url )
        console.log(data.data)
    }
    catch (error) {
        console.log(error)
    }
  return (
    <div>
      <h1>KinoBoard</h1>
    </div>
  );
}


