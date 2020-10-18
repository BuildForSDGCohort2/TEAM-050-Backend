const validation = (check) => {
  const regForm = [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").isEmail(),
    check("phone").not().isEmpty(),
    check("placeOfBirth").not().isEmpty(),
    check("residentialAddress").not().isEmpty(),
    check("dateOfBirth").not().isEmpty(),
    check("nationality").not().isEmpty(),
    check("passportNum").not().isEmpty(),
    check("nationalIdentificationNumber").not().isEmpty(),
    check("password").isLength({ min: 5 }).custom((value, {req, loc, path}) => {
      if(value !== req.body.password1) {
        //throw error if passwords don't match
        throw new Error("Password do not match")
      } else {
        return value;
      }
    })
  ];

  const loginForm = [
    check("email").isEmail(),
    check("password").not().isEmpty(),
  ];
  return {
    regForm,
    loginForm,
  };
};

module.exports = validation;
