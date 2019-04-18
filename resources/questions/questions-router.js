const router = require("express").Router();
const restricted = require('../../auth/restricted-middleware');

const Questions = require("./questions-model");

router.get("/", restricted, async (req, res) => {
  try {
    const questions = await Questions.get();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "error getting questions",
      error
    });
  }
});

router.get("/:id", restricted, async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Questions.get(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "error getting", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const question = await Questions.insert(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({
      message: "error adding question",
      error
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const changes = await Questions.update(id, req.body);
    res.status(200).json(changes);
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Questions.remove(id);
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "error deleting", error });
  }
});

module.exports = router;
