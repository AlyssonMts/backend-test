  import { Injectable } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { User, UserDocument } from './user.model';

  @Injectable()
  export class UserRepository {
    constructor(
      @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
      return this.userModel.findOne({ email }).exec();
    }

    async findById(userId: string): Promise<User | null> {
      return this.userModel.findById(userId).exec();
    }

    async create(userData: Partial<User>): Promise<User> {
      const createdUser = new this.userModel(userData);
      return createdUser.save();
    }

    
    async delete(user: User): Promise<void> {
      await this.userModel.deleteOne({ _id: user.id }).exec();
    }

    async findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }
  }