import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/editor.css"

const Editor = (props) => {
  const { fetchedData } = props;
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
      // .post("http://192.168.18.40:4000/config", { textAreaContent })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1 className="header">Update JSON Database directly</h1>
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
export default Editor;
