import {Schema} from "mongoose";
export const UsuarioShema = new Schema({
    nombre:{type:String,requite:true},
    apellido:{type:String},
    password:{type:String,requite:true},
    edad:{type:Number},
    correo:{type:String,unique:true,requite:true},
    fecha_nacimiento:{type:Date},
    fecha_creacion : {type:Date,default:Date.now()},
    activo:{type:Boolean,default:true},
})

