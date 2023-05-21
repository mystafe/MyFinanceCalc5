const  express = require('express');
const app= express();
const router=express.Router();

const {Bank,CreditCard,Deposit,Loan,Overdraft}=require('../db')

//Get All OverdraftAccounts
router.get('/', (req, res) => {
  Overdraft.find({}).populate('BankId','Name').select('TotalLimit RemainingLimit TotalDepth').exec()
      .then(overdrafts => {
        res.send(overdrafts);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("An error occurred");
      });
  });

//Get Individual OverdraftAccount
router.get('/:id', (req, res) => {
const id = req.params.id;
Overdraft.findById(id).then(overdraft => {
    if (!overdraft) {
        return res.status(404).send();
    }
    res.send(overdraft);
}).catch(err => {
    console.log(err);
    res.status(500).send();
});
});

//Create Overdraft
router.post('/', (req, res) => {
const overdraft = new Overdraft({
  BankId: req.body.BankId,
  TotalLimit: req.body.TotalLimit,
  RemainingLimit: req.body.RemainingLimit,
  TotalDepth: req.body.TotalDepth,
});
overdraft
  .save()
  .then((overdraft) => {
    Bank.findByIdAndUpdate(overdraft.BankId, {
      $push: { Overdrafts: overdraft._id },
    })
      .then(() => {
        res.send(overdraft);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  })
  .catch((err) => {
    res.status(400).send(err.message);
  });
});


//Update Overdraft Patch
router.patch('/:id', (req, res) => {
const id = req.params.id;
if (!ObjectID.isValid(id)) {
    return res.status(404).send();
}
Overdraft.findByIdAndUpdate(id)
    .then(overdraft => {
        if (!overdraft) {
            return res.status(404).send();
        }
        overdraft.TotalLimit = req.body.TotalLimit;
        overdraft.RemainingLimit = req.body.RemainingLimit;
        overdraft.TotalDepth = req.body.TotalDepth;
        overdraft.save().then(overdraft => {
            res.send(overdraft);
        }).catch(err => {
          return res.status(400).send(err.message);
        });
    }).catch(err => {
        res.status(400).send(err.message);
    });
});

//Delete OverdraftAccount By Id
router.delete('/:id', (req, res) => {
const id = req.params.id;
OverdraftAccount.findByIdAndRemove(id)
    .then(overdraftaccount => {
        if (!overdraftaccount) {
            return res.status(404).send();
        }
        Bank.findByIdAndUpdate(overdraftaccount.BankId, {
            $pull: { Overdrafts: overdraftaccount._id }
        }).then(() => {
        res.send(overdraftaccount);
    }).catch(err => {
        res.status(400).send(err.message);
    });
});
});

//Get OverdraftAccount By BankId
router.get('/bank/:id', (req, res) => {
const id = req.params.id;
Overdraft.find({ BankId: id }).populate('BankId','Name').select('TotalLimit RemainingLimit TotalDepth').exec()
    .then(overdrafts => {
        res.send(overdrafts);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send("An error occurred");
    });
});




router.use(app)
module.exports = router;
