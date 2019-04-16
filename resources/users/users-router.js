const router = require("express").Router();
const Users = require('./users-model.js');

router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "error retrieving users",  error: error});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.get(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error retrieving user", error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newuser = await Users.insert(req.body);
    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).json({ message: "error posting", error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const change = await Users.update(id, req.body)
    res.status(200).json(change)
  } catch (error) {
    res.status(500).json({ message: 'error updating', error })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await Users.remove(id);
    res.status(200).json({ message: 'successfully deleted' })
  } catch (error) {
    res.status(500).json({ message: 'error deleting' })
  }
})

module.exports = router;
