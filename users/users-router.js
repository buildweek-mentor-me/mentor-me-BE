const router = require("express").Router();
const db = require('./users-model.js');

router.get("/", async (req, res) => {
  try {
    const users = await db.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "error getting users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error retrieving user" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newuser = await db.insert(req.body);
    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).json({ message: "error posting" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const change = await db.update(id, req.body)
    res.status(200).json(change)
  } catch (error) {
    res.status(500).json({ message: 'error updating' })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await db.remove(id);
    res.status(200).json({ message: 'successfully deleted' })
  } catch (error) {
    res.status(500).json({ message: 'error deleting' })
  }
})

module.exports = router;
