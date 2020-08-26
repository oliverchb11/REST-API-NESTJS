import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuarios/usuario/usuario.module';
import { ConfigModule } from "@nestjs/config";
import { AuthUsuarioModule } from './auth/auth-usuario/auth-usuario.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    UsuarioModule,
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
    MongooseModule.forRoot(process.env.URI,{
      useNewUrlParser:true,
      useCreateIndex:true
    }),
    AuthUsuarioModule
  
  ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
