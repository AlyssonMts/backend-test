import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskTagDocument = TaskTag & Document;

@Schema()
export class TaskTag {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  taskId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tag', required: true })
  tagId: Types.ObjectId;

}

export const TaskTagSchema = SchemaFactory.createForClass(TaskTag);