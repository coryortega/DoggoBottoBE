const express = require("express");
const Admins = require("./admin-model");
const router = express.Router();

router.get("/", (req, res) => {
  Admins.find()
    .then(admin => {
      res.status(200).json(admin);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get admins, error: ${error}.` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Admins.findById(id)
    .then(admin => {
      if (admin) {
        res.status(200).json(admin);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a admin with the given id." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: `Failed to get admin, error: ${error}.` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Admins.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: "The admin was successfully deleted." });
      } else {
        res
          .status(404)
          .json({ message: "Could not find the admin with the specified id." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to delete the admin, error: ${error}.` });
    });
});

module.exports = router;