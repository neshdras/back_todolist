const mongoose = require('mongoose')
const dbURI = process.env.MONGODB_URI

mongoose.connect(dbURI)
    .then(()=> console.log("Connexion à MongoDB réussie"))
    .catch(err => console.error("Erreur de connexion à MongoDB :", err))

    module.exports = mongoose.connection