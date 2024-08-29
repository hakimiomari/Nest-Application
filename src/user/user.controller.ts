import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(JwtGuard)
    @Get()
    async getAllUsers(){
        return this.userService.findAllUsers();
    }
    @UseGuards(JwtGuard)
    @Get(':id')
    async getUserProfile(@Param('id') id:number){
        return this.userService.findUserById(id);
    }
}
