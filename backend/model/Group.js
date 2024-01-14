const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gorupSchema = new schema({
 name:{
  type:String,
  required:true,
  unique:true
 },

 owner:{
  type:String,
  required:true
 },

 adminList:{
  type:Array,
  default:[]
 },

 members: {
    type:Array,
    default:[]
  },

 type:{
  type:String,
  enum:['public','private'],
  default:'public'
 },
},{timestamps:true});

module.exports = mongoose.model("Group",gorupSchema);
