const  express = require('express');
const app= express();
const router=express.Router();

const {getLoans,getLoanById,getLoanByName,createLoan,updateLoanById,deleteLoan,getBankLoansfromLoan}=require('../controllers/loanController')

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
router.get('/:id', getLoans);

//Get Loan By Id
router.get('/bank/:id', getLoanById);

//Get Loan By Name
router.get('/name/:name', getLoanByName);

//Get Loan by BankId
router.get('/bank/:id', getBankLoansfromLoan);

//Create Loan
router.post('/', createLoan);

//Update Loan By Id Put
router.put('/:id',updateLoanById);

//Update Loan  By Id Patch
router.patch('/:id', updateLoanById);

//Delete Loan
router.delete('/:id',deleteLoan);


router.use(app);
module.exports = router;