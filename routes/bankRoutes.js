const  express = require('express');
const app= express();
const router=express.Router();
const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    Name: String
});
const Bank = mongoose.model('Bank', BankSchema);

router.get('/', (req, res) => {
    Bank.find({})
      .then(banks => {
        res.send(banks);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("An error occurred");
      });
  });





router.use(app);
module.exports = router;