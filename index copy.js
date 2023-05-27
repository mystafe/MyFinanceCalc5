const express = require('express');
const app = express();
const port = 3000;
//fincancecalc5

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fincancecalc5:fincancecalc5@cluster0.grrm0qk.mongodb.net/', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we're connected!")});


const BankSchema = new mongoose.Schema({
    Name: String
});
const Bank = mongoose.model('Bank', BankSchema);

const Bank1 = new Bank({Name: "Akbank"});
const Bank2 = new Bank({Name: "QNB Finansbank"});
const Bank3 = new Bank({Name: "Isbank"});
const Bank4 = new Bank({Name: "Garanti"});
const Bank5 = new Bank({Name: "Ziraat"});
const Bank6 = new Bank({Name: "Denizbank"});
const Bank7 = new Bank({Name: "TEB"});
const Bank8 = new Bank({Name: "Aktifbank"});

db.collection('banks').insertMany([Bank1, Bank2, Bank3, Bank4, Bank5, Bank6, Bank7, Bank8], (err, result) => {
    if (err) return console.error(err);
    console.log("inserted banks");
});


const akbankid = "6467dcd1f13d743c19b5717b";
const qnbid = "6467dcd1f13d743c19b5717c";
const isbankid = "6467dcd1f13d743c19b5717d";
const garantiid = "6467dcd1f13d743c19b5717d";
const ziraatid = "6467dcd1f13d743c19b5717f";
const denizid= "6467dcd1f13d743c19b57180";
const tebid = "6467dcd1f13d743c19b57181";
const aktifid = "6467dcd1f13d743c19b57182";


const LoanSchema = new mongoose.Schema({
    BankId:{ type: mongoose.Schema.Types.ObjectId, ref:'Bank'},
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

const Loan = mongoose.model('Loan', LoanSchema);




        const CreditCardSchema = new mongoose.Schema({
            BankId:{ type: mongoose.Schema.Types.ObjectId, ref:'Bank'},
            CardName: String,
            CreditLimit: Number,
            RemainingLimit: Number,
            TotalPayment: Number,
            MonthtlyPayment: Number
        });
        
        const CreditCard = mongoose.model('CreditCard', CreditCardSchema);
        
        
        const creditCardAkbank= new CreditCard({BankId: akbankid, CardName: "Free", CreditLimit: 102000, RemainingLimit: 50, TotalPayment: 0, MonthtlyPayment: 0});
        const creditCardQnb1= new CreditCard({BankId: qnbid, CardName: "Enpara", CreditLimit: 80000, RemainingLimit: 2000, TotalPayment: 0, MonthtlyPayment: 0});
        const creditCardQnb2= new CreditCard({BankId: qnbid, CardName: "Ramazan", CreditLimit: 100000, RemainingLimit: 100000, TotalPayment: 0, MonthtlyPayment: 0});
        const creditCardZiraat= new CreditCard({BankId: ziraatid, CardName: "Ziraat", CreditLimit: 100000, RemainingLimit: 100000, TotalPayment: 0, MonthtlyPayment: 0});
        const creditCardDeniz1= new CreditCard({BankId: denizid, CardName: "Black", CreditLimit: 100000, RemainingLimit: 100000, TotalPayment: 0, MonthtlyPayment: 0});
        const creditCardDeniz2= new CreditCard({BankId: denizid, CardName: "Serife", CreditLimit: 100000, RemainingLimit: 100000, TotalPayment: 0, MonthtlyPayment: 0});
        const creditCardTeb= new CreditCard({BankId: tebid, CardName: "Teb", CreditLimit: 100000, RemainingLimit: 100000, TotalPayment: 0, MonthtlyPayment: 0});
      


db.collection('creditcards').insertMany([CreditCard1, CreditCard2, CreditCard3, CreditCard4, CreditCard5, CreditCard6, CreditCard7], (err, result) => {
    if (err) return console.error(err);
    console.log("inserted creditcards");
});

const DepositSchema = new mongoose.Schema({
    BankId:{ type: mongoose.Schema.Types.ObjectId, ref:'Bank'},
    DepositAmount: Number, 
});

const Deposit = mongoose.model('Deposit', DepositSchema);

const Deposit1 = new Deposit({BankName: "Akbank", DepositAmount: 50});
const Deposit2 = new Deposit({BankName: "QNB Finansbank", DepositAmount: 50});


const OverdraftAccountSchema = new mongoose.Schema({
    BankId:{ type: mongoose.Schema.Types.ObjectId, ref:'Bank'},
    TotalLimit: Number,
    RemainingLimit: Number,
    TotalDepth: Number,
});

const OverdraftAccount = mongoose.model('OverdraftAccount', OverdraftAccountSchema);

const overdraftAccountAkbank = new OverdraftAccount({BankId: akbankid, TotalLimit: 10000, RemainingLimit: 10000, TotalDepth: 0});
const overdraftAccountQnb1 = new OverdraftAccount({BankId: qnbid, TotalLimit: 10000, RemainingLimit: 10000, TotalDepth: 0});
const overdraftAccountQnb2 = new OverdraftAccount({BankId: qnbid, TotalLimit: 10000, RemainingLimit: 10000, TotalDepth: 0});
const overdraftAccountIsbank = new OverdraftAccount({BankId: isbankid, TotalLimit: 10000, RemainingLimit: 10000, TotalDepth: 0});
const overdraftAccountZiraat = new OverdraftAccount({BankId: ziraatid, TotalLimit: 10000, RemainingLimit: 10000, TotalDepth: 0});
const overdraftAccountDeniz = new OverdraftAccount({BankId: denizid, TotalLimit: 10000, RemainingLimit: 10000, TotalDepth: 0});
const overdraftAccountTeb = new OverdraftAccount({BankId: tebid, TotalLimit: 10000, RemainingLimit: 10000, TotalDepth: 0});
const overdraftAccountAktif = new OverdraftAccount({BankId: aktifid, TotalLimit: 10000, RemainingLimit: 10000, TotalDepth: 0});



app.get('/loans', (req, res) => {
    Loan.find({}, (err, loans) => {
        if (err) return console.error(err);
        res.send(loans);
    });
});

app.get('/loans/:id', (req, res) => {
    Loan.findById(req.params.id, (err, loan) => {
        if (err) return console.error(err);
        res.send(loan);
    });
});

app.get('/', (req, res) => res.send('Hello World!'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
