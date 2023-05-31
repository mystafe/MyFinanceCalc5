const { trusted } = require("mongoose");
const { Bank, CreditCard, Deposit, Loan, Overdraft } = require("../db");

//Get All CreditCards
exports.getCreditCards = async (req, res) => {
  try {
    const creditcards = await CreditCard.find()
      .populate("BankId", "Name")
      .select(
        "CardName CreditLimit RemainingLimit TotalPayment MonthtlyPayment"
      )
      .exec();
    if (creditcards == null) {
      return res.status(404).json({ message: "Cannot find creditcards" });
    }
    res.json(creditcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual CreditCard by Id
exports.getCreditCardById = async (req, res) => {
  try {
    const creditcard = await CreditCard.findById(req.params.id)
      .populate("BankId", "Name")
      .select(
        "CardName CreditLimit RemainingLimit TotalPayment MonthtlyPayment"
      )
      .exec();
    if (creditcard == null) {
      return res.status(404).json({ message: "Cannot find creditcard" });
    }
    res.json(creditcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Individual CreditCard by Name
exports.getCreditCardByName = async (req, res) => {
  try {
    const creditcard = await CreditCard.findOne({ CardName: req.params.name })
      .populate("BankId", "Name")
      .select(
        "CardName CreditLimit RemainingLimit TotalPayment MonthtlyPayment"
      )
      .exec();
    if (creditcard == null) {
      return res.status(404).json({ message: "Cannot find creditcard" });
    }
    res.json(creditcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get CreditCard by BankId
exports.getBankCreditCardsfromCard = async (req, res) => {
  try {
    const creditcards = await CreditCard.find({ BankId: req.params.id })
      .populate("BankId", "Name")
      .select(
        "CardName CreditLimit RemainingLimit TotalPayment MonthtlyPayment"
      )
      .exec();
    if (creditcards == null) {
      return res.status(404).json({ message: "Cannot find creditcards" });
    }
    res.json(creditcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create CreditCard
exports.createCreditCard = async (req, res) => {
  const BankId = req.body.BankId;
  const CardName = req.body.CardName;
  const CreditLimit = req.body.CreditLimit;
  const TotalPayment = req.body.TotalPayment || 0;
  const RemainingLimit =
    req.body.RemainingLimit || req.body.CreditLimit - TotalPayment;
  const MonthtlyPayment = req.body.MonthtlyPayment || 0;

  const creditcard = new CreditCard({
    BankId,
    CardName,
    CreditLimit,
    TotalPayment,
    RemainingLimit,
    MonthtlyPayment,
  });
  if (req.body.BankId == null) {
    return res.status(404).json({ message: "BankId cannot be null" });
  }
  try {
    CreditCard.create(creditcard)
      .then((data) => {
        Bank.findByIdAndUpdate(req.body.BankId, {
          $push: { CreditCards: data._id },
        })
          .then(() => {
            res.send({ Message: "Credit Card is created", data });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the CreditCard.",
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the CreditCard.",
        });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update CreditCard By Id
exports.updateCreditCardById = async (req, res) => {
  if (req.params.id == null) {
    return res.status(404).json({ message: "Id cannot be null" });
  }
  try {
    const creditcard = await CreditCard.findById(req.params.id);
    if (creditcard == null) {
      return res.status(404).json({ message: "Cannot find creditcard" });
    }

    const CardName = req.body.CardName || creditcard.CardName;
    const CreditLimit = req.body.CreditLimit || creditcard.CreditLimit;
    const TotalPayment = req.body.TotalPayment || creditcard.TotalPayment;
    const RemainingLimit =
      req.body.RemainingLimit ||
      CreditLimit - TotalPayment ||
      creditcard.RemainingLimit;
    const MonthtlyPayment =
      req.body.MonthtlyPayment || creditcard.MonthtlyPayment;

    creditcard.CardName = CardName;
    creditcard.CreditLimit = CreditLimit;
    creditcard.TotalPayment = TotalPayment;
    creditcard.RemainingLimit = RemainingLimit;
    creditcard.MonthtlyPayment = MonthtlyPayment;

    const updatedCreditCard = await creditcard.save();
    res.json({ message: "Card is updated", card: updatedCreditCard });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete CreditCard By Id
exports.deleteCreditCard = async (req, res) => {
  if (req.params.id == null) {
    return res.status(404).json({ message: "Id cannot be null" });
  }

  try {
    const creditcard = await CreditCard.findByIdAndDelete(req.params.id);
    if (creditcard == null) {
      return res.status(404).json({ message: "Cannot find creditcard" });
    }
    Bank.findByIdAndUpdate(creditcard.BankId, {
      $pull: { CreditCards: creditcard._id },
    })
      .then(() => {
        res.send({ message: "CreditCard deleted successfully!", creditcard });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting the CreditCard.",
        });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
