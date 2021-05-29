import "./styles.css";
import React, { useEffect, useState, useRef } from "react";
import useAxios from "./useAxios";

// Axios통신을 위한 app.js
const App = () => {
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json",
  });
  console.log(
    `loading:${loading}\n data:${JSON.stringify(data)}\n error:${error}`
  );
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading"}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

export default App;
