import "./styles/App.css";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Day from "./components/Day.jsx";
import Config from "./components/configRoute/Config.jsx"

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await fetch("https://exercise-data.onrender.com/");
        // const req = await fetch("http://localhost:4000");
        const data = await req.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const currentT = new Date();
  const day = currentT.getDay();

  const days = [
    <Day day_Func={day} day_Num={0} day_Word={"Sunday"} day_Abb="SUN" />,
    <Day day_Func={day} day_Num={1} day_Word={"Monday"} day_Abb="MON" />,
    <Day day_Func={day} day_Num={2} day_Word={"Tuesday"} day_Abb="TUE" />,
    <Day day_Func={day} day_Num={3} day_Word={"Wednesday"} day_Abb="WED" />,
    <Day day_Func={day} day_Num={4} day_Word={"Thursday"} day_Abb="THU" />,
    <Day day_Func={day} day_Num={5} day_Word={"Friday"} day_Abb="FRI" />,
    <Day day_Func={day} day_Num={6} day_Word={"Saturday"} day_Abb="SAT" />,
  ];

  return (
    <div className="App">
      <div className="UI">
        <Nav day={day} />
        <Router>
          <Routes>
            <Route path="/" element={days[day]} />
            <Route path="/SUN" element={days[0]} />
            <Route path="/MON" element={days[1]} />
            <Route path="/TUE" element={days[2]} />
            <Route path="/WED" element={days[3]} />
            <Route path="/THU" element={days[4]} />
            <Route path="/FRI" element={days[5]} />
            <Route path="/SAT" element={days[6]} />
            <Route path="/config" element={<Config data={data} />} />
          </Routes>
        </Router>
        <div className="ConfigBtnCon">
          <a className="ConfigBtn" href="/config">
            Config
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
