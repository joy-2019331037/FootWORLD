const express = require("express");
const router = express.Router();

const User = require("../models/user-model");
const Secret = require("../models/secret-model");
const Transacton = require("../models/transaction-model");

const uuid = require("uuid");

// Create bank account
router.post("/add-user", async (req, res) => {
  console.log('ok');
  const { username, email, password,money } = req.body;
  const ans = await User.create({
    name: username,
    email: email,
    password: password,
    money: money
  });
  return res.status(201).json(ans);
});



router.post("/get-user", async (req, res) => {
  const {id} = req.body;
  const ans = await User.findOne({ _id : id });
  if (!ans) {
    return res.status(404).json({ msg: "user is not found" });
  }

  const ans2 = await Secret.create({
    user_id: ans._id,
    name: ans.name,
    email: ans.email,
    secret: Math.floor(Math.random() * 4000) + 1,
  });
  console.log(ans2);
  return res.status(200).json({
    user: ans,
    secret: ans2.secret,
  });
});

router.post("/update-admin", async (req, res) => {
  const { id, money } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the user's money field
    user.money = user.money + money;
    await user.save();

    return res.status(200).json({ msg: "Ecommerce money updated successfully", user });
  } catch (error) {
    console.error("Error updating user money:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});


router.post("/update-supplier", async (req, res) => {
  const { id, money } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the user's money field
    user.money = user.money + money;
    await user.save();

    return res.status(200).json({ msg: "User money updated successfully", user });
  } catch (error) {
    console.error("Error updating user money:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/degrade-admin", async (req, res) => {
  const { id, money } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the user's money field
    user.money = user.money - money;
    await user.save();

    return res.status(200).json({ msg: "User money updated successfully", user });
  } catch (error) {
    console.error("Error updating user money:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});


//code needs to upgrade.
//secret checking is not implemented

router.post("/transaction", async (req, res) => {
  const { address, cost, email, mobile, productQuantity } = req.body;
  console.log(address, cost, email, mobile, productQuantity);
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user.money < cost) {
    return res
      .status(301)
      .json({ msg: "you dont have enough money in your account.sorry!" });
  }
  console.log(+user.money - +cost);
  const ans = await User.updateOne(
    { email: email },
    { money: +user.money - +cost }
  );
  const tans = await Transacton.create({
    address,
    productQuantity,
    email: email,
    cost: cost,
    trxId: uuid.v4(),
  });
  console.log(tans);
  res.status(201).json({ msg: "transaction complete" });
});

router.get("/get-transactions", async (req, res) => {
  const ans = await Transacton.find({});
  res.json({ ans });
});
router.get("/make-order-done", async (req, res) => {
  console.log(req.query.txid);
  const ans = await Transacton.updateOne(
    { trxId: req.query.txid },
    {
      status: "Delivered",
    }
  );
  console.log(ans);
  if (ans) {
    return res.json({ msg: "status updated.you may refresh the page now" });
  }
});
module.exports = router;



// const express = require("express");
// const router = express.Router();

// const User = require("../models/user-model");
// const Secret = require("../models/secret-model");
// const Transacton = require("../models/transaction-model");

// const uuid = require("uuid");

// router.post("/add-user", async (req, res) => {
  
//   const { username, email, password, money } = req.body;
//   const ans = await User.create({
//     name: username,
//     email: email,
//     password: password,
//     money:money,
//   });
//   return res.status(201).json(ans);
// });

// router.post("/get-user", async (req, res) => {
//   const { id } = req.body;
//   const ans = await User.findOne({ _id: id });
//   if (!ans) {
//     return res.status(404).json({ msg: "user is not found" });
//   }

//   const ans2 = await Secret.create({
//     user_id: ans._id,
//     name: ans.name,
//     email: ans.email,
//     secret: Math.floor(Math.random() * 4000) + 1,
//   });
//   console.log(ans2);
//   return res.status(200).json({
//     user: ans,
//     secret: ans2.secret,
//   });
// });


// router.post("/update-user", async (req, res) => {
//   const { id, money } = req.body;

//   try {
//     const user = await User.findOne({ _id: id });

//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // Update the user's money field
//     user.money = money;
//     await user.save();

//     return res.status(200).json({ msg: "User money updated successfully", user });
//   } catch (error) {
//     console.error("Error updating user money:", error);
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// });




// // router.post("/get-user", async (req, res) => {
// //   const { email } = req.body;
// //   const ans = await User.findOne({ email: email });
// //   if (!ans) {
// //     return res.status(404).json({ msg: "user is not found" });
// //   }

// //   const ans2 = await Secret.create({
// //     user_id: ans._id,
// //     name: ans.name,
// //     email: ans.email,
// //     secret: Math.floor(Math.random() * 4000) + 1,
// //   });
// //   console.log(ans2);
// //   return res.status(200).json({
// //     user: ans,
// //     secret: ans2.secret,
// //   });
// // });
// //code needs to upgrade.
// //secret checking is not implemented


// router.post("/transaction", async (req, res) => {
//   const { address, cost, email, mobile, productName,productQuantity } = req.body;
//   console.log(address, cost, email, mobile, productName,productQuantity);
//   const user = await User.findOne({ email: email });
//   console.log(user);
//   if (user.money < cost) {
//     return res
//       .status(301)
//       .json({ msg: "you dont have enough money in your account.sorry!" });
//   }
//   console.log(+user.money - +cost);
//   const ans = await User.updateOne(
//     { email: email },
//     { money: +user.money - +cost }
//   );
//   const tans = await Transacton.create({
//     address:address,
//     productName:productName,
//     productQuantity:productQuantity,
//     email: email,
//     cost: cost,
//     trxId: uuid.v4(),
//   });
//   console.log(tans);
//   res.status(201).json({ msg: "transaction complete" });
// });

// router.get("/get-transactions", async (req, res) => {
//   const ans = await Transacton.find({});
//   res.json({ ans });
// });
// router.get("/make-order-done", async (req, res) => {
//   console.log(req.query.txid);
//   const ans = await Transacton.updateOne(
//     { trxId: req.query.txid },
//     {
//       status: "Delivered",
//     }
//   );
//   console.log(ans);
//   if (ans) {
//     return res.json({ msg: "status updated.you may refresh the page now" });
//   }
// });
// module.exports = router;
