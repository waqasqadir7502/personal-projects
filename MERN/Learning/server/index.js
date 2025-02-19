const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const FriendModel = require("./model/friends");

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://waqasqadir942:CtV0gFUQnjd5YBIB@clusterlearning.zkiwu4l.mongodb.net/learning",
  { useNewUrlParser: true }
);

// CREATE
app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const friend = new FriendModel({ name: name, age: age });
  await friend.save();
  res.send(friend);
});

// READ
app.get("/read", async (req, res) => {
  try {
    const friends = await FriendModel.find(); // No callback, using await
    res.json(friends);
  } catch (err) {
    res.status(500).send("Error retrieving data");
    console.error("Error retrieving data:", err);
  }
});

// UPDATE
app.put("/update", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;

  try {
    const friendToUpdate = await FriendModel.findById(id);
    if (friendToUpdate) {
      friendToUpdate.age = Number(newAge);
      await friendToUpdate.save();
      res.send("Updated!");
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
});

// DELETE 
app.delete("/delete/:id", async (req, res)=>{
  const id = req.params.id;
  await FriendModel.findByIdAndDelete(id);
  res.send("Item Deleted!")
})

// SERVER CONNECTION
app.listen(3001, () => {
  console.log("This Backend Is Working");
});
