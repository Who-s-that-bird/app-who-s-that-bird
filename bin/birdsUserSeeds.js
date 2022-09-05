require("dotenv").config();
const mongoose = require("mongoose");
const Bird = require("../models/Bird.model")
const BIRD = require("../data/bird.json")
const Album = require("../models/album.model")
const ALBUM = require("../data/carrousel.json")

require("../config/db.config")

mongoose.connection.once("open", () => {
    mongoose.connection.db
    .dropDatabase()
    .then(()=>{
        console.log("DB dropped!")

        const seedsPromises = [Bird.create(BIRD), Album.create(ALBUM)];
        console.log(seedsPromises)
        

        return seedsPromises
    })
    .then ((createdSeeds) => {
        console.log("calling birds and albums ...........................🌍🌎🌏")
        createdSeeds.forEach((x) => console.log(`${x.name}  ${x.user._id} was created...... 🦅🦅🦅!`)
        
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