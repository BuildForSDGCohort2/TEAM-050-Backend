const citizenActions = (Citizens) => {
  const citizens = async (req, res) => {
    const citizens = await Citizens.find({});
    res.status(200).json({ totalCitizens: citizens.length, citizens });
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
  const profile = async (req, res) => {
    res.json("citizen can view profile");
  };
  const logout = async (req, res) => {
    res.json("citizen can logout");
  };

  return {
    citizens,
    register,
    login,
    logout,
    profile,
  };
};

module.exports = citizenActions;
