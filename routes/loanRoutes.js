const  express = require('express');
const app= express();
const router=express.Router();
const mongoose = require('mongoose');

//Models
const {Bank,CreditCard,Deposit,Loan,OverdraftAccount}=require('../db')


//Get All Loans
router.get('/', (req, res) => {
    Loan.find({}).populate('BankId','Name').select('LoanName LoanAmount MonthtlyPayment InterestRate TotalMonth CompletedMonth RemainingMonth TotalPayment TotalInterest EearlyPayment CurrentPayment CurrentInterestPercent TotalPaymentPercent PaymentDate').exec()
        .then(loans => {
            res.send(loans);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("An error occurred");
        });

});

//Get Individual Loan
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Loan.findById(id).populate('BankId','Name')
    .select('LoanName LoanAmount MonthtlyPayment InterestRate TotalMonth CompletedMonth RemainingMonth TotalPayment TotalInterest EearlyPayment CurrentPayment CurrentInterestPercent TotalPaymentPercent PaymentDate')
    .exec()
    .then(loan => {
        if (!loan) {
            return res.status(404).send();
        }
        res.send(loan);
        
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

//Get Loan By BankId
router.get('/bank/:id', (req, res) => {
    const id = req.params.id;
    Loan.find({BankId:id}).populate('BankId','Name')
    .select('LoanName LoanAmount MonthtlyPayment InterestRate TotalMonth CompletedMonth RemainingMonth TotalPayment TotalInterest EearlyPayment CurrentPayment CurrentInterestPercent TotalPaymentPercent PaymentDate')
    .exec()
    .then(loan => {
        if (!loan) {
            return res.status(404).send();
        }
        res.send(loan);
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

//Create Loan
router.post('/', (req, res) => {
    const loan = new Loan({
        BankId: req.body.BankId,
        LoanName: req.body.LoanName,
        LoanAmount: req.body.LoanAmount,
        MonthtlyPayment: req.body.MonthtlyPayment,
        InterestRate: req.body.InterestRate,
        TotalMonth: req.body.TotalMonth,
        CompletedMonth: req.body.CompletedMonth,
        RemainingMonth: req.body.RemainingMonth,
        TotalPayment: req.body.TotalPayment,
        TotalInterest: req.body.TotalInterest,
        EearlyPayment: req.body.EearlyPayment,
        CurrentPayment: req.body.CurrentPayment,
        CurrentInterestPercent: req.body.CurrentInterestPercent,
        TotalPaymentPercent: req.body.TotalPaymentPercent,
        PaymentDate: req.body.PaymentDate,
    });
    loan.save().then(() => {
        Bank.findByIdAndUpdate(loan.BankId, {
            $push: { Loans: loan._id }
        }).then(() => {
            res.send(loan);
        });
    }).catch(err => {
        res.status(400).send(err.message);
    });
});

//Update Loan Patch
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Loan.findById(id).then(loan => {
        if (!loan) {
            return res.status(404).send();
        }
        loan.BankId = req.body.BankId;
        loan.LoanName = req.body.LoanName;
        loan.LoanAmount = req.body.LoanAmount;
        loan.MonthtlyPayment = req.body.MonthtlyPayment;
        loan.InterestRate = req.body.InterestRate;
        loan.TotalMonth = req.body.TotalMonth;
        loan.CompletedMonth = req.body.CompletedMonth;
        loan.RemainingMonth = req.body.RemainingMonth;
        loan.TotalPayment = req.body.TotalPayment;
        loan.TotalInterest = req.body.TotalInterest;
        loan.EearlyPayment = req.body.EearlyPayment;
        loan.CurrentPayment = req.body.CurrentPayment;
        loan.CurrentInterestPercent = req.body.CurrentInterestPercent;
        loan.TotalPaymentPercent = req.body.TotalPaymentPercent;
        loan.PaymentDate = req.body.PaymentDate;
        loan.save().then(loan => {
            Bank.findByIdAndUpdate(loan.BankId, {
                $push: { Loans: req.body.BankId }, $pull: { Loans: loan._id }
            }).then(() => {
            res.send(loan);
        }).catch(err => {
            res.status(400).send(err.message);
            });
        });    
    });
});

//Delete Loan
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Loan.findByIdAndRemove(id).then(loan => {
        if (!loan) {
            return res.status(404).send();
        }
        Bank.findByIdAndUpdate(loan.BankId, {
            $pull: { Loans: loan._id }
        }).then(() => {
            res.send(loan);
        });
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

//Delete Loan By BankId
router.delete('/bank/:id', (req, res) => {
    const id = req.params.id;
    Loan.deleteMany({BankId:id}).then(loan => {
        if (!loan) {
            return res.status(404).send();
        }
        Bank.findByIdAndUpdate(id, {
            $pull: { Loans: loan._id }
        }).then(() => {
            res.send(loan);
        });
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

//Delete All Loans
router.delete('/', (req, res) => {
    Loan.deleteMany({}).then(loan => {
        if (!loan) {
            return res.status(404).send();
        }
        Bank.updateMany({}, {
            $pull: { Loans: loan._id }
        }).then(() => {
            res.send(loan);
        });
    }).catch(err => {
        res.status(500).send(err.message);
    });
});


router.use(app);
module.exports = router;