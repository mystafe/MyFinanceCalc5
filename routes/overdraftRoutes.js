const  express = require('express');
const app= express();
const router=express.Router();
const mongoose = require('mongoose');


const Bank = mongoose.model('Bank');

const OverdraftAccountSchema = new mongoose.Schema({
    BankId:{ type: mongoose.Schema.Types.ObjectId, ref:'Bank'},
    TotalLimit: Number,
    RemainingLimit: Number,
    TotalDepth: Number,
});

const OverdraftAccount = mongoose.model('OverdraftAccount', OverdraftAccountSchema);

router.get('/', (req, res) => {
    OverdraftAccount.find({}).populate('BankId','Name').select('TotalLimit RemainingLimit TotalDepth').exec()
      .then(overdraftaccounts => {
        res.send(overdraftaccounts);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("An error occurred");
      });
  });





router.use(app);
module.exports = router;