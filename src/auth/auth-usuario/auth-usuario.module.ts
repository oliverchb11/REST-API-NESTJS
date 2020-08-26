import { Module } from '@nestjs/common';
import { AuthUsuarioController } from './auth-usuario.controller';
import { AuthUsuarioService } from './auth-usuario.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule  } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from './local.strategy';
import { UsuarioService } from '../../usuarios/usuario/usuario.service';
import { UsuarioModule } from '../../usuarios/usuario/usuario.module';
@Module({
    imports:[
    UsuarioModule,
        ConfigModule.forRoot({
            envFilePath:'.env'
        }),
        MongooseModule.forRoot(process.env.URI,{
            useNewUrlParse:true
        }),
        JwtModule.register({
            secret:process.env.SECRET_KEY
        }),
        PassportModule,
    ],
    controllers:[AuthUsuarioController],
    providers:[AuthUsuarioService,LocalStrategy],
})
export class AuthUsuarioModule {}
