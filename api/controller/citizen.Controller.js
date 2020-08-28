const citizenActions = (Citizens) => {
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
              url: `http://localhost:3000/api/v1/citizen/del/${citizen._id}`,
              description:
                "Registered citizens can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
            },
          },
        };
      }),
    });
  };
  const register = async (req, res) => {
    try {
      const {
        name,
        email,
        POB,
        nationality,
        passport,
        fingerPrint,
        periodOfResidence,
        age,
        passportPages,
      } = req.body;

      const citizen = new Citizens({
        name,
        email,
        passport,
        nationality,
        POB,
        periodOfResidence,
        fingerPrint,
        age,
        passportPages,
      });

      await citizen.save();

      res.json(citizen);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  const login = async (req, res) => {
    res.json("citizen can login");
  };

  const deltCitizen = async (req, res) => {
    const citizen = await Citizens.findByIdAndDelete(req.params.id);
    res.status().json({
      msg: `${citizen.name} with the id ${citizen._id} is successfully deleted from the database`,
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
  const profile = async (req, res) => {
    res.json("citizen can view profile");
  };
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

module.exports = citizenActions;
