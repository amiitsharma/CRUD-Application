import {mongoose} from "mongoose";
import {connString} from "./paths.js";
await mongoose.connect(connString);
const employeeSchema = new mongoose.Schema({
    name: {type:String,required:true},
    salary: {type:Number,required:true},
    language: {type:String,required:true},
    city: {type:String,required:true},
    isManager: {type:Boolean,requireed:true}
});
const Employee = mongoose.model('Employee',employeeSchema);
export const saveEmployee = async function(obj){
        let employee = await new Employee(obj);
        try{
        await employee.save();
        }
        catch{
            throw Error("Can't Save");
        }
}
export const findEmployee = async function(name){
    try{
    let res = await Employee.find({name:`${name}`},{_id:0,__v:0})
    return res;
    }
    catch{
        throw Error("Can't find");
    }
}
export const findAllEmployee = async function(){
    try{
    let res = await Employee.find({},{_id:0,__v:0})
    return res;
    }
    catch{
        throw Error("Can't find");
    }
}
export const updateEmployee = async function(obj){
    
    
    let alreadyExists;
    try{
    alreadyExists =await Employee.findOne({name:`${obj.name}`});
    
    
    for (const key in alreadyExists) {
        const newElement = obj[key];
        if(newElement != null){
            //
            alreadyExists[key] = newElement;
        }
    }
    
    alreadyExists = await new Employee(alreadyExists);
    let res = await Employee.updateOne({name:`${obj.name}`},alreadyExists);
    return res.acknowledged;
    }
    catch{
        throw Error("can't update");
    }
}
export const deleteEmployee = async function(name){
    try{
    
    let res = await Employee.deleteMany({ name: `${name}` });
    return res.acknowledged;
    }
    catch{
        throw Error("can't delete");
    }
}


