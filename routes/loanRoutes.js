const express = require("express");
const app = express();
const router = express.Router();

const {
  getLoans,
  getLoanById,
  getLoanByBankName,
  createLoan,
  updateLoanById,
  deleteLoan,
  getBankLoansfromLoan,
} = require("../controllers/loanController");

//Get All Loans
router.get("/", getLoans);

//Get Individual Loan
router.get("/:id", getLoanById);

//Get Loan By Bank Name
router.get("/bankname/:name", getLoanByBankName);

//Get Loan by BankId

//Create Loan
router.post("/", createLoan);

//Update Loan By Id Put
router.put("/:id", updateLoanById);

//Update Loan  By Id Patch
router.patch("/:id", updateLoanById);

//Delete Loan
router.delete("/:id", deleteLoan);

router.use(app);
module.exports = router;
