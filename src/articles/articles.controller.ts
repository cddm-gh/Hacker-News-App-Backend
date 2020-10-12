import { Controller, Delete, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { PaginationOptionsDTO } from 'src/common/dto/query-pagination.dto';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Get()
  async findAll(@Query() { offset, limit }: PaginationOptionsDTO) {
    const articles = await this.articlesService.findAll(offset, limit);
    return { articles };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(id);
    if (!article) throw new NotFoundException(`Article with id: "${id}" not found`);
    return article;
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    const deletedArticle = await this.articlesService.delete(id);
    if (!deletedArticle) throw new NotFoundException(`Article with id: "${id}" was not found`);
    return { deletedArticle };
  }
}
