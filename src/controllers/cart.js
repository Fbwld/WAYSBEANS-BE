const {user,product,cartoke}= require(`../../models`)

exports.getCarts = async(req,res)=>{
    try {
        const idUser = req.user.id;
        let data = await cartoke.findAll({
            where: {
                idUser,
            },
            order: [["createdAt", "DESC"]],
            attributes: {
                exclude: ["updatedAt"],
            },
            include: [
                {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password","status"],
                },
                },
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    },
            ],
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        })
        data = JSON.parse(JSON.stringify(data))
        data = data.map((item) => {
            return {
            qty: item.qty,
            product: {
                ...item.products,
                image: process.env.PATH_FILE + item.products.image,
            },
            };
        });
        res.send({
            status:"success",
            data: data
        })
    } catch (error) {
        res.send({
            status:"error",
            message:error.message
        })
    }
}

exports.deleteCart= async(req,res)=>{
    try {
        const {id} = req.params
        const idUser= req.user.id

        await cartoke.destroy({
            where:{
                idProduct:id,idUser
            }
        })
        res.send({
            status:'success',
            message:`Delete product id:${id} finished`
        })
    } catch (error) {
        res.send({
            status:'failed',
            message:'server error'
        })
    }
}

exports.getCart = async(req,res)=>{
    try {
        const {id} = req.params
        const idUser =req.user.id
        const data = await cartoke.findOne({
            where:{
                idUser:id,idProduct:id
            },
                include: [
                    {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password","status"],
                    },
                    },
                    {
                        model: product,
                        as: "products",
                        attributes: {
                            exclude: ["createdAt", "updatedAt","desc","price","stock","idUser","image"],
                        },
                        },                ],
                attributes:{
                    exclude:['createdAt','updatedAt']
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
        res.send({
            status:"error",
            message:error.message
        })
    }
}

exports.addCart = async(req,res)=>{
    try{
        const data={
            qty:"1",
            idProduct:req.body.idProduct,
            idUser:req.user.id,
        };
        const createdData = await cartoke.create(data);
        
        let whis = await cartoke.findOne({
            where: {
                id: createdData.id,
            },
            include: [
                {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
                },
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"],
                    },
                    },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            });
        res.send({
            status:"success",
            data:{
                user:{
                whis
                }
            }
        })
    }catch(error){
        res.send({
            status:"error",
            message:error.message
        })
    }
}

exports.updateCart = async(req, res) => {
    try {
        const { id } = req.params;

        const idUser = req.user.id


        const databody = {
            qty: req?.body?.qty,
        };
        await cartoke.update(databody, {
            where: {
            idProduct:id,idUser
            },
        });
        let data = await cartoke.findAll({
            where:{
                idUser
            },
            include: [
                {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password","status"],
                },
                },
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    },
            ],
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        })
        data = JSON.parse(JSON.stringify(data))
        data = data.map((item) => {
            return {
            qty: item.qty,
            product: {
                ...item.products,
                image: process.env.PATH_FILE + item.products.image,
            },
            };
        });
        res.send({
            status:"success",
            data: data
        })
        } catch (error) {
            console.log(error)
            res.send({
                status: 'failed',
                message: 'Server Error'
            })
        }
    }
