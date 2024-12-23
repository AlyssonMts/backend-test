import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../models/tag.model';
import { CreateTagDto, TagParameters } from './tag.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class TagService {
  private jwtSecret: string;

  constructor(
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
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
   * Criação de uma nova tag.
   */
  async create(tagData: CreateTagDto, request: Request): Promise<Tag> {
    const userId = await this.extractUserIdFromToken(request);

    const createdTag = new this.tagModel({
      ...tagData,
      userId,
    });

    return createdTag.save();
  }

  /**
   * Busca de todas as tags baseadas nos parâmetros de consulta.
   */
  async findAll(query: TagParameters, request: Request): Promise<Tag[]> {
    const where: any = {};

    if (query.name) {
      where.name = { $regex: query.name, $options: 'i' };
    }

    const userId = await this.extractUserIdFromToken(request);
    where.userId = userId;

    return this.tagModel.find(where).exec();
  }

  /**
   * Atualização de uma tag existente.
   */
  async update(id: string, tagData: Partial<CreateTagDto>, request: Request): Promise<Tag> {
    const userId = await this.extractUserIdFromToken(request);

    const tag = await this.tagModel.findOne({ _id: id, userId }).exec();
    if (!tag) {
      throw new HttpException(
        `Tag with id '${id}' not found or unauthorized`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(tag, tagData);
    return tag.save();
  }

  /**
   * Exclusão de uma tag.
   */
  async delete(id: string, request: Request): Promise<void> {
    const userId = await this.extractUserIdFromToken(request);

    const tag = await this.tagModel.findOne({ _id: id, userId }).exec();
    if (!tag) {
      throw new HttpException(
        `Tag with id '${id}' not found or unauthorized`,
        HttpStatus.NOT_FOUND,
      );
    }

    await tag.deleteOne();
  }
}