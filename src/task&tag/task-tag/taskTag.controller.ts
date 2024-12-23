import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTaskTag } from './taskTag.dto';
import { TaskTag } from '../models/tasktag.model';
import { TasktagService } from './taskTag.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasktags')
export class TasktagController {

    constructor(
        private readonly taskTagService: TasktagService
    ){}

    @Post()
    async createTaskTag(@Body() taskTagData: CreateTaskTag): Promise<TaskTag> {
        return await this.taskTagService.createTaskTag(taskTagData)
    }

    @Get()
    findAll() {
        return this.taskTagService.findAll()
    }

    @Get(':id')
    async findTasksByTag(@Param('id') id: string) {
        return this.taskTagService.findTasksByTag(String(id))
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.taskTagService.delete(String(id))
    }
}