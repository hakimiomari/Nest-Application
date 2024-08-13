import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'USER',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      role: 'USER',
    },
    {
      id: 5,
      name: 'Mike Davis',
      email: 'mike.davis@example.com',
      role: 'ADMIN',
    },
  ];

  findAll(role: 'INTERN' | 'USER' | 'ADMIN') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
    
      if(roleArray.length === 0){
        throw new NotFoundException("User Role Not Found")
      }
      return roleArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    
    if(!user) throw new NotFoundException("User Not Found")
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      const updatedUser = { ...this.users[index], ...updateUserDto };
      this.users[index] = updatedUser;
      return updatedUser;
    }
    return null;
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
