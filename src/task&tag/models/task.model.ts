import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  description: string;

  @Prop({ default: 'ONE' })
  priority: string;

  @Prop()
  expirationDate: Date;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);