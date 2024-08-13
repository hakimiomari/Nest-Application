import { IsEmail,IsEnum, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN','USER', 'ADMIN'],{
        message : 'Valid role is required.',
    })
    role: 'INTERN' | 'USER' | 'ADMIN';
}