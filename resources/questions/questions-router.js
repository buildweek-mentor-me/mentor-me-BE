const router = require("express").Router();

const Questions = require("./questions-model");

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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
    await Questions.insert(req.body);
    res.status(201).json({ message: "successfully posted" });
  } catch (error) {
    res.status(500).json({
      message: "error adding question",
      error
    });
  }
});

module.exports = router;
