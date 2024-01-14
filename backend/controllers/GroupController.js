const Group = require("../model/Group");

exports.createGroup = async(req,res)=>{
    const {name,owner} = req.body;
 if(!name||!owner){
  return res.json('unvalid credentials');
 }
 try {
    const group = await Group.create({name,owner});
    res.status(201).json(group);
 } catch (error) {
    res.json(error.message);
 }
} 