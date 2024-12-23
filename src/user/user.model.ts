import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);