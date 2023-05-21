const {Bank,CreditCard,Deposit,Loan,Overdraft}=require('../db') 

//Get All Deposits
exports.getDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find().populate('BankId','Name')
        .select('DepositName DepositAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (deposits == null) {
            return res.status(404).json({message: 'Cannot find deposits'});
        }
        res.json(deposits);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual Deposit by Id
exports.getDepositById = async (req, res) => {
    try {
        const deposit = await Deposit.findById(req.params.id).populate('BankId','Name')
        .select('DepositName DepositAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (deposit == null) {
            return res.status(404).json({message: 'Cannot find deposit'});
        }
        res.json(deposit);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual Deposit by Name
exports.getDepositByName = async (req, res) => {
    try {
        const deposit = await Deposit.findOne({DepositName: req.params.name}).populate('BankId','Name')
        .select('DepositName DepositAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (deposit == null) {
            return res.status(404).json({message: 'Cannot find deposit'});
        }
        res.json(deposit);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Deposit by BankId
exports.getBankDepositsfromBank = async (req, res) => {
    try {
        const deposits = await Deposit.find({BankId: req.params.id}).populate('BankId','Name')
        .select('DepositName DepositAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (deposits == null) {
            return res.status(404).json({message: 'Cannot find deposits'});
        }
        res.json(deposits);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Create Deposit
exports.createDeposit = async (req, res) => {
    const deposit = new Deposit({
        DepositName: req.body.DepositName,
        DepositAmount: req.body.DepositAmount,
        RemainingAmount: req.body.RemainingAmount,
        TotalPayment: req.body.TotalPayment,
        MonthtlyPayment: req.body.MonthtlyPayment,
        BankId: req.body.BankId
    });
    try {
        const newDeposit = await deposit.save();
        Bank.DepositId.push(newDeposit);
        await Bank.save();
        res.status(201).json(newDeposit);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//Update Deposit By Id
exports.updateDepositById = async (req, res) => {
    try {
        const deposit = await Deposit.findById(req.params.id).populate('BankId','Name')
        .select('DepositName DepositAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (deposit == null) {
            return res.status(404).json({message: 'Cannot find deposit'});
        }
        if (req.body.DepositName != null) {
            deposit.DepositName = req.body.DepositName;
        }
        if (req.body.DepositAmount != null) {
            deposit.DepositAmount = req.body.DepositAmount;
        }
        if (req.body.RemainingAmount != null) {
            deposit.RemainingAmount = req.body.RemainingAmount;
        }
        if (req.body.TotalPayment != null) {
            deposit.TotalPayment = req.body.TotalPayment;
        }
        if (req.body.MonthtlyPayment != null) {
            deposit.MonthtlyPayment = req.body.MonthtlyPayment;
        }
        const updatedDeposit = await deposit.save();
        res.json(updatedDeposit);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


//delete Deposit
exports.deleteDeposit = async (req, res) => {
    try {
        const deposit = await Deposit.findById(req.params.id).populate('BankId','Name')
        .select('DepositName DepositAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (deposit == null) {
            return res.status(404).json({message: 'Cannot find deposit'});
        }
        await deposit.remove();
        Bank.DepositId.pull(deposit);
        await Bank.save();
        res.json({message: 'Deposit deleted'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}