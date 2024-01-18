const Group = require("../model/Group");
const Message = require("../model/Message");

exports.createGroup = async(req,res)=>{
    const {name,owner} = req.body;
 if(!name||!owner){
  return res.json('unvalid credentials');
 }
 try {
    const group = await Group.create({name,owner,members:[owner]});
    res.status(201).json(group);
 } catch (error) {
    res.json(error.message);
 }
} 

exports.joinGroup = async(req,res)=>{
   const {groupId,userId} = req.body;
   if(!groupId,!userId){
     res.json('group id and user id is required');
   }
   try {
     const group = await Group.findById(groupId);
     if(group){
        await group.updateOne({ $push: { members: userId } });
        res.json("user joined group successfully");
     }else{
       res.json('no group found with that group id')
     }
   } catch (error) {
   res.status(500).json(error);
   }
};

exports.leaveGroup = async(req,res)=>{
   try {
       
   } catch (error) {
    res.status(500).json(error);
   }
};

exports.addGroupMsg = async(req,res)=>{
 const {text,from,to} = req.body;
 if(!text||!from||!to){
  res.json('text form and to are requried')
 }
   try {
       const message = await Message.create({
         text,
         from,
         to
       });

       res.json(message);
   } catch (error) {
    res.status(500).json(error);
   }
};


exports.getGroupAllMsg = async(req,res)=>{
 const groupId = req.body.groupId;
   if(!groupId){
      res.json('group id is reqired')
   }
   try {
       const message = await Message.find({to:groupId});
         res.json(message);
   } catch (error) {
    res.status(500).json(error);
   }
}

exports.groupList = async(req,res)=>{
try {
 const groupList = await Group.find();

 res.json({success:true,groupList});
} catch (error) {
 res.status(500).json(error);
}
}