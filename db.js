const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({
  Name: String,
  CreditCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "CreditCard" }],
  Deposits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deposit" }],
  Overdrafts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Overdraft" }],
  Loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }],
});

exports.Bank = mongoose.model("Bank", BankSchema);

const akbank = this.Bank({
  Name: "Akbank",
});

const CreditCardSchema = new mongoose.Schema({
  CardName: String,
  CreditLimit: Number,
  RemainingLimit: Number,
  TotalPayment: Number,
  MonthtlyPayment: Number,
  BankId: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" },
});

exports.CreditCard = mongoose.model("CreditCard", CreditCardSchema);

const DepositSchema = new mongoose.Schema({
  BankId: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" },
  DepositName: String,
  DepositAmount: Number,
});

exports.Deposit = mongoose.model("Deposit", DepositSchema);

const LoanSchema = new mongoose.Schema({
  BankId: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" },
  LoanName: String,
  LoanAmount: Number,
  MonthtlyPayment: Number,
  InterestRate: Number,
  TotalMonth: Number,
  CompletedMonth: Number,
  RemainingMonth: Number,
  TotalPayment: Number,
  TotalInterest: Number,
  EearlyPayment: Number,
  CurrentPayment: Number,
  CurrentInterestPercent: Number,
  TotalPaymentPercent: Number,
  PaymentDate: Date,
});

exports.Loan = mongoose.model("Loan", LoanSchema);

const OverdraftSchema = new mongoose.Schema({
  BankId: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" },
  OverdraftName: String,
  TotalLimit: Number,
  RemainingLimit: Number,
  TotalDepth: Number,
});

exports.Overdraft = mongoose.model("Overdraft", OverdraftSchema);
