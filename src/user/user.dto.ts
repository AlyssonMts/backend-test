import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUserDto {
@IsString()
@IsNotEmpty()
username: string;

@IsString()
@IsNotEmpty()
password: string;
}

export interface CreateUserResponse {
username: string;
password: string;
}
 
