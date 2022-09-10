const User = require("../models/User.model");
const Album = require("../models/album.model");

module.exports.profile = (req, res, next) => {
  Album.find({ user: req.user._id })
    .populate("bird")
    .then((albums) => {
      const result = albums.reduce((acc, curr) => {
        const birdName = curr.bird.name;
        const birdId = curr.bird.id;

        if (!acc[birdId]) {
          acc[birdId] = { url: curr.url, name: birdName };
        }

        return acc;
      }, {});

      const finalResult = Object.keys(result).map((id) => {
        return {
          id,
          name: result[id].name,
          url: result[id].url,
        };
      });

      res.render("users/profile", { albums });
    })
    .catch(next);
};

module.exports.album = (req, res, next) => {
  Album.find({ user: req.user._id, bird: req.params.birdId })
    .populate("bird")
    .then((albums) => {
      albums.push()
      console.log("*****************************************************************");
      console.log(albums)

      console.log("------------------------------------------------------------");
      res.render("albums/albumDetail", {albums});
    })
    .catch(next);
};
