const  express = require('express');
const app= express();
const router=express.Router();
const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
    BankId:{ type: mongoose.Schema.Types.ObjectId, ref:'Bank'},
    DepositAmount: Number, 
});

const Deposit = mongoose.model('Deposit', DepositSchema);

router.get('/', (req, res) => {
    Deposit.find({})
      .then(deposits => {
        res.send(deposits);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("An error occurred");
      });
  });





router.use(app);
module.exports = router;