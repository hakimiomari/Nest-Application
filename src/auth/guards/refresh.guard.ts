import { CanActivate, ExecutionContext,Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private jwtService:JwtService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = await this.extractRefreshTokenFromHeader(request);
    if(!token) throw new UnauthorizedException();
    try{
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.REFRESH_KEY,
        });
        request['user'] = payload;
    }catch(error){
      console.log(error)
        throw new UnauthorizedException();
    }

    return true;
  }

  async extractRefreshTokenFromHeader(request:Request){
    const [type,token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
