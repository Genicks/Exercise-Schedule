import Editor from "./configComponents/Editor";
import "../styles/main.css"

const Config = (props) => {
  const { data } = props;
  const fetchedData = JSON.stringify(data, null, 3);


  return (
    <div>
    
      <Editor fetchedData={fetchedData}/>
    </div>
  );
};
export default Config;
