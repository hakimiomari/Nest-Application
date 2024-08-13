import { Body, Controller, Delete, Get, Param, ParseIntPipe, ValidationPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){};

    @Get() // get users
    findAll(@Query('role') role?: 'INTERN' | 'USER' | 'ADMIN'){
        return this.usersService.findAll(role);
    }

    @Get(':id') // get users/:id
    findOne(@Param('id',ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() // post users
    create(@Body(ValidationPipe) createUserDto:CreateUserDto ) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id') // update users/:id
    update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id,updateUserDto);
    }

    @Delete(':id') // delete users/:id
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }

}
