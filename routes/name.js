var express = require("express");
var router = express.Router();
const Name = require("../modules/name");

router.get("/", async function (req, res, next) {
  try {
     const names = await Name.find();
    res.json({
      sucess: "true",
      data : names
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
      sucess: true,
      studentId: names._id,
    });
  } catch (e) {
    res.json({
      sucess: false,
      error: e.message,
    });
  }
  // res.send('respond with a resource');
});

module.exports = router;
