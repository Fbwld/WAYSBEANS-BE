const {product, user, category, productcaegory}= require(`../../models`)


exports.addProduct= async(req,res)=>{
    try {
        const data = {
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            desc: req.body.desc,
            image: req.file.filename,
            idUser: req.user.id,
            };
        
            let newProduct = await product.create(data);
        
            let productData = await product.findOne({
            where: {
                id: newProduct.id,
            },
            include: [
                {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            });
            productData = JSON.parse(JSON.stringify(productData));
        
            res.send({
            status: "success...",
            data: {
                ...productData,
                image: process.env.PATH_FILE + productData.image,
            },
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
            status: "failed",
            message: "Server Error",
            });
        }
    };


exports.getProducts = async(req,res)=>{
    try {
        let data = await product.findAll({
            include:[
                {
                    model:user,
                    as:"user",
                    attributes:{
                        exclude:["createdAt","updatedAt","password","name","email","status"],
                    },
                },
            ],
            attributes:{
                exclude:['idUser','createdAt','updatedAt']
            }
        })
        res.send({
            status:"success",
            data:{
                user:{
                    data
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: error.name,
            message: error.message
        })
    }
}

exports.getProduct = async(req,res)=>{
    try {
        const {id} = req.params

        let data = await product.findOne({
            where:{
                id:id
            },
            include:[
                {
                    model:user,
                    as:"user",
                    attributes:{
                        exclude:["createdAt","updatedAt","password","name","email","status"],
                    },
                },
                
            ],
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        })
        let FILE_PATH = 'http://localhost:5000/uploads/'
        res.send({
            status:"success",
            data:{
                user:{
                    data
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: error.name,
            message: error.message
        })
    }
}

exports.updateProduct = async(req, res) => {
    try {
        const { id } = req.params;


        const data = {
            name: req?.body?.name,
            desc: req?.body.desc,
            price: req?.body?.price,
            image: req?.file?.filename,
            qty: req?.body?.qty,
            idUser: req?.user?.id,
        };
        await product.update(data, {
            where: {
            id,
            },
        });
    
        res.send({
        status: "success",
        data: {
            id,
            data,
            image: req?.file?.filename,
            },
        });
        } catch (error) {
            console.log(error)
            res.send({
                status: 'failed',
                message: 'Server Error'
            })
        }
    }

exports.deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params

        await product.destroy({
            where:{
                id
            }
        })
        res.send({
            status:'success',
            message:`Delete product id:${id} finished`
        })
    } catch (error) {
        res.send({
            status:'failed',
            message: error.message
        })
    }
}