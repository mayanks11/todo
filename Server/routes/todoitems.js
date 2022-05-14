const router = require('express').Router();

const todoItemsModel = require('../models/todo');

// Insert item
router.post('/api/item', async (req, res)=>{
    console.log('hello');
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        // save
        const save = await newItem.save()
        res.status(200).json(save);
    } catch (error) {
        res.json(error)
        
    }
})

router.get('/api/item', async (req, res)=>{
    // console.log('hello');
    try{
        const items = await todoItemsModel.find({})
        console.log(items)
        // save
        res.status(200).json(items)
    } catch (error) {
        res.json(error)
        
    }
})

router.put('/api/item/:id', async (req, res)=>{
    console.log(req.params.id);
    try {
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json("Update successfully");
    } catch (error) {
        res.json(error)
    }
})

router.delete('/api/item/:_id', async (req,res)=>{
    console.log(req.params._id);
    
    try {
        const deleteItem = await todoItemsModel.deleteOne({_id:req.params._id});
        res.status(200).json('Item deleted');
    } catch (error) {
        res.json(error)
    }
})

console.log('hola');
module.exports = router;