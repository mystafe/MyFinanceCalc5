const  express = require('express');
const app= express();
const router=express.Router();

const {getOverdrafts,getOverdraftById,getOverdraftByName,createOverdraft,updateOverdraftById,deleteOverdraft,getBankOverdraftsfromOverdraft}=require('../controllers/overdraftController')

//Get All OverdraftAccounts
router.get('/', getOverdrafts);

//Get OverdraftAccount By Id
router.get('/bank/:id', getOverdraftById);

//Get OverdraftAccount By Name
router.get('/name/:name', getOverdraftByName);

//Get OverdraftAccount By BankId
router.get('/bank/:id', getBankOverdraftsfromOverdraft);

//Create Overdraft
router.post('/', createOverdraft);

//Update Overdraft By Id Put
router.put('/:id',updateOverdraftById);

//Update Overdraft By Id Patch
router.patch('/:id', updateOverdraftById);

//Delete OverdraftAccount By Id
router.delete('/:id', deleteOverdraft);





router.use(app)
module.exports = router;
