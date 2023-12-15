import React from "react";
import "./styles/nav.css";

function Nav(props) {
const { day } = props
  return (
    <div className="Nav">
      <a id={0 === day ? "Today" : 'Normal'} href='/SUN'>SUN</a>
      <a id={1 === day ? "Today" : 'Normal'} href='/MON'>MON</a>
      <a id={2 === day ? "Today" : 'Normal'} href='/TUE'>TUE</a>
      <a id={3 === day ? "Today" : 'Normal'} href='/WED'>WED</a>
      <a id={4 === day ? "Today" : 'Normal'} href='/THU'>THU</a>
      <a id={5 === day ? "Today" : 'Normal'} href='/FRI'>FRI</a>
      <a id={6 === day ? "Today" : 'Normal'} href='/SAT'>SAT</a>
    </div>
  );
}

export default Nav;
