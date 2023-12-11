import Img from "../Img/rest.png";
import "./Comp.css";
import React from "react";
import { useState, useEffect } from "react";

const Sun = (props) => {
  const { day_Func, day_Num, day_Word, day_Abb } = props;
  const today = day_Func === day_Num ? "Today" : day_Word;

  const [workout, setWorkout] = useState([]);
  const [rest, setRest] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await fetch(`https://exercise-data.onrender.com/${day_Abb}`);
        const data = await req.json();
        if (data.workout === "rest") {
          setRest(true);
        } else {
          setWorkout(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [day_Abb]);

  return (
    <div className="Days">
      <h1>{today}</h1>
      <div className="Workout">
        {!rest
          ? workout.map((exercise, index) => (
              <div key={index} className="Exercise">
                <div>
                  <h3>{exercise.name}</h3>
                  <div>
                    <h5>
                      Reps: {exercise.reps} Sets: {exercise.sets}
                    </h5>
                  </div>
                </div>
                <input type="checkbox" name="cb" className="checkbox" />
              </div>
            ))
          : 
          <div>
            <h1>REST DAY</h1>
            <img src={Img} alt="rest" />
          </div>
          }
      </div>
    </div>
  );
};
export default Sun;
