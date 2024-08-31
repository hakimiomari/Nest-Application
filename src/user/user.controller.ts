import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthDto } from 'src/auth/dto';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(JwtGuard)
    @Get()
    async getAllUsers(){
        return this.userService.findAllUsers();
    }
    @UseGuards(JwtGuard)
    @Get('user')
    async getUser(@Request() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.findUserByToken(token);
    }
        // find user by id
        @UseGuards(JwtGuard)
    @Get(':id')
    async getUserProfile(@Param('id') id:number){
        return this.userService.findUserById(id);
    }

    // update user 
    @UseGuards(JwtGuard)
    @Patch('user/update')
    async updateUser(@Body() dto:any){
        console.log(dto)
        // return this.userService.updateUser(dto);
    }
}
