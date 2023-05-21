const {Bank,CreditCard,Deposit,Loan,Overdraft}=require('../db') 

//Get All Overdrafts
exports.getOverdrafts = async (req, res) => {
    try {
        const overdrafts = await Overdraft.find().populate('BankId','Name')
        .select('OverdraftName OverdraftAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (overdrafts == null) {
            return res.status(404).json({message: 'Cannot find overdrafts'});
        }
        res.json(overdrafts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual Overdraft by Id
exports.getOverdraftById = async (req, res) => {
    try {
        const overdraft = await Overdraft.findById(req.params.id).populate('BankId','Name')
        .select('OverdraftName OverdraftAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (overdraft == null) {
            return res.status(404).json({message: 'Cannot find overdraft'});
        }
        res.json(overdraft);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual Overdraft by Name
exports.getOverdraftByName = async (req, res) => {
    try {
        const overdraft = await Overdraft.findOne({OverdraftName: req.params.name}).populate('BankId','Name')
        .select('OverdraftName OverdraftAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (overdraft == null) {
            return res.status(404).json({message: 'Cannot find overdraft'});
        }
        res.json(overdraft);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Overdraft by BankId
exports.getBankOverdraftsfromOverdraft = async (req, res) => {
    try {
        const overdrafts = await Overdraft.find({BankId: req.params.id}).populate('BankId','Name')
        .select('OverdraftName OverdraftAmount RemainingAmount TotalPayment MonthtlyPayment')
        .exec();
        if (overdrafts == null) {
            return res.status(404).json({message: 'Cannot find overdrafts'});
        }
        res.json(overdrafts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Create Overdraft
exports.createOverdraft = async (req, res) => {
    const overdraft = new Overdraft({
        OverdraftName: req.body.OverdraftName,
        OverdraftAmount: req.body.OverdraftAmount,
        RemainingAmount: req.body.RemainingAmount,
        TotalPayment: req.body.TotalPayment,
        MonthtlyPayment: req.body.MonthtlyPayment,
        BankId: req.body.BankId
    });
    try {
        const newOverdraft = await overdraft.save();
        Bank.overdrafts.push(newOverdraft);
        await Bank.save();
        res.status(201).json(newOverdraft);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//Update Overdraft
exports.updateOverdraftById = async (req, res) => {
    try {
        const overdraft = await Overdraft.findById(req.params.id);
        if (req.body.OverdraftName) {
            overdraft.OverdraftName = req.body.OverdraftName;
        }
        if (req.body.OverdraftAmount) {
            overdraft.OverdraftAmount = req.body.OverdraftAmount;
        }
        if (req.body.RemainingAmount) {
            overdraft.RemainingAmount = req.body.RemainingAmount;
        }
        if (req.body.TotalPayment) {
            overdraft.TotalPayment = req.body.TotalPayment;
        }
        if (req.body.MonthtlyPayment) {
            overdraft.MonthtlyPayment = req.body.MonthtlyPayment;
        }
        const updatedOverdraft = await overdraft.save();
        res.json(updatedOverdraft);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//Delete Overdraft
exports.deleteOverdraft = async (req, res) => {
    try {
        const overdraft = await Overdraft.findById(req.params.id);
        await overdraft.remove();
        Bank.overdrafts.pull(overdraft);
        await Bank.save();
        res.json({message: 'Overdraft deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}