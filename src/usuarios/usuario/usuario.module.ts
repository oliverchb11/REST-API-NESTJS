
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from '@nestjs/config';
import { UsuarioShema } from '../schemas/usuario.schemas';
@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath:'.env'
      }),
      MongooseModule.forFeature([{
        name:'Usuarios',schema:UsuarioShema
      }])
    ],
    controllers: [ UsuarioController],
    providers: [ UsuarioService],
   
  })
export class UsuarioModule {}
