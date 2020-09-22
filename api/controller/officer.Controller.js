const mongoose = require("mongoose");
const officerActions = (
  Officers,
  bcrypt,
  validationResult,
  jwt,
  mySecrete,
  Offenses,
  Citizens
) => {
  /**
   * @param       GET /api/v1/officer
   * @desc        displays all the registered officers
   * @access      private( only super officer can access)
   */
  const officers = async (req, res) => {
    try {
      const officers = await Officers.find({});
      res.status(200).json({
        msg: "Testing the route",
        totalOfficers: officers.length,
        officers: officers.map((officer) => {
          return {
            officer,
            request: {
              "view Officer": {
                type: "GET",
                url: `http://localhost:3000/api/v1/officer/profile/${officer._id}`,
                description:
                  "Click on the url to view all the detail about this officer",
              },
              "Add an Officer": {
                type: "POST",
                url: "http://localhost:3000/api/v1/officer/register",
                description:
                  "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
              },
              "Edit Officer profile": {
                type: "PATCH",
                url: `http://localhost:3000/api/v1/officer/edit/${officer._id}`,
                description:
                  "Officer profile can be edited and updated on the profile page. If you are using postman to, the request will be a post request",
              },
              Login: {
                type: "POST",
                url: "http://localhost:3000/api/v1/officer/login",
                description:
                  "Registered officers can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
              },
              "Remove an Officer": {
                type: "DELETE",
                url: `http://localhost:3000/api/v1/officer/delete/${officer._id}`,
                description:
                  "Registered citizens can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
              },
            },
          };
        }),
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       POST /api/v1/officer/register
   * @desc        Add an officer here
   * @access      private( Everyone can access)
   */
  const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, gender } = req.body;

      const user = await Officers.findOne({ email });

      if (user) return res.status(400).json(`${email} is already in use`);

      const officer = new Officers({
        // _id: mongoose.Types.ObjectId,
        name,
        email,
        password,
        gender,
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      officer.password = hash;

      await officer.save();

      res.status(201).json({
        msg: `${officer.name.first} ${officer.name.last} is successfully registered`,
        request: {
          Login: {
            type: "POST",
            url: "http://localhost:3000/api/v1/officer/login",
            description:
              "Registered officer can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
          },
        },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       POST /api/v1/officer/login
   * @desc        officer login route
   * @access      public( Everyone can access)
   */
  const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      if (!(email && password))
        return res.status(404).json("Please fill in your email and password");

      const user = await Officers.findOne({ email });

      if (!user)
        return res.status(401).json({
          msg: `Invalid Credentials`,
          request: {
            Register: {
              type: "POST",
              url: "http://localhost:3000/api/v1/officer/register",
              description:
                "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
            },
          },
        });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          msg: `Invalid Credentials`,
          request: {
            Register: {
              type: "POST",
              url: "http://localhost:3000/api/v1/officer/register",
              description:
                "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
            },
          },
        });
      }
      const payload = {
        user: user._id,
      };

      const token = jwt.sign(payload, mySecrete, { expiresIn: "1hr" });
      const heads = await res.setHeader("x-auth-header", token);

      res.status(200).json({
        msg: `Welcome back officer ${user.name.first}`,
        token,
        heads,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       DELETE /api/v1/officer/delete/:id
   * @desc        Affords officers to priviledge to exit the platform
   * @access      protected( only signed in officers and seniorOfficers can access this route)
   */
  const deltOfficer = async (req, res) => {
    const officer = await Officers.findByIdAndDelete(req.params.id);
    res.status(200).json({
      // msg: `${officer.name.first} ${officer.name.last} with the id ${officer._id} is successfully deleted from the database`,
      msg: "delted",
      request: {
        Register: {
          type: "POST",
          url: "http://localhost:3000/api/v1/officer/register",
          description:
            "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
        },
        Login: {
          type: "POST",
          url: "http://localhost:3000/api/v1/officer/login",
          description:
            "Registered officer can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
        },
      },
    });
  };

  /**
   * @param       GET /api/v1/officer/profile/:id
   * @desc        displays officers dashboard
   * @access      public( only signed in citizens can access)
   */
  const profile = async (req, res) => {
    try {
      const officer = await Officers.findOne({ _id: req.params.officerID });
      res.json(officer);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       PATCH /api/v1/officer/edit/:id
   * @desc        displays citizens dashboard
   * @access      public( only signed in citizens can access)
   */
  const update = async (req, res) => {
    try {
      const officer = await Officers.findOneAndUpdate(
        { _id: req.params.officerID },
        req.body
      );
      res.json(officer);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       POST /api/v1/citizen/logout
   * @desc        citizen can logout of the platform
   * @access      protected( only logged in citizen can access)
   */
  const logout = async (req, res) => {
    res.json("citizen can logout");
  };

  /**
   * @param       POST /api/v1/citizen/logout
   * @desc        citizen can logout of the platform
   * @access      protected( only logged in citizen can access)
   */
  const offense = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, citizenID } = req.body;

      //Check for valid id
      if (!mongoose.Types.ObjectId.isValid(citizenID))
        return res.status(404).json({
          msg: "Offense Can not be added, citizen does not exist",
        });

      const user = await Citizens.findOne({ _id: citizenID });
      console.log(user._id, citizenID);

      const offense = new Offenses({
        name,
        description,
        citizen: user._id,
      });

      await offense.save();

      console.log(user.offenses);

      res.json("Officer can add offenses");
    } catch (err) {
      res.status(500).json(err);
    }
  };

  return {
    deltOfficer,
    officers,
    register,
    login,
    logout,
    profile,
    update,
    offense,
  };
};

module.exports = officerActions;
