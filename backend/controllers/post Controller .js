const post = require("../Models/post Model")

exports.createPost = async (req,res)=>{

    try{

        const createPostdata={
            caption:req.body.caption,
            image:{
                public_id:"req.body.public_id",
                url:"req.body.url"
            },
            owner:req.user._id

        }

        const newPost = await post.create(createPostdata)


    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}