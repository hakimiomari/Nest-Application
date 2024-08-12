import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "ADMIN"
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "USER"
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob.johnson@example.com",
          role: "INTERN"
        },
        {
          id: 4,
          name: "Alice Williams",
          email: "alice.williams@example.com",
          role: "USER"
        },
        {
          id: 5,
          name: "Mike Davis",
          email: "mike.davis@example.com",
          role: "ADMIN"
        }
      ];

      findAll(role: 'INTERN' | 'USER' | 'ADMIN'){
        if(role){
            return this.users.filter(user => user.role === role)
        }
        return this.users
      }

      findOne(id: number){
        return  this.users.find(user => user.id === id)
      }

      create(user:{name: string, email: string, role: 'INTERN' | 'USER' | 'ADMIN'}){
        const newUser = {id: this.users.length + 1, ...user};
        this.users.push(newUser);
        return newUser;
      }

      update(id: number, user:{name?: string, email?: string, role?: 'INTERN' | 'USER' | 'ADMIN'}){
        const index = this.users.findIndex(user => user.id === id);
        if(index >= 0){
            const updatedUser = {...this.users[index],...user};
            this.users[index] = updatedUser;
            return updatedUser;
        }
        return null;
      }

      delete(id:number){
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id)

        return removedUser;
      }
}
