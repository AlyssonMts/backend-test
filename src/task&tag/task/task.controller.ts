import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { CreateTaskDto, TaskParameters } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Criação de uma nova tarefa.
   */
  @Post()
  async create(@Request() req, @Body() taskData: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(taskData, req);
  }

  /**
   * Busca de todas as tarefas com base nos parâmetros.
   */
  @Get()
  async findAll(@Query() query: TaskParameters, @Request() req): Promise<Task[]> {
    return this.taskService.findAll(query, req);
  }

  /**
   * Atualização de uma tarefa existente.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() taskData: Partial<CreateTaskDto>, 
    @Request() req
  ): Promise<Task> {
    return this.taskService.update(id, taskData, req);
  }

  /**
   * Exclusão de uma tarefa.
   */
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    return this.taskService.delete(id, req);
  }
}