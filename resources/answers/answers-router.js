const router = require("express").Router();

const Answers = require("./answers-model");

router.get("/", async (req, res) => {
  try {
    const answers = await Answers.get();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({
      message: "error getting answers",
      error
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answers.get(id);
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: "error getting", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const answer = await Answers.insert(req.body);
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({
      message: "error adding question",
      error
    });
  }
});

module.exports = router;
