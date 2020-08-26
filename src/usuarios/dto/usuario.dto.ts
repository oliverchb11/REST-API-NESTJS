import { 
    IsEmail,
    IsDate,
    IsInt,
    IsNotEmpty,
    validate,
    validateOrReject
 } from "class-validator";
import { Post, ValidationPipe } from "@nestjs/common";

export class UsuarioC extends ValidationPipe  {
id?:string;
@IsNotEmpty({message:'El nombre es requerido'})
nombre:string;
@IsNotEmpty({message:'El apellido es requerido'})
 apellido:string;
@IsNotEmpty({message:'El password es requerido'})
 password:string
@IsNotEmpty({message:'La edad es requerida'})
 edad:number;
@IsNotEmpty({message:'El correo es requerido'})
 correo:string;
 @IsNotEmpty({message:'La fecha de nacimiento es requerida'})
 fecha_nacimiento:Date;
 //estan por default
 fecha_creacion:Date;
 activo:boolean
}

