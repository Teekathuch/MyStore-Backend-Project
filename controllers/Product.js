const Product = require('../Models/product')

const getProducts = async (req,res,next) => {
    try {
        const productsData = await Product.find();

        // console.log(productsData);

        return res.status(200).json({
            success : true,
            data : productsData
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
        })
    }
}

const getProduct = async (req,res,next) => {
    try {
        const productData = await Product.findById(req.params.id)

        if(!productData){
            return res.status(400).json({
                success : false,
                data : `Not found product with id ${req.params.id}`
            })
        }
        return res.status(200).json({
            success : true,
            data : productData
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
        })
    }
}

const createProduct = async (req,res,next) => {
    try {
        const product = await Product.create(req.body)

        return res.status(201).json({
            success : true,
            data : product,
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
        })
    }
}

const updateProduct = async (req,res,next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,
            req.body ,
            {
                new : true,
                runValidators : true
            }
        )

        if(!product){
            return res.status(400).json({
                success : false,
                data : `Not found product with id ${req.params.id}`
            })
        }


        return res.status(200).json({
            success : true,
            data : product,
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
        })
    }
}

const deleteProduct = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(400).json({
                success : false,
                data : `Not found product with id ${req.params.id}`
            })
        }

        await Product.deleteOne({_id : req.params.id})

        return res.status(200).json({
            success : true,
            data : []
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success : false,
        })
    }
}

module.exports = {getProduct , getProducts , createProduct , updateProduct , deleteProduct}

