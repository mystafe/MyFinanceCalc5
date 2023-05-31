const { Bank, CreditCard, Deposit, Loan, Overdraft } = require("../db");

//Get All Deposits
exports.getDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find().populate("BankId", "Name");
    if (deposits == null) {
      return res.status(404).json({ message: "Cannot find deposits" });
    }
    res.json(deposits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual Deposit by Id
exports.getDepositById = async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id)
      .populate("BankId", "Name")
      .select("DepositAmount")
      .exec();
    if (deposit == null) {
      return res.status(404).json({ message: "Cannot find deposit" });
    }
    res.json(deposit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual Deposit by Name
exports.getDepositByName = async (req, res) => {
  try {
    const deposit = await Deposit.findOne({ DepositName: req.params.name })
      .populate("BankId", "Name")
      .select("DepositAmount")
      .exec();
    if (deposit == null) {
      return res.status(404).json({ message: "Cannot find deposit" });
    }
    res.json(deposit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Deposit by BankId
exports.getBankDepositsfromBank = async (req, res) => {
  try {
    const deposits = await Deposit.find({ BankId: req.params.id })
      .populate("BankId", "Name")
      .select("DepositAmount")
      .exec();
    if (deposits == null) {
      return res.status(404).json({ message: "Cannot find deposits" });
    }
    res.json(deposits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Deposit
exports.createDeposit = async (req, res) => {
  const deposit = new Deposit({
    DepositName: req.body.DepositName,
    DepositAmount: req.body.DepositAmount,
    BankId: req.body.BankId,
  });
  if (deposit.DepositName == null) {
    return res.status(400).json({ message: "DepositName is null" });
  }
  if (deposit.DepositAmount == null) {
    return res.status(400).json({ message: "DepositAmount is null" });
  }
  if (deposit.BankId == null) {
    return res.status(400).json({ message: "BankId is null" });
  }
  try {
    Deposit.create(deposit);
    deposit.save();
    res.status(201).json({ message: "Deposit is created", deposit: deposit });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//check this out
//Update Deposit By Id
exports.updateDepositById = async (req, res) => {
  if (req.params.id == null) {
    return res.status(400).json({ message: "Id is null" });
  }

  try {
    const deposit = await Deposit.findById(req.params.id);
    if (deposit == null) {
      return res.status(404).json({ message: "Cannot find deposit" });
    }
    if (req.body.DepositAmount == null) {
      return res.status(400).json({ message: "DepositAmount is null" });
    }
    if (req.body.DepositName == null) {
      return res.status(400).json({ message: "DepositName is null" });
    }
    deposit.DepositAmount = req.body.DepositAmount;
    deposit.DepositName = req.body.DepositName;

    await deposit.save();
    res.json({ message: "Deposit is updated", deposit });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete Deposit
exports.deleteDeposit = async (req, res) => {
  if (req.params.id == null) {
    return res.status(400).json({ message: "Id is null" });
  }

  try {
    const deposit = await Deposit.findByIdAndDelete(req.params.id);
    if (deposit == null) {
      return res.status(404).json({ message: "Cannot find deposit" });
    }
    res.json({ message: "Deposit is deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
