const express = require("express");
const categoryRouter = express.Router();
const Category = require("../models/category");
const {userAuth} = require("../middlewares/auth");


//Add category API
categoryRouter.post("/category/add", userAuth, async(req, res) => {

    try{
        const {name, description} = req.body;

    if(!name){
        throw new Error("Name is required");
    }

    const existing = await Category.findOne({name});
    if(existing){
        return res.status(400).send("This category already exists");
    }

    const category = new Category({name, description});
    await category.save();

    res.status(201).json({success: true, message:"Category added successfully", category});
    }

    catch(err){
        res.status(400).send("Error saving category: " + err);
    }
});


//Get All Category
categoryRouter.get("/category/all", userAuth, async(req, res) => {
    try{
        const categories = await Category.find();
        res.status(201).json({success: true, categories});
    }
    catch(err){
        res.status(400).json({success: false, message: err.message});
    }
});


//Get Category By Id
categoryRouter.get("/category/:id", userAuth, async(req, res) => {
    try{
        const category = await Category.findById(req.params.id);
        if(!category){
            res.status(400).send("No such category exists");
        }
        res.status(201).json({success: true, category});
    }
    catch(err){
        res.status(400).json({success: false, message: err.message});
    }
});


//Update Category by Id
categoryRouter.patch("/category/update/:id", userAuth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "description"];
    const isValid = updates.every((u) => allowedUpdates.includes(u));

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid updates" });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    updates.forEach((u) => (category[u] = req.body[u]));
    await category.save();

    res.status(200).json({ success: true, message: "Category updated", category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//Delete Category API
categoryRouter.delete("/category/delete/:id", userAuth, async(req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category){
            res.status(400).send("No such category exists");
        }
        res.status(201).json({success: true, message: "Category Deleted"});
    }
    catch(err){
        res.status(400).json({success: false, message: err.message});
    }
})


module.exports = categoryRouter;