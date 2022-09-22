import Transaction from '../models/transaction';
import moment from 'moment';

export const addTransaction = async function(req, res) {  
  try {    
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("Transaction added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editTransaction = async function(req, res) {
  try {
    await Transaction.findOneAndUpdate({_id : req.body.transactionId} , req.body.payload)
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTransaction = async function(req, res) {
  try {
    await Transaction.findOneAndDelete({_id : req.body.transactionId})
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllTransactions = async function(req, res) {
  const { frequency, selectedRange , type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type!=='all' && {type})
    });

    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};
