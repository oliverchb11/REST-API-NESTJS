
import { UsuarioI } from './../interfaces/usuario.interface';
import { Injectable, Res, HttpStatus, Req, NotFoundException } from '@nestjs/common';
import { request, response, json } from 'express';
import { UsuarioC } from '../dto/usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";



@Injectable()
export class UsuarioService {
public usuario:UsuarioC[];

constructor(@InjectModel('Usuarios') private readonly uM :Model<UsuarioI>){}

async getUsuarios(@Res() res=response):Promise<any>{
try {
    const usuarioDB = await this.uM.find(); 
    return res.status(HttpStatus.OK).json({
        ok:true,
        usuarios:usuarioDB
    });
} catch (error) {
    console.log(error)
    return res.status(HttpStatus.NOT_FOUND).json({
        ok:false,
        msg:'Error del servidor'
    });
}
}

async getUsuario(@Res()res = response,id:string):Promise<any>{
try {
    const usuarioDB = await this.uM.findById(id);
    if(!usuarioDB){
        return res.status(HttpStatus.NOT_FOUND).json({
            ok:false,
            msg:'el usuario no existe'
        });
    }
    return res.status(HttpStatus.OK).json({
        ok:true,
        usuario:usuarioDB
    })
} catch (error) {
    console.log(error);
    return res.status(HttpStatus.NOT_FOUND).json({
        ok:false,
        msg:'Error del servidor'
    });
}
}

async postUsuario(@Req() req=request,@Res() res=response,usuario:UsuarioC):Promise<any>{
    try {
     
        //validacion de correo
        const correo = usuario.correo;
        const emailDB = await this.uM.findOne({correo});
        if(emailDB){
            return res.status(HttpStatus.UNAUTHORIZED).json({
                ok:false,
                msg:'El correo ya esta registrado'

            });
        }
        //encriptacion de la contraseña
        const usuarioDB = new this.uM(usuario);
          await usuarioDB.save();
        return res.status(HttpStatus.OK).json({
            ok:true,
            msg:'Usuario creado correctamente',
            usuario:usuarioDB
        })
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            ok:false,
            msg:'Error interno del servidor'
        })
    }
}

async putUsuario(@Req() req=request,@Res() res=response,usuario:UsuarioC, id:string):Promise<any>{
            
   try {
        //validacion del usuario
        const idDB = await this.uM.findById(id);
        if(!idDB){
            return res.status(HttpStatus.UNAUTHORIZED).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }

       //validacion de correo
       const correo = usuario.correo;
       const emailDB = await this.uM.findOne({correo});
    if(emailDB !== correo){
        const correos = usuario.correo;
        const emailDBs = await this.uM.findOne({correos});
        if(emailDBs){
 
            return res.status(HttpStatus.UNAUTHORIZED).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }
    }

       //actualización
       const usuarioDB = await this.uM.findByIdAndUpdate(id,usuario,{new:true})
       return res.status(HttpStatus.OK).json({
           ok:true,
           msg:'Usuario Actualizado correctamente',
           usuario:usuarioDB
       });
   } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok:false,
        msg:'Error interno del servidor'
    });
   }
}

async deleteUsuario(@Req() req=request,@Res() res=response, id):Promise<any>{
    try {
                //validacion del usuario
                const idDB = await this.uM.findById(id);
                console.log(id);
                if(!idDB){
                    return res.status(HttpStatus.UNAUTHORIZED).json({
                        ok:false,
                        msg:'El usuario no existe'
                    })
                }
            const usuarioDB = await this.uM.findByIdAndRemove(id);
            return res.status(HttpStatus.OK).json({
                ok:true,
                msg:`El usuario con id ${id} fue eliminado correctamente`
            })
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            ok:false,
            msg:'Error interno del servidor'
        })
    }
}

}
