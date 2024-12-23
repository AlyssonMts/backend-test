import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export enum TaskStatusEnum {
IN_PROGRESS = 'IN_PROGRESS',
FINISHED = 'FINISHED',
}

export enum TaskPriorityEnum {
ONE = 1,
TWO = 2,
THREE = 3,
FOUR = 4,
FIVE = 5,
SIX = 6,
SEVEN = 7,
EIGHT = 8,
NINE = 9,
TEN = 10,
}

export class CreateTaskDto {
@IsOptional()
id: string;

@IsString()
@MinLength(3)
@MaxLength(256)
@IsNotEmpty()
title: string;

@IsEnum(TaskStatusEnum)
@IsOptional()
status: string;

@IsString()
@MinLength(5)
@MaxLength(512)
@IsNotEmpty()
description: string;

@IsEnum(TaskPriorityEnum)
@IsOptional()
priority: number;

@IsDateString()
expirationDate: Date;
}

export interface TaskParameters {
title: string;
status: string;
priority: number;
expirationDate: Date;
}