import { Document } from 'mongoose';

export interface UsuarioI extends Document  {
    id?:string,
    nombre:string,
    apellido:string,
    password:string,
    edad:number,
    correo:string,
    fecha_nacimiento:Date,
    fecha_creacion:Date,
    activo:boolean,
}
