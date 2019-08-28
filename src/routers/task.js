const express = require("express");
const router = new express.Router();
const Task = require("../models/Tasks");

router.get("/tasks", (req, res) => {
  Task.find({})
    .then(tasks => res.status(201).send(tasks))
    .catch(err => res.status(500).send(err));
});

router.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then(task => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(err => res.status(400).send(err));
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const task = await Task.findById(req.params.id);

    updates.forEach(update => (task[update] = req.body[update]));

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
