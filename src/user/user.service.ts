import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async findUserById(id:number){
        return this.prisma.user.findUnique({
            where:{
                id:id,
            }
        })
    }
}