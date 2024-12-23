import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskTag, TaskTagDocument } from '../models/taskTag.model';
import { Tag, TagDocument } from '../models/tag.model';
import { Task, TaskDocument } from '../models/task.model';
import { CreateTaskTag } from './taskTag.dto';

@Injectable()
export class TasktagService {
  constructor(
    @InjectModel(TaskTag.name) private readonly taskTagModel: Model<TaskTagDocument>,
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
  ) {}

  async createTaskTag(taskTagData: CreateTaskTag): Promise<TaskTag> {
    const createdTaskTag = new this.taskTagModel({
      taskId: taskTagData.taskId,
      tagId: taskTagData.tagId,
    });

    return createdTaskTag.save();
  }

  async findAll(): Promise<TaskTag[]> {
    return this.taskTagModel.find().exec();
  }

  async findTasksByTag(tagId: string): Promise<Task[]> {
    return this.taskModel.find({ tags: tagId }).populate('tags').exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskTagModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new HttpException(
        `Relationship with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}