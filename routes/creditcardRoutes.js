const  express = require('express');
const app= express();
const router=express.Router();
const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema({
    BankId:{ type: mongoose.Schema.Types.ObjectId, ref:'Bank'},
    CardName: String,
    CreditLimit: Number,
    RemainingLimit: Number,
    TotalPayment: Number,
    MonthtlyPayment: Number
});

const CreditCard = mongoose.model('CreditCard', CreditCardSchema);

router.get('/', (req, res) => {
    CreditCard.find({})
      .then(creditcards => {
        res.send(creditcards);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("An error occurred");
      });
  });





router.use(app);
module.exports = router;