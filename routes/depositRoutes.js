const  express = require('express');
const app= express();
const router=express.Router();

const {getDeposits,getDepositById,getDepositByName,createDeposit,updateDepositById,getBankDepositsfromBank,deleteDeposit}=require('../controllers/depositController');
const { get } = require('mongoose');

//Get All Deposits
router.get('/', getDeposits);

//Get Individual Deposit
router.get('/:id', getDepositById);

router.get('/name/:name', getDepositByName);
//Create Deposit
router.post('/', createDeposit);

//Get Deposit by BankId
router.get('/bank/:id', getBankDepositsfromBank);

//Update Deposit By Id Put
router.put('/:id',updateDepositById);

//Update Deposit By Id Patch
router.patch('/:id',updateDepositById);


//Delete Deposit
router.delete('/:id', deleteDeposit);


router.use(app);
module.exports = router;