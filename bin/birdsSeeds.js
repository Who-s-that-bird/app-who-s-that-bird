const mongoose = require("mongoose");
const Bird = require ("../models/Bird.model")
const BIRDS = require("../data/bird.json")

require("../config/db.config")

mongoose.connection.once("open", () => {
    mongoose.connection.db
    .dropDatabase()
    .then(()=>{
        console.log("DB dropped!")

        return Bird.create(BIRDS)
    })
    .then ((createdBirds) => {
        console.log("calling birds ...........................🌍🌎🌏")
        createdBirds.forEach((bird) => console.log(`${bird.name} was created...... 🦅🦅🦅!`)
        )
        return mongoose.connection.close()
    })
    .then(()=> {
        console.log("connection closed")
        process.exit(1)
    })
    .catch((err) => {
        console.error(err)
        process.exit(0)
    })
})