import { HttpStatus, Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../models/task.model';
import { CreateTaskDto, TaskParameters, TaskPriorityEnum, TaskStatusEnum } from './task.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class TaskService {
  private jwtSecret: string;

  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  /**
   * Método utilitário para extrair o ID do usuário do token JWT.
   */
  private async extractUserIdFromToken(request: Request): Promise<string> {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new BadRequestException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });
      return decoded.sub;
    } catch {
      throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * Método utilitário para validar campos usando regex.
   */
  private validateField(value: string, regex: RegExp, fieldName: string): void {
    if (!regex.test(value)) {
      throw new BadRequestException(`${fieldName} inválido`);
    }
  }

  /**
   * Criação de uma nova tarefa.
   */
  async create(taskData: CreateTaskDto, request: Request): Promise<Task> {
    const userId = await this.extractUserIdFromToken(request);

    const createdTask = new this.taskModel({
      title: taskData.title,
      status: TaskStatusEnum.IN_PROGRESS,
      description: taskData.description,
      priority: taskData.priority ?? TaskPriorityEnum.ONE,
      expirationDate: taskData.expirationDate,
      userId,
    });

    return createdTask.save();
  }

  /**
   * Busca de todas as tarefas baseadas nos parâmetros de consulta.
   */
  async findAll(query: TaskParameters, request: Request): Promise<Task[]> {
    const where: any = {};

    if (query.title) {
      const titleRegex = /^[a-zA-Zà-úÀ-Ú]+(([',. -][a-zA-Zà-úÀ-Ú ])?[a-zA-Zà-úÀ-Ú]+)*$/;
      this.validateField(query.title, titleRegex, 'Título');
      where.title = { $regex: query.title, $options: 'i' };
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.priority) {
      where.priority = query.priority;
    }

    if (query.expirationDate) {
      where.expirationDate = query.expirationDate;
    }

    const userId = await this.extractUserIdFromToken(request);
    where.userId = userId;

    return this.taskModel.find(where).exec();
  }

  /**
   * Atualização de uma tarefa existente.
   */
  async update(id: string, taskData: Partial<CreateTaskDto>, request: Request): Promise<Task> {
    const userId = await this.extractUserIdFromToken(request);

    const task = await this.taskModel.findOne({ _id: id, userId }).exec();
    if (!task) {
      throw new HttpException(
        `Task with id '${id}' not found or unauthorized`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(task, taskData);
    return task.save();
  }

  /**
   * Exclusão de uma tarefa.
   */
  async delete(id: string, request: Request): Promise<void> {
    const userId = await this.extractUserIdFromToken(request);

    const task = await this.taskModel.findOne({ _id: id, userId }).exec();
    if (!task) {
      throw new HttpException(
        `Task with id '${id}' not found or unauthorized`,
        HttpStatus.NOT_FOUND,
      );
    }

    await task.deleteOne();
  }
}