const express = require("express");
const Citizens = require("./../model/citizen.model");
const bcrypt = require('bcrypt')
const {
  register,
  login,
  logout,
  profile,
  citizens,
  deltCitizen
} = require("./../controller/citizen.Controller")(Citizens, bcrypt);


const { Router } = express;

const citizenRouter = Router();

citizenRouter.route("/register").post(register);
citizenRouter.route("/login").post(login);
citizenRouter.route("/logout").post(logout);
citizenRouter.route("/").get(citizens);
citizenRouter.route("/profile/:id").get(profile);
citizenRouter.route('/delete/:id').delete(deltCitizen)

module.exports = citizenRouter;
