const router = require("express").Router();
const Score = require("../scores.model");

router
  .route("/")
  .get((req, res) => {
    Score.find({}, (err, foundScores) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(foundScores);
      }
    });
  })
  .post((req, res) => {
    const newScore = new Score({
      name: req.body.name,
      scoreValues: req.body.scoreValues,
    });
    newScore.save((err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send("User with scores succesfully added");
      }
    });
  })
  .patch((req, res) => {
    Score.findOneAndUpdate(
      { name: req.body.name },
      { $push: { scoreValues: req.body.scoreCurrent } },
      (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send("Scores successfully updated");
        }
      }
    );
  });
// for stats page get indiviual user data
router.post("/stats", (req, res) => {
  console.log(req.body);
  Score.findOne({ name: req.body.name }, (err, foundUser) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(foundUser);
    }
  });
});
module.exports = router;
