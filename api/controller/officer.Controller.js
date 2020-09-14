const officerActions = (Officer, bcrypt, mySecrete, jwt, validationResult) => {
    /**
     * @param       GET /api/v1/citizen
     * @desc        displays all the registered citizens on the platform
     * @access      public( Every one can access)
     */
    const citizens = async (req, res) => {
      const citizens = await Citizens.find({});
      res.status(200).json({
        totalCitizens: citizens.length,
        citizens: citizens.map((citizen) => {
          return {
            citizen,
            request: {
              "view Citizen": {
                type: "GET",
                url: `http://localhost:3000/api/v1/citizen/profile/${citizen._id}`,
                description:
                  "Click on the url to view all the detail about this citizen",
              },
              "Register New Citizen": {
                type: "POST",
                url: "http://localhost:3000/api/v1/citizen/register",
                description:
                  "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
              },
              Login: {
                type: "POST",
                url: "http://localhost:3000/api/v1/citizen/login",
                description:
                  "Registered citizens can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
              },
              "Delete citizen": {
                type: "DELETE",
                url: `http://localhost:3000/api/v1/citizen/delete/${citizen._id}`,
                description:
                  "Registered citizens can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
              },
            },
          };
        }),
      });
    };
  
    /**
     * @param       POST /api/v1/citizen/register
     * @desc        route to register a citizen
     * @access      public( Every one can access)
     */
    const register = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const {
          name,
          email,
          password,
          // POB,
          nationality,
          passport,
          fingerPrint,
          periodOfResidence,
          age,
          passportPages,
        } = req.body;
  
        const user = await Citizens.findOne({ email });
  
        if (user) return res.status(400).json(`${email} is already in use`);
  
        const citizen = new Citizens({
          name,
          email,
          password,
          passport,
          nationality,
          periodOfResidence,
        });
  
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        citizen.password = hash;
  
        await citizen.save();
  
        res.status(201).json({
          msg: `${citizen.name.first} ${citizen.name.last} is successfully registered`,
          request: {
            Login: {
              type: "POST",
              url: "http://localhost:3000/api/v1/citizen/login",
              description:
                "Registered citizens can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
            },
          },
        });
      } catch (err) {
        res.status(500).json(err);
      }
    };
  
    /**
     * @param       POST /api/v1/citizen/login
     * @desc        route for citizens to signin on the platform
     * @access      public( Every one can access)
     */
    const login = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { email, password } = req.body;
  
        const user = await Citizens.findOne({ email });
  
        if (!user)
          return res.status(401).json({
            msg: `Invalid Credentials`,
            request: {
              Register: {
                type: "POST",
                url: "http://localhost:3000/api/v1/citizen/register",
                description:
                  "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
              },
            },
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
  
        if (!isMatch)
          return res.status(401).json({
            msg: `Invalid Credentials`,
            request: {
              Register: {
                type: "POST",
                url: "http://localhost:3000/api/v1/citizen/register",
                description:
                  "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
              },
            },
          });
  
        const payload = {
          user: user._id,
        };
        const token = jwt.sign(payload, mySecrete, { expiresIn: "1hr" });
        const heads = await res.setHeader("x-auth-header", token);
  
        res.json({
          token,
          heads,
        });
      } catch (err) {
        res.status(500).json(err);
      }
    };
  
    /**
     * @param       DELETE /api/v1/citizen/delete/:id
     * @desc        gives citizen the ability to delete their account from the platform
     * @access      protected( only signed in citizens and admin can access this route)
     */
    const deltCitizen = async (req, res) => {
      const citizen = await Citizens.findByIdAndDelete(req.params.id);
      res.status(200).json({
        msg: `${citizen.name.first} ${citizen.name.last} with the id ${citizen._id} is successfully deleted from the database`,
        request: {
          Register: {
            type: "POST",
            url: "http://localhost:3000/api/v1/citizen/register",
            description:
              "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
          },
          Login: {
            type: "POST",
            url: "http://localhost:3000/api/v1/citizen/login",
            description:
              "Registered citizens can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
          },
        },
      });
    };
  
    /**
     * @param       GET /api/v1/citizen/profile/:id
     * @desc        displays citizens dashboard
     * @access      public( only signed in citizens can access)
     */
    const profile = async (req, res) => {
      res.json("citizen can view profile");
    };
  
    /**
     * @param       POST /api/v1/citizen/logout
     * @desc        citizen can logout of the platform
     * @access      protected( only logged in citizen can access)
     */
    const logout = async (req, res) => {
      res.json("citizen can logout");
    };
  
    return {
      deltCitizen,
      citizens,
      register,
      login,
      logout,
      profile,
    };
  };
  
  module.exports = officerActions;
  