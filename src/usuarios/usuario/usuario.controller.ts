import { Controller, Get, Param, Res, Req, Post, Body, Put, Delete, HttpStatus, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioC } from '../dto/usuario.dto';
import { response } from 'express';

@Controller('api/usuario')
export class UsuarioController {

    constructor(private uS : UsuarioService){}

    @Get()
    async getUsuarios(@Res() res=response){
        return await this.uS.getUsuarios(res);
    }

    @Get(':id')
    async getUsuario(@Res() res=response,@Param('id') id:string){
        return await this.uS.getUsuario(res,id);
    }

    @Post()
    @UsePipes(new ValidationPipe({transform:true}))
    async postUsuario(@Req() req,@Res() res,@Body() usuario:UsuarioC){
        return await this.uS.postUsuario(req,res,usuario)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({transform:true}))
     async putUsuario(@Req() req,@Res() res,@Body() usuario:UsuarioC,@Param('id') id:string){
       return await this.uS.putUsuario(req,res,usuario,id);
    }

    @Delete(':id')
    async deleteUsuario(@Req() req,@Res() res , @Param('id') id){
        return await this.uS.deleteUsuario(req,res,id);
    }
}
