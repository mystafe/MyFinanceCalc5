const { Bank, CreditCard, Deposit, Loan, Overdraft } = require("../db");

//Get All Overdrafts
exports.getOverdrafts = async (req, res) => {
  try {
    const overdrafts = await Overdraft.find().populate("BankId", "Name");
    if (overdrafts == null) {
      return res.status(404).json({ message: "Cannot find overdrafts" });
    }
    res.json(overdrafts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual Overdraft by Id
exports.getOverdraftById = async (req, res) => {
  if (req.params.id == null) {
    return res.status(404).json({ message: "Id cannot be null" });
  }

  try {
    const overdraft = await Overdraft.findById(req.params.id).populate(
      "BankId",
      "Name"
    );
    if (overdraft == null) {
      return res.status(404).json({ message: "Cannot find overdraft" });
    }
    res.json(overdraft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual Overdraft by Name
exports.getOverdraftByName = async (req, res) => {
  try {
    const overdraft = await Overdraft.findOne({
      OverdraftName: req.params.name,
    }).populate("BankId", "Name");
    if (overdraft == null) {
      return res.status(404).json({ message: "Cannot find overdraft" });
    }
    res.json(overdraft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Overdraft by BankId
exports.getBankOverdraftsfromOverdraft = async (req, res) => {
  try {
    const overdrafts = await Overdraft.find({ BankId: req.params.id }).populate(
      "BankId",
      "Name"
    );
    if (overdrafts == null) {
      return res.status(404).json({ message: "Cannot find overdrafts" });
    }
    res.json(overdrafts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Overdraft
exports.createOverdraft = async (req, res) => {
  if (req.body.BankId == null) {
    return res.status(404).json({ message: "BankId cannot be null" });
  }
  if (req.body.TotalLimit == null) {
    return res.status(404).json({ message: "TotalLimit cannot be null" });
  }
  if (req.body.RemainingLimit == null) {
    RemainingLimit = req.body.TotalLimit;
  }
  if (req.body.TotalDepth == null) {
    TotalDepth = 0;
  }
  try {
    const overdraft = {
      BankId: req.body.BankId,
      TotalLimit: req.body.TotalLimit,
      RemainingLimit: req.body.RemainingLimit,
      TotalDepth: req.body.TotalDepth,
    };
    await Overdraft.create(overdraft);
    const bank = Bank.findById(req.body.BankId);
    bank.Overdrafts.push(overdraft);
    await Bank.save();

    res.json({ message: "Overdraft created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Overdraft
exports.updateOverdraftById = async (req, res) => {
  if (req.params.id == null) {
    return res.status(404).json({ message: "Id cannot be null" });
  }
  try {
    const overdraft = await Overdraft.findByIdAndDelete(req.params.id);
    if (overdraft == null) {
      return res.status(404).json({ message: "Cannot find overdraft" });
    }
    if (req.body.TotalLimit != null) {
      overdraft.TotalLimit = req.body.TotalLimit;
    }
    if (req.body.RemainingLimit != null) {
      overdraft.RemainingLimit = req.body.RemainingLimit;
    }
    if (req.body.TotalDepth != null) {
      overdraft.TotalDepth = req.body.TotalDepth;
    }
    const updatedOverdraft = await overdraft.save();
    res.json(updatedOverdraft);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete Overdraft
exports.deleteOverdraft = async (req, res) => {
  if (req.params.id == null) {
    return res.status(404).json({ message: "Id cannot be null" });
  }

  try {
    const overdraft = await Overdraft.findByIdAndDelete(req.params.id);
    if (overdraft == null) {
      return res.status(404).json({ message: "Cannot find overdraft" });
    }
    overdraft.save();
    res.json({ message: "Overdraft deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
