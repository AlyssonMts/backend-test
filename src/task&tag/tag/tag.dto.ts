import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateTagDto {
@IsUUID()
@IsOptional()
id: string;

@IsString()
@MinLength(3)
@MaxLength(50)
@IsNotEmpty()
name: string;

@IsString()
@MinLength(3)
@MaxLength(50)
@IsNotEmpty()
color: string;

@IsString()
@IsNotEmpty()
userId:string;
}

export interface TagParameters {
color: string;
name: string;
userID: string;
}