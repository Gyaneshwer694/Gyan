const mongoose = require("mongoose");

//================================================================valid-name==================================================
const validName = function (name) {
  const regexName = /^[a-zA-Z ]+$/;
  return regexName.test(name);
};
//=========================================================user -validation ====================================================
let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let validMobile = /^[0]?[6789]\d{9}$/;

let validPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

let validname = /[0-9]+/;

//=========================================================Validations :  Title===================================================
const validTitle = (Title) => {
  let correctTitle = ["Mr", "Mrs", "Miss"];
  if (correctTitle.includes(Title)) {
    return false;
  } else {
    return true;
  }
};

//=====================================================Validations :  ObjectId==================================================
const ValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

//================================================================Number========================================================
function IsNumeric(input) {
  var RE = /^-{0,1}\d*\.{0,1}\d+$/;
  return RE.test(input);
}

module.exports = {
  validName,
  validname,
  validEmail,
  validMobile,
  validPass,
  validTitle,
  ValidObjectId,
  IsNumeric,
};
