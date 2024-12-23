import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { CreateTagDto, TagParameters } from './tag.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TagService } from './tag.service';
import { Tag } from '../models/tag.model';

@UseGuards(AuthGuard)
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * Criação de uma nova tag.
   */
  @Post()
  async create(@Request() req, @Body() tagData: CreateTagDto): Promise<Tag> {
    return await this.tagService.create(tagData, req);
  }

  /**
   * Busca de todas as tags com base nos parâmetros.
   */
  @Get()
  async findAll(@Query() query: TagParameters, @Request() req): Promise<Tag[]> {
    return this.tagService.findAll(query, req);
  }

  /**
   * Atualização de uma tag existente.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() tagData: Partial<CreateTagDto>, 
    @Request() req
  ): Promise<Tag> {
    return this.tagService.update(id, tagData, req);
  }

  /**
   * Exclusão de uma tag.
   */
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    return this.tagService.delete(id, req);
  }
}