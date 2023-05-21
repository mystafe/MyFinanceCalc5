const {Bank,CreditCard,Deposit,Loan,Overdraft}=require('../db')

//Get All Banks
exports.getBanks = async (req, res) => {
    try {
        const banks = await Bank.find();
        res.json(banks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Get Individual Bank by Id
exports.getBankById = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);
        if (bank == null) {
            return res.status(404).json({message: 'Cannot find bank'});
        }
        res.json(bank);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Individual Bank by Name
exports.getBankByName = async (req, res) => {
    try {
        const bank = await Bank.findOne({Name: req.params.name});
        if (bank == null) {
            return res.status(404).json({message: 'Cannot find bank'});
        }
        res.json(bank);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Create Bank
exports.createBank = async (req, res) => {
    const bank = new Bank({
        Name: req.body.Name
    });
    try {
        const newBank = await bank.save();
        res.status(201).json(newBank);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


//Update Bank By Id
exports.updateBankById = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);
        if (bank == null) {
            return res.status(404).json({message: 'Cannot find bank'});
        }
        if (req.body.Name != null) {
            bank.Name = req.body.Name;
        }
        const updatedBank = await bank.save();
        res.json(updatedBank);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


//Delete Bank
exports.deleteBank = async (req, res) => {
    try {
        await res.bank.remove();
        Deposit.deleteMany({Bank: res.bank._id});
        Loan.deleteMany({Bank: res.bank._id});
        CreditCard.deleteMany({Bank: res.bank._id});
        Overdraft.deleteMany({Bank: res.bank._id});
        res.json({message: 'Deleted Bank'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get Bank Credit Cards
exports.getBankCreditCardsFromBank = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);
        if (bank == null) {
            return res.status(404).json({message: 'Cannot find bank'});
        }
        const creditcards = await CreditCard.find({Bank: req.params.id});
        res.json(creditcards);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}