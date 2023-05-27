const express = require('express');
const app = express();
const port = 3000;
//fincancecalc5

ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb+srv://fincancecalc5:fincancecalc5@cluster0.grrm0qk.mongodb.net/', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("Mongodb connected!")});


app.get('/', (req, res) => 
{
    const Bank2 = {
        "Loan": { "currentLoan": 13300, "totalLoan": 20300, "monthlyPayment": 0, "interestRate": 0 },
        "CreditCard": { "currentCreditCard": 5510, "totalCreditCard": 20210, "monthlyPayment": 0, "interestRate": 0 },
        "Deposit": { "currentDeposit": 1000, "totalDeposit": 1000, "monthlyPayment": 0, "interestRate": 0 }
      }
    res.render('../views/index',{Bank:Bank2})

});


const bankRouter = require('./routes/bankRoutes');
app.use('/banks', bankRouter);

const loanRouter = require('./routes/loanRoutes');
app.use('/loans', loanRouter);

const creditcardRouter = require('./routes/creditcardRoutes');
app.use('/creditcards', creditcardRouter);

const depositRouter = require('./routes/depositRoutes');
app.use('/deposits', depositRouter);

const overfdraftRouter = require('./routes/overdraftRoutes');
app.use('/overdrafts', overfdraftRouter);


console.clear();

app.listen(port, () => console.log(`Mustafa Evleksiz \t Finance App (V.5) on: ${port}!`));



