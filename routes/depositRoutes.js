const  express = require('express');
const app= express();
const router=express.Router();
const mongoose = require('mongoose');

const {Bank,CreditCard,Deposit,Loan,OverdraftAccount}=require('../db')


//Get All Deposits
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

//Get Individual Deposit
router.get('/:id', (req, res) => {
const id = req.params.id;
Deposit.findById(id).then(deposit => {
    if (!deposit) {
        return res.status(404).send();
    }
    res.send(deposit);
}).catch(err => {
    console.log(err);
    res.status(500).send();
});

});

//Create Deposit
router.post('/', (req, res) => {
const deposit = new Deposit({
  BankId: req.body.BankId,
  DepositAmount: req.body.DepositAmount,
});
deposit
  .save()
  .then(deposit => {
    return Deposit.populate(deposit, { path: 'BankId' });
  })
  .then(deposit => {
    Bank.findByIdAndUpdate(deposit.BankId._id, {
      $push: { Deposits: deposit._id }
    }).then(() => {
      res.send(deposit);
    });
  })
  .catch(err => {
    res.status(400).send(err.message);
  });
});

//Update Deposit Put
router.put('/:id', (req, res) => {
const id = req.params.id;
const updatedDeposit = {
    DepositAmount: req.body.DepositAmount,
};
if (!ObjectID.isValid(id)) {
    return res.status(404).send();
} else {
    Deposit.findByIdAndUpdate(id, { $set: updatedDeposit }, { new: true })
        .then(updatedDeposit => {
            if (!updatedDeposit) {
                return res.status(404).send();
            }
            res.send(updatedDeposit);
        })
        .catch(err => {
            res.status(400).send(err.message);
        });
}
});

//Delete Deposit
router.delete('/:id', (req, res) => {
const id = req.params.id;
if (!ObjectID.isValid(id)) {
    return res.status(404).send();
}
Deposit.findByIdAndRemove(id)
    .then(deposit => {
        if (!deposit) {
            return res.status(404).send();
        }
      Bank.findByIdAndUpdate(deposit.BankId, {
        $pull: { Deposits: deposit._id }
      }).then(() => {
        res.send(deposit);
      });
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

//Get Deposit by BankId
router.get('/bank/:id', (req, res) => {
const id = req.params.id;
Deposit.find({ BankId: id })
    .then(deposit => {
        if (!deposit) {
            return res.status(404).send();
        }
        res.send(deposit);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send();
    });
});



router.use(app);
module.exports = router;