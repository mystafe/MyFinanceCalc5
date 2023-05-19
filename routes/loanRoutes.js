const  express = require('express');
const app= express();
const router=express.Router();
const mongoose = require('mongoose');


const LoanSchema = new mongoose.Schema({
    BankId:{ type: mongoose.Schema.Types.ObjectId, ref:'Bank'},
    LoanName: String,
    LoanAmount: Number,
    MonthtlyPayment: Number,
    InterestRate: Number,
    TotalMonth: Number,
    CompletedMonth: Number,
    RemainingMonth: Number,
    TotalPayment: Number,
    TotalInterest: Number,
    EearlyPayment: Number,
    CurrentPayment: Number,
    CurrentInterestPercent: Number,
    TotalPaymentPercent: Number,
    PaymentDate: Date,
});

const Loan = mongoose.model('Loan', LoanSchema);


router.get('/', (req, res) => {
    Loan.find({})
        .then(loans => {
            res.send(loans);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("An error occurred");

        });
});


router.use(app);
module.exports = router;