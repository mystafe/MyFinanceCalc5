const  express = require('express');
const app= express();
const router=express.Router();

const {getCreditCards,getCreditCardById,getCreditCardByName,createCreditCard,updateCreditCardById,deleteCreditCard,getBankCreditCardsfromCard}=require('../controllers/creditCardController')

//Get All CreditCards
router.get('/', getCreditCards);

//Get Individual CreditCard
router.get('/:id', getCreditCardById);

//Get CreditCard by Name
router.get('/name/:name', getCreditCardByName);

//Get CreditCard by BankId
router.get('/bank/:id',getBankCreditCardsfromCard);

//Create CreditCard
router.post('/', createCreditCard);

//Update CreditCard Put
router.patch('/:id',updateCreditCardById);

//Update CreditCard Put
router.put('/:id',updateCreditCardById);


//Delete CreditCard
router.delete('/:id',deleteCreditCard);


router.use(app);
module.exports = router;