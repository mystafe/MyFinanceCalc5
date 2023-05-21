const {Bank,CreditCard,Deposit,Loan,Overdraft}=require('../db') 

//Get All Loans
exports.getLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('BankId','Name')
        .select('LoanName LoanAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (loans == null) {
            return res.status(404).json({message: 'Cannot find loans'});
        }
        res.json(loans);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual Loan by Id
exports.getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id).populate('BankId','Name')
        .select('LoanName LoanAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (loan == null) {
            return res.status(404).json({message: 'Cannot find loan'});
        }
        res.json(loan);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual Loan by Name
exports.getLoanByName = async (req, res) => {
    try {
        const loan = await Loan.findOne({LoanName: req.params.name}).populate('BankId','Name')
        .select('LoanName LoanAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (loan == null) {
            return res.status(404).json({message: 'Cannot find loan'});
        }
        res.json(loan);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Loan by BankId
exports.getBankLoansfromLoan = async (req, res) => {
    try {
        const loans = await Loan.find({BankId: req.params.id}).populate('BankId','Name')
        .select('LoanName LoanAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (loans == null) {
            return res.status(404).json({message: 'Cannot find loans'});
        }
        res.json(loans);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Create Loan
exports.createLoan = async (req, res) => {
    const loan = new Loan({
        LoanName: req.body.LoanName,
        LoanAmount: req.body.LoanAmount,
        RemainingAmount: req.body.RemainingAmount,
        TotalPayment: req.body.TotalPayment,
        MonthtlyPayment: req.body.MonthtlyPayment,
        BankId: req.body.BankId
    });
    try {
        const newLoan = await loan.save();
        Bank.loans.push(newLoan);
        await Bank.save();
        res.status(201).json(newLoan);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//Update Loan
exports.updateLoanById = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (loan == null) {
            return res.status(404).json({message: 'Cannot find loan'});
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
        res.status(400).json({message: error.message});
    }
}

//Delete Loan
exports.deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (loan == null) {
            return res.status(404).json({message: 'Cannot find loan'});
        }
        await loan.remove();
        Bank.loans.pull(loan);
        await Bank.save();
        res.json({message: 'Loan deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}