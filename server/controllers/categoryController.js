const Category = require('../models/category')

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ _id: -1})
        if(!categories) {
            return res.status(404).json({
                message: "No Categories found"
            })
        }
        return res.status(200).json({
            categories
        })
    } catch (error) {
        console.log(error);
    }
}

const addCategory = async (req, res) => {
    const { name, description, status} = req.body;
    // left the content for the category image
    // const cImage = req.file.fileName;
    // const filePath = `
    if(!name || !description || !status ){
        return res.status(400).json({
            message: "please provide all fields"
        })
    }
    try{
        const isCategoryExist = await Category.findOne({name})
        if(isCategoryExist) {
            return res.status(400).json({
                message: "Category already exists"
            })
        }
        const newCategory = new Category({
            name,
            description,
            status,
        });

        const createdCategory = await newCategory.save()
        return res.status(200).json({
            category: createdCategory,
            message: "Category created successfully"
        })
    } catch(err) {
        console.log(err)
    }
}

const editCategory = async (req, res) => {
    const {id : cId} = req.params;
    if(!cId) {
        return res.status(400).json({
            message: "Please provide an id"
        })
    }
    const { name, description, status} = req.body;
    if(!cId) {
        return res.status(400).json({
            message: "please provide id of the category"
        })
    }
    // console.log(req.body)
    try{
        const editedCategory = await Category.findByIdAndUpdate(cId, {
            name,
            description,
            status
        }, {
            new: true
        })
        return res.status(200).json({
            message: "Category Updated",
            category: editedCategory
        })
    } catch(err) {
        console.log(err)
    }
}

const deleteCategory = async (req, res) => {
    const {id : cId} = req.params
    if(!cId) {
        return res.status(404).json({
            message: "Please provide category Id"
        })
    }
    try{
        await Category.findByIdAndDelete(cId)
        return res.status(204).json({
            message: "Category Successfully Deleted!"
        })
    } catch(err) {
        console.log(err)
        return res.status(404).json({
            message: "Something went wrong"
        })
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory
}