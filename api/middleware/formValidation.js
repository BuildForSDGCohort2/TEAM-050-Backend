const validation = (body) => {
  const regForm = [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ];

  const loginForm = [
    body("email").isEmail(),
    body("password").not().notEmpty(),
  ];
  return {
    regForm,
    loginForm,
  };
};

module.exports = validation;
