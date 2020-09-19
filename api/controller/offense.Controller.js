const Offenses = require("./../model/offense.model")
module.exports.offenses = async (req, res) => {
    const offense = await Offenses.find({}).populate('citizen')
    res.json(offense)
}

module.exports.offense = async (req, res) => {
    const offense = await Offenses.findById(req.params.id)
    res.json(offense)
}