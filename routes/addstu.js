var express = require("express");
var router = express.Router();
const Name = require("../modules/addstu");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const names = await Name.find();
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
    const names = new Name(req.body);
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

router.route('/:id').get((req, res) => {
 const name = Name.findById(req.params.id)
    .then(name => res.json(name))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Name.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put("/", async function (req, res) {
  try {
    const edit = await Name.findByIdAndUpdate(req.params.id);
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
  Name.findById(req.params.id)
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
