import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [friendsList, setFriendList] = useState([]);

  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", { name: name, age: age })
      .then((response) => {
        setFriendList([
          ...friendsList,
          { _id: response.data._id, name: name, age: age },
        ]);
        setName("");
        setAge("")
      })
      .catch(() => {
        alert("Oh no! Problem occured");
      });
  };
  const updateFriend = (id) => {
    const newAge = prompt("Enter new Value :");
    Axios.put("http://localhost:3001/update", { newAge: newAge, id: id }).then(
      () => {
        setFriendList(
          friendsList.map((val) => {
            return val._id == id
              ? { _id: id, name: val.name, age: newAge }
              : val;
          })
        );
      }
    );
  };

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setFriendList(
        friendsList.filter((val) => {
          return val._id != id;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((res) => {
        setFriendList(res.data);
      })
      .catch(() => {
        console.log("err");
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="name"
          className="name"
          value={name}
          placeholder="Friends Name"
          onChange={(ev) => {
            setName(ev.target.value);
          }}
        />
        <input
          type="number"
          className="age"
          value={age}
          placeholder="Friends Age"
          onChange={(ev) => {
            setAge(ev.target.value);
          }}
        />
        <button onClick={addFriend}> Add Friend</button>
      </div>
      <div className="listofFriends">
        {friendsList.map((val) => {
          return (
            <div className="friendContainer">
              <div className="friends">
                <h3>Name: {val.name} </h3>
                <h3>Age: {val.age} </h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteFriend(val._id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
