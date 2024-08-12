import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){};

    @Get() // get users
    findAll(@Query('role') role?: 'INTERN' | 'USER' | 'ADMIN'){
        return this.usersService.findAll(role);
    }

    @Get(':id') // get users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post() // post users
    create(@Body() user: {name: string, email: string, role: 'INTERN' | 'USER' | 'ADMIN'}) {
        return this.usersService.create(user);
    }

    @Patch(':id') // update users/:id
    update(@Param('id') id: string, @Body() updateUser: {}) {
        return {id,...updateUser};
    }

    @Delete(':id') // delete users/:id
    remove(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }

}
