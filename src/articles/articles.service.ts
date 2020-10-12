import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';
import { Model, Connection } from 'mongoose';
import { CreateArticleDTO } from './dto/article.dto';
import { IArticle } from './interfaces/article.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import fetch from 'node-fetch';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
    @InjectConnection() private readonly connection: Connection
  ) {
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: 'fetch_articles_cron' })
  async fetchArticles() {
    try {
      console.log('Fetching new articles...');
      const URL = this.configService.get<string>('apiUrl');
      const response = await fetch(URL);
      const { hits: articles } = await response.json();
      await this.saveArticlesInDB(articles);
    } catch (error) {
      console.error(error);
    }
  }

  async saveArticlesInDB(articles) {
    const cleanArticles = await this.getUniqueListBy(articles, 'title');
    await Promise.all(cleanArticles.map(article => this.create(article)));
    console.log('The Articles has been saved into the DB');
  }

  async getUniqueListBy(articles: IArticle[], key: string): Promise<IArticle[]> {
    return [...new Map(articles.map(article => [article[key], article])).values()];
  }

  async findAll(offset, limit): Promise<IArticle[]> {
    return this.articleModel
      .find({
        title: { $ne: null },
      }, null, { skip: isNaN(offset) ? 0 : +offset, limit: isNaN(limit) ? 20 : +limit })
      .sort({ created_at: 'desc' });
  }

  async findOne(id: string): Promise<IArticle> {
    return this.articleModel.findOne({ _id: id });
  }

  async create(createArticle: CreateArticleDTO) {
    const article = new this.articleModel(createArticle);
    await article.save();
  }

  async delete(id: string) {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id);
    return deletedArticle;
  }
}
