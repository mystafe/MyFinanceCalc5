const { Bank, CreditCard, Deposit, Loan, Overdraft } = require("../db");

//Get All Loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate("BankId", "Name");
    if (loans == null) {
      return res.status(404).json({ message: "Cannot find loans" });
    }
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual Loan by Id
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate("BankId", "Name");
    if (loan == null) {
      return res.status(404).json({ message: "Cannot find loan" });
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual Loan by Bank Name
exports.getLoanByBankName = async (req, res) => {
  console.log(req.params.name);
  if (req.params.name == null) {
    return res.status(404).json({ message: "Name cannot be null" });
  }
  try {
    const bank = await Bank.findOne({ Name: req.params.name }).populate(
      "Loans"
    );
    if (bank == null) {
      return res.status(404).json({ message: "Cannot find bank" });
    }
    res.json(bank.Loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Loan by BankId
exports.getBankLoansfromLoan = async (req, res) => {
  try {
    const loans = await Loan.find({ BankId: req.params.id }).populate(
      "BankId",
      "Name"
    );
    if (loans == null) {
      return res.status(404).json({ message: "Cannot find loans" });
    }
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Loan
exports.createLoan = async (req, res) => {
  const loan = new Loan({
    LoanName: req.body.LoanName,
    LoanAmount: req.body.LoanAmount,
    RemainingAmount: req.body.RemainingAmount,
    TotalPayment: req.body.TotalPayment,
    MonthtlyPayment: req.body.MonthtlyPayment,
    BankId: req.body.BankId,
  });
  try {
    const newLoan = await loan.save();
    Bank.findByIdAndUpdate(newLoan.BankId, {
      $push: { Loans: newLoan._id },
    });
    // const bank = Bank.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update Loan
exports.updateLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (loan == null) {
      return res.status(404).json({ message: "Cannot find loan" });
    }
    if (req.body.LoanName != null) {
      loan.LoanName = req.body.LoanName;
    }
    if (req.body.LoanAmount != null) {
      loan.LoanAmount = req.body.LoanAmount;
    }
    if (req.body.RemainingAmount != null) {
      loan.RemainingAmount = req.body.RemainingAmount;
    }
    if (req.body.TotalPayment != null) {
      loan.TotalPayment = req.body.TotalPayment;
    }
    if (req.body.MonthtlyPayment != null) {
      loan.MonthtlyPayment = req.body.MonthtlyPayment;
    }
    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete Loan
exports.deleteLoan = async (req, res) => {
  if (req.params.id == null) {
    return res.status(404).json({ message: "Id cannot be null" });
  }
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (loan == null) {
      return res.status(404).json({ message: "Cannot find loan" });
    }
    if (loan.BankId == null) {
      return res.status(404).json({ message: "Cannot find bank" });
    }
    Bank.findByIdAndUpdate(loan.BankId, {
      $pull: { Loans: loan._id },
    });

    loan.save();

    res.json({ message: "Loan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
