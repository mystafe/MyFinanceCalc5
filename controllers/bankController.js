const { Bank, CreditCard, Deposit, Loan, Overdraft } = require("../db");

//Get All Banks
exports.getBanks = async (req, res) => {
  try {
    const banks = await (
      await Bank.find().populate("CreditCards Deposits Loans Overdrafts")
    ).map((bank) => {
      return {
        _id: bank._id,
        Name: bank.Name,
        CreditCards: bank.CreditCards,
        // CreditCardsName: bank.CreditCards.map((card) => card.CardName),
        Deposits: bank.Deposits,
        Loans: bank.Loans,
        Overdrafts: bank.Overdrafts,
      };
    });
    console.log(banks);

    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual Bank by Id
exports.getBankById = async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id);
    if (bank == null) {
      return res.status(404).json({ message: "Cannot find bank" });
    }
    res.json(bank);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual Bank by Name
exports.getBankByName = async (req, res) => {
  try {
    let bank = await Bank.findOne({ Name: req.params.name }).populate(
      "CreditCards Deposits Loans Overdrafts"
    );
    if (bank == null) {
      return res.status(404).json({ message: "Cannot find bank" });
    }
    bank = {
      _id: bank._id,
      Name: bank.Name,
      CreditCards: bank.CreditCards,
      Deposits: bank.Deposits,
      Loans: bank.Loans,
      Overdrafts: bank.Overdrafts,
    };

    res.json(bank);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Bank
exports.createBank = async (req, res) => {
  const bank = new Bank({
    Name: req.body.Name,
  });
  try {
    const newBank = await bank.save();
    res.status(201).json(newBank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update Bank By Id
exports.updateBankById = async (req, res) => {
  try {
    const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (bank == null) {
      return res.status(404).json({ message: "Cannot find bank" });
    }
    if (req.body.Name != null) {
      bank.Name = req.body.Name;
    }
    await bank.save();

    res.json({ message: "Bank is updated!", bank });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Bank
exports.deleteBank = async (req, res) => {
  try {
    await res.bank.remove();
    Deposit.deleteMany({ Bank: res.bank._id });
    Loan.deleteMany({ Bank: res.bank._id });
    CreditCard.deleteMany({ Bank: res.bank._id });
    Overdraft.deleteMany({ Bank: res.bank._id });
    res.json({ message: "Bank is deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
