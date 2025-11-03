const express =require('express')
const router =express.Router();
const MenuItem = require('../models/MenuItem')

router.post('/', async (req, res) => {
  try {
    //body parser save data into req.body
    const menu = req.body
    //create new document using mongoose
    const newMenu = new MenuItem(menu);
    //save new person to database
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' })

  }
})
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {

  }
})

module.exports =router
