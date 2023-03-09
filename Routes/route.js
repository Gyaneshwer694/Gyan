const express = require("express");
const router = express.Router();
const { creatUser, loginUser, getUser, updateUser } = require("../controller/usercontroller");
 const { authentication, authorization } = require("../Middleware/Auth");

//=====================================================User========================================================================
router.post("/register", creatUser);

router.post("/login", loginUser);

router.get("/Users",authentication,getUser)

router.put("/Users/:UserId",updateUser)

router.all("/*", function (req, res) {
  res
    .status(404) 
    .send({ status: false, msg: "Wrong api please try different" });
});

module.exports = router;
