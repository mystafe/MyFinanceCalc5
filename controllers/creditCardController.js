const {Bank,CreditCard,Deposit,Loan,Overdraft}=require('../db') 

//Get All CreditCards
exports.getCreditCards = async (req, res) => {
    try {
        const creditcards = await CreditCard.find().populate('BankId','Name')
        .select('CardName CreditLimit RemainingLimit TotalPayment MonthtlyPayment')
        .exec();
        if (creditcards == null) {
            return res.status(404).json({message: 'Cannot find creditcards'});
        }
        res.json(creditcards);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual CreditCard by Id
exports.getCreditCardById = async (req, res) => {
    try {
        const creditcard = await CreditCard.findById(req.params.id).populate('BankId','Name')
        .select('CardName CreditLimit RemainingLimit TotalPayment MonthtlyPayment')
        .exec();
        if (creditcard == null) {
            return res.status(404).json({message: 'Cannot find creditcard'});
        }
        res.json(creditcard);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual CreditCard by Name
exports.getCreditCardByName = async (req, res) => {
    try {
        const creditcard = await CreditCard.findOne({CardName: req.params.name}).populate('BankId','Name')
        .select('CardName CreditLimit RemainingLimit TotalPayment MonthtlyPayment')
        .exec();
        if (creditcard == null) {
            return res.status(404).json({message: 'Cannot find creditcard'});
        }
        res.json(creditcard);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get CreditCard by BankId
exports.getBankCreditCardsfromCard = async (req, res) => {
    try {
        const creditcards = await CreditCard.find({BankId: req.params.id}).populate('BankId','Name')
        .select('CardName CreditLimit RemainingLimit TotalPayment MonthtlyPayment')
        .exec();
        if (creditcards == null) {
            return res.status(404).json({message: 'Cannot find creditcards'});
        }
        res.json(creditcards);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Create CreditCard
exports.createCreditCard = async (req, res) => {
    const creditcard = new CreditCard({
        BankId: req.body.BankId,
        CardName: req.body.CardName,
        CreditLimit: req.body.CreditLimit,
        RemainingLimit: req.body.RemainingLimit,
        TotalPayment: req.body.TotalPayment,
        MonthtlyPayment: req.body.MonthtlyPayment
    });
    try {
        const newCreditCard = await creditcard.save();
        res.status(201).json(newCreditCard);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//Update CreditCard Patch
exports.updateCreditCardPatch = async (req, res) => {
    if (req.body.CardName != null) {
        res.creditcard.CardName = req.body.CardName;
    }
    if (req.body.CreditLimit != null) {
        res.creditcard.CreditLimit = req.body.CreditLimit;
    }
    if (req.body.RemainingLimit != null) {
        res.creditcard.RemainingLimit = req.body.RemainingLimit;
    }
    if (req.body.TotalPayment != null) {
        res.creditcard.TotalPayment = req.body.TotalPayment;
    }
    if (req.body.MonthtlyPayment != null) {
        res.creditcard.MonthtlyPayment = req.body.MonthtlyPayment;
    }
    try {
        const updatedCreditCard = await res.creditcard.save();
        res.json(updatedCreditCard);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//Update CreditCard Put
exports.updateCreditCardPut = async (req, res) => {
    if (req.body.CardName != null) {
        res.creditcard.CardName = req.body.CardName;
    }
    if (req.body.CreditLimit != null) {
        res.creditcard.CreditLimit = req.body.CreditLimit;
    }
    if (req.body.RemainingLimit != null) {
        res.creditcard.RemainingLimit = req.body.RemainingLimit;
    }
    if (req.body.TotalPayment != null) {
        res.creditcard.TotalPayment = req.body.TotalPayment;
    }
    if (req.body.MonthtlyPayment != null) {
        res.creditcard.MonthtlyPayment = req.body.MonthtlyPayment;
    }
    try {
        const updatedCreditCard = await res.creditcard.save();
        res.json(updatedCreditCard);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//Delete CreditCard By Id
exports.deleteCreditCard = async (req, res) =>  {
    CreditCard.findByIdAndRemove(req.params.id)
    .then(creditcard => {
        if(!creditcard) {
            return res.status(404).send({
                message: "CreditCard not found with id " + req.params.id
            });
        }
        Bank.findByIdAndUpdate(creditcard.BankId, {
            $pull: { CreditCards: creditcard._id }
        })
        .then(() => {
            res.send({message: "CreditCard deleted successfully!"});
        }
        )   
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the CreditCard."
            });
        }
        );
    });
}