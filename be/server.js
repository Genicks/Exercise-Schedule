const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
// const data = require("./Format.json");

// *Read json data from files
const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("../Update/data.json", "utf8", (err, jdata) => {
      if (err) {
        console.error("Error reading the file:", err);
        reject(err);
        return;
      }
      const parsedData = JSON.parse(jdata);
      resolve(parsedData);
    });
  });
};

// *Write to json data base
const writeFiles = (data) => {
  return new Promise(async (resolve, reject) => {
    const formatedData = JSON.stringify(data, null, 2);
    try {
      fs.writeFile("./Data.json", formatedData, "utf-8", () => {});
      resolve("File has been written successfully!");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

// *Get a specific workout based on the day that is passed as a parameter
const DayWorkout = async (day) => {
  try {
    const data = await readFile();
    const weekSchedule = await data[0].schedule.days;
    const dayChosen = day;
    let dayRoutine;

    weekSchedule.map((day, index) => {
      if (day.Name == dayChosen) {
        const category = day.activity;
        if (category) {
          dayRoutine = data[0].schedule.categories[category];
        } else {
          dayRoutine = data[0].schedule.categories.Rest;
        }
      } else {
        console.log({ day: "Not Found" });
      }
    });
    return dayRoutine;
  } catch (error) {
    console.log(error);
  }
};

// !Test for the server
const log = async () => {
  // console.log(await readFile());
  // console.log(await DayWorkout("MON"))
};
log();

// console.log(writeFiles(data));
// const test = async (day) => {
//   console.log(await DayWorkout(day))
// }
// test("SAT")
// !------------------

//! Routes for Server

// *Send all data to the origin at localhost:4000
app.get("/", async (req, res) => {
  try {
    const data = await readFile();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// *Handle post request to change json database
app.post("/config", async (req, res) => {
  try {
    const data = req.body;
    const finaldata = JSON.parse(data.textAreaContent);
    await writeFiles(finaldata);
    res.send("sucess");
  } catch (error) {
    console.log(error);
  }
});

// *Pass individual workouts to specific routes
app.get("/:id", async (req, res) => {
  const day = req.params;
  try {
    const workout = await DayWorkout(day.id);
    res.json(workout);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
