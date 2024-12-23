import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task/task.controller';
import { TasktagController } from './task-tag/taskTag.controller';
import { Task, TaskSchema } from './models/task.model';
import { TaskTag, TaskTagSchema } from './models/taskTag.model';
import { Tag, TagSchema } from './models/tag.model';
import { TaskService } from './task/task.service';
import { TasktagService } from './task-tag/taskTag.service';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: TaskTag.name, schema: TaskTagSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
    AuthModule,
  ],
  controllers: [TaskController, TasktagController, TagController],
  providers: [TaskService, TasktagService, TagService],
})
export class TaskTagModule {}