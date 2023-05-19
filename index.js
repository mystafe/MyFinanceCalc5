const express = require('express');
const app = express();
const port = 3000;
//fincancecalc5

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fincancecalc5:fincancecalc5@cluster0.grrm0qk.mongodb.net/', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we're connected!")});



const akbankid = "6467dcd1f13d743c19b5717b";
const qnbid = "6467dcd1f13d743c19b5717c";
const isbankid = "6467dcd1f13d743c19b5717d";
const garantiid = "6467dcd1f13d743c19b5717d";
const ziraatid = "6467dcd1f13d743c19b5717f";
const denizid= "6467dcd1f13d743c19b57180";
const tebid = "6467dcd1f13d743c19b57181";
const aktifid = "6467dcd1f13d743c19b57182";


app.get('/', (req, res) => res.send('Hello World!'));


const loanRouter = require('./routes/loanRoutes');
app.use('/loans', loanRouter);

const bankRouter = require('./routes/bankRoutes');
app.use('/banks', bankRouter);

const creditcardRouter = require('./routes/creditcardRoutes');
app.use('/creditcards', creditcardRouter);

const depositRouter = require('./routes/depositRoutes');
app.use('/deposits', depositRouter);

const overfdraftRouter = require('./routes/overdraftRoutes');
app.use('/overdrafts', overfdraftRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
