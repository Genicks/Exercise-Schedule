import axios from "axios";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

const LinesOfCode = (props) => {
  const { lines, classC } = props;

  return (
    <div>
      {lines.map((num, i) => (
        <div key={i} className={`linesOfCode ${classC}`}>
          <p>{i + 1}</p>
        </div>
      ))}
    </div>
  );
};

const Config = (props) => {
  const { data } = props;
  const fetchedData = JSON.stringify(data, null, 3);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setTextAreaContent(fetchedData);
    setButtonDisabled(true);
  }, [fetchedData]);

  const handleTextAreaChange = (event) => {
    setTextAreaContent(event.target.value);
    setButtonDisabled(false);
  };

  const handleButtonClick = () => {
    axios
      .post("https://exercise-data.onrender.com/config", { textAreaContent })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function countLines(str) {
    const linesArray = str.split(/\r\n|\r|\n/);
    return linesArray;
  }

  const lines = countLines(fetchedData);

  //! TEST ------
  // console.log(data)
  // console.log(fetchedData)
  // console.log(textAreaContent)
  //! TEST ------
  return (
    <div>
      <h1 className="header header1"> View JSON Data</h1>
      <div className="codeCon">
        <div className="codeViewer">
          <LinesOfCode lines={lines} />
          <pre className="Code">
            <code
              className="language-JSON"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight("json", textAreaContent).value,
              }}
            />
          </pre>
        </div>
      </div>

      <h1 className="header"> Edit Raw JSON Data</h1>

      <div className="btnCon">
        <button
          disabled={isButtonDisabled}
          className="btn"
          onClick={handleButtonClick}
        >
          Update Json
        </button>
      </div>

      <div className="codeCon">
        <div className="codeEditor">
          <LinesOfCode lines={lines} classC="codeEditorLines" />
          <textarea
            name="config"
            id="config"
            value={textAreaContent}
            onChange={handleTextAreaChange}
          />
        </div>
      </div>
    </div>
  );
};
export default Config;
