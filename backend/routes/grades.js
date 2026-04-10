const express = require("express");
const router = express.Router();
const Grade = require("../models/Grade");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");

// ➕ Add Grade (Lecturer only)
router.post("/", auth, checkRole("lecturer"), async (req, res) => {
  const { studentId, module, score } = req.body;

  try {
    const grade = new Grade({
      studentId: req.body.studentId,
      module,
      score,
      lecturerId: req.user.id
    });

    await grade.save();

    res.json({ message: "Grade added successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
  
});
router.get("/", auth, checkRole("lecturer"), async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:id", auth, checkRole("lecturer"), async (req, res) => {
  const { studentId, module, score } = req.body;

  try {
    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      { studentId, module, score },
      { new: true }
    );

    res.json(updatedGrade);

  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", auth, checkRole("lecturer"), async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);

    res.json({ message: "Grade deleted successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET STUDENT'S OWN GRADES
router.get("/my-grades", auth, async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.query.studentId });
    res.json(grades);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;