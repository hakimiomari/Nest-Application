import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService,private jwtService:JwtService){}

    async findAllUsers(){
        return this.prisma.user.findMany();
    }
    async findUserById(id:number){
        const user = this.prisma.user.findUnique({
            where:{
                id:id,
            }
        })

        delete (await user).password;
        return user;
    }

    // update user
    async updateUser(dto:any){
        const user = this.prisma.user.findUnique({
            where:{
                id:dto.id,
            },
            data:{
                name: dto.name,
                email: dto.email,
                profile: dto.profile
            }
        })
        console.log(user)
    }

    // find usre by token
    async findUserByToken(token:string){
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.SECRET_KEY,
        });
        const user = await this.prisma.user.findUnique({
            where:{
                id:payload.sub,
            }
        })

        delete user.password;
        return user;
    }
}
