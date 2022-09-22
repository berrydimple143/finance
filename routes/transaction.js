import express from 'express';
import { addTransaction, editTransaction, deleteTransaction, getAllTransactions } from '../controllers/transaction';

const router = express.Router();

router.post("/add-transaction", addTransaction);
router.post("/edit-transaction", editTransaction);
router.post("/delete-transaction", deleteTransaction);
router.post("/get-all-transactions", getAllTransactions);

module.exports = router;