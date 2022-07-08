const mongoose = require('mongoose')

const Planet = mongoose.model('Planet', {
    name: String,
    orderFromSun: Number,
    hasRings: Boolean,
    mainAtmosphere: [String],
    surfaceTemperatureC: { min: Number, max: Number, mean: Number}
})

module.exports = Planet;