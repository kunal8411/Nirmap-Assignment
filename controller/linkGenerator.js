module.exports.linkGenerator = function(req,res){
    res.render('../views/linkGenerator',{
        storeId:req.params.id
    })
}