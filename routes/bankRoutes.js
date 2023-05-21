const  express = require('express');
const app= express();
const router=express.Router();

const {getBanks,getBankById,getBankByName,createBank,updateBankPatch,updateBankPut,deleteBank,getBankCreditCardsFromBank}=require('../controllers/bankController')


//Get All Banks
router.get('/', getBanks);


//Get Individual Bank
router.get('/:id', getBankById);

//Get Bank by Name
router.get('/name/:name', getBankByName);


//Create Bank
router.post('/', createBank);

//Update Bank Patch
router.patch('/:id', updateBankPatch);

//Update Bank Put
router.put('/:id', updateBankPut);

//Delete Bank
router.delete('/:id', deleteBank);


//Get Bank Credit Cards
router.get('/:id/creditcards', getBankCreditCardsFromBank);

router.use(app);
module.exports = router;