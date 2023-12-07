import { readFile as _readFile, writeFile } from "fs";
import express, { json } from "express";
import cors from "cors";
const app = express();

app.use(json())
app.use(cors());

let data;

const readFile = () => {
  return new Promise((resolve, reject) => {
    _readFile("./data.json", "utf8", (err, jdata) => {
      if (err) {
        console.error("Error reading the file:", err);
        reject(err);
        return;
      }
      data = JSON.parse(jdata);
      resolve(data);
    });
  });
};

const writefiles = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      writeFile('./Data.json', data, 'utf-8', () => {});
      resolve('File has been written successfully!');
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

async function formatData() {
  try {
    await readFile();
    const formatedData = Object.keys(data).map((routine, i) => (
      {
        [`Routine${i + 1}`]: data[routine],
    }
    
    ));
    console.log(formatedData)
    return formatedData;
  } catch (error) {
    console.log("There was an error formatting the data.", error);
    throw error;
  }
}
const log = async() => {
  await readFile()
  console.log(data)
}
log()

app.get("/", async (req, res) => {
  try {
    const jsonData = await formatData();
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const DayWorkout = async (day) => {
  try {
    const jData = await formatData();
    const daychosen = day;
    let finalRoutine;
    let rest = true;


    jData.map((routine, index) => {
      routine.value[0].days.map((day) => {
        if (daychosen === day) {
          finalRoutine = routine.value[1];
          rest = false
        } else {
          rest?finalRoutine = { workout: "rest" }:null
        }
      });
    });

    return (finalRoutine)
  } catch (error) {
    console.log(error);
  }
};

app.post('/config', async (req, res) => {
  try {
    const requestData = (req.body);
    const finaldata = requestData.textAreaContent
    await writefiles(finaldata)
    res.send("sucess")
  } catch (error) {
    console.log(error)
  }
});

app.get("/:id", async (req, res) => { 
  const day = req.params
  try {
    const workout = await DayWorkout(day.id)
    res.json(workout)
  } catch (error) {
    console.log(error)
  }
});



app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
