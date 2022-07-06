const {profile, user}= require(`../../models`)


exports.addProfile= async(req,res)=>{
    try {
        const data = {
            phone: req.body.phone,
            gender: req.body.gender,
            address: req.body.address,
            image: req.file.filename,
            idUser: req.body.idUser,
            };
        
            let newProfile = await profile.create(data);
        
            let profileData = await profile.findOne({
            where: {
                id: newProfile.id,
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
            profileData = JSON.parse(JSON.stringify(profileData));
        
            res.send({
            status: "success...",
            data: {
                ...profileData,
                image: process.env.PATH_FILE + profileData.image,
            },
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
            status: "failed",
            message: error.message
            });
        }
    };

exports.getProfiles = async(req,res)=>{
    try {
        let data = await profile.findAll({
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
        // data = JSON.parse(JSON.stringify(data));

        // data = {
        //     ...data,
        //     image: process.env.PATH_FILE + data.image,
        // };
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

exports.getProfile = async(req,res)=>{
    try {
        const {id} = req.params

        let data = await profile.findOne({
            where:{
                idUser:id
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
        data = JSON.parse(JSON.stringify(data));

        data = {
            ...data,
            image: process.env.PATH_FILE + data.image,
        };
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

exports.updateProfile = async(req, res) => {
    try {
        const { id } = req.params;

        const data = {
            phone: req?.body?.phone,
            gender: req?.body.gender,
            address: req?.body?.price,
            image: req?.file?.filename,
            idUser: req?.user?.id,
        };
        await profile.update(data, {
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
                message: error.message
            })
        }
    }

exports.deleteProfile = async(req,res)=>{
    try {
        const {id} = req.params

        await profile.destroy({
            where:{
                id
            }
        })
        res.send({
            status:'success',
            message:`Delete profile id:${id} finished`
        })
    } catch (error) {
        res.send({
            status:'failed',
            message: error.message
        })
    }
}