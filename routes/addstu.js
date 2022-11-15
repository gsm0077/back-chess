var express = require("express");
var router = express.Router();
const Namestudent = require("../modules/addstu");

router.get("/", async function (req, res, next) {
  try {
    const names = await Namestudent.find();
    res.json({
      sucess: "true",
      content: names,
    });
  } catch (e) {
    res.json({
      sucess: false,
      error: e.message,
    });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const names = new Namestudent(req.body);
    await names.save();
    res.json({
      success: true,
      studentId: names._id,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.route("/:id").get((req, res) => {
  Namestudent.findById(req.params.id)
    .then((name) => res.json(name))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Namestudent.findByIdAndDelete(req.params.id)
    .then(() => res.json("Student data deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/", async function (req, res) {
  try {
    const edit = await Namestudent.findByIdAndUpdate(req.params.id);
    console.log(edit);
    res.json({
      success: true,
      studentId: edit._id,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.route("/update/:id").post((req, res) => {
  Namestudent.findById(req.params.id)
    .then((data) => {
      data.name = req.body.name;
      data.email = req.body.email;
      data.phone = req.body.phone;
      data.dob = req.body.dob;
      data.gender = req.body.gender;
      data.address = req.body.address;

      data
        .save()
        .then(() => res.json("student data updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
