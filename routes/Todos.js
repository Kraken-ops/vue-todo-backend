const express = require("express");
const router = express.Router();
const Todo = require("../models/Todos");

router.get("/", async (req, res) => {
    // if(req.body.search == ""){
    //     console.log("searching");
         
        const todos = await Todo.find();
        res.json(todos);
    
    // else{
    //     const todos = await Todo.findOne({text:search});
    //     res.json(todos);
    // }
  
});

router.post("/", async (req, res) => {
  const newTodo = new Todo({
    id: req.body.id,
    text: req.body.text,
    done: req.body.done,
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  const t = await Todo.findById({ _id: req.params.id });
  res.json(t);
});

router.delete("/delete/:id", async (req, res) => {
  const toDelete = await Todo.findByIdAndDelete({ _id: req.params.id });
  res.json(toDelete);
});

router.put("/:id/status", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.done = req.body.done;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
