const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
  try {

    //body parser save data into req.body
    const data = req.body
    //create new document using mongoose
    const newPerson = new Person(data);
    //save new person to database
    const responce = await newPerson.save();
    console.log('data saved');
    res.status(200).json(responce);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' })

  }
})

router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' })
  }
})

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType })
      console.log('response fetched')
      res.status(200).json(response)
    } else {
      res.status(404).json({ error: 'invalid workType' })
    }
  } catch (err) {
    res.status(500).json({ error: 'internal server error' })
  }
})
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true
    })

    if (!response) {
      res.status(404).json({ error: 'person not found' })
    }

    console.log('data updated')
    res.status(200).json(response)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' })
  }
})


router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId)
    
    res.status(200).json({ message: 'person deleted successfully' })
    if (!response) {
      res.status(404).json({ error: 'person not found' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = router
