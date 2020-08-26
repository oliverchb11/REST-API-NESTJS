import {Strategy  } from "passport-local";
import {  PassportStrategy} from "@nestjs/passport";
import { Injectable,UnauthorizedException } from "@nestjs/common";
import { AuthUsuarioService } from './auth-usuario.service';

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy){

}