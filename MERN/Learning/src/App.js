import "./App.css";
import { useState } from "react";
import Axios from "axios"

function App() {
  const [ name, setName ] = useState("");
  const [ age, setAge ] = useState(0);


  const addFriend = () =>{
    Axios.post("", {})
  }

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="name"
          className="name"
          placeholder="Friends Name"
          onChange={(ev) => {
            setName(ev.target.value);
          }}
        />
        <input
          type="number"
          className="age"
          placeholder="Friends Age"
          onChange={(ev) => {
            setAge(ev.target.value);
          }}
        />
        <button onClick={addFriend}> Add Friend</button>
      </div>
    </div>
  );
}

export default App;
