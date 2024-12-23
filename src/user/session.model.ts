import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ collection: 'session' })
export class Session {
  @Prop({ required: true, unique: true, default: () => new mongoose.Types.ObjectId() })
  id: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  userId: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);