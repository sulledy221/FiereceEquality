const Post = require('../models/posts');

module.exports = {
    create,
    deleteLike
}

async function create(req, res){
 
    try {
        const post = await Post.findById(req.params.id);
        post.likes.push({ownerName: req.user.ownerName, ownerId: req.user._id}); //mutating a document
        await post.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.json({data: err})
    }
    
}

async function deleteLike(req, res){
    try {
        
        const post = await Post.findOne({'likes._id': req.params.id, 'likes.ownerName': req.user.ownerName});
        console.log(post, "post", req.params.id)
        post.likes.remove(req.params.id) // mutating a document
        // req.params.id //is the like id 
        await post.save() // after you mutate a document you must save
        res.json({data: 'like removed'})
    } catch(err){
        console.log('error', err)
        res.json({error: err})
    }
}
