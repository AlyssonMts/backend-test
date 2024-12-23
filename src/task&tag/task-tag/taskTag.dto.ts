import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateTaskTag {
@IsUUID()
@IsOptional()
id: string;

@IsString()
@IsNotEmpty()
tagId: string;

@IsString()
@IsNotEmpty()
taskId: string;
}