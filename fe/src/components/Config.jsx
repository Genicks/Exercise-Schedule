import axios from "axios"
import React, { useEffect, useState } from "react";

const Config = (props) => {
  const { data } = props;
  const fetchedData = JSON.stringify(data, null, 2);
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
    axios.post('http://localhost:4000/config', { textAreaContent })
    .then(() => {
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  //! TEST ------
    // console.log(data)
    // console.log(fetchedData)
    // console.log(textAreaContent)
  //! TEST ------
  return (
    <div>
      <textarea
        name="config"
        id="config"
        value={textAreaContent}
        onChange={handleTextAreaChange}
      />
      <button
        disabled={isButtonDisabled}
        className="btn"
        onClick={handleButtonClick}
      >
        Update Json
      </button>
    </div>
  );
};
export default Config;
