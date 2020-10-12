import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import configurations from './config/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('environment')} === 'development'` ? 'mongodb://localhost/hacker-news-app' : `mongodb://${configService.get('db.user')}:${configService.get('db.password')}@${configService.get('db.uri')}/${configService.get('db.name')}`
      }),
      inject: [ConfigService]
    }),
    ScheduleModule.forRoot(),
    ArticlesModule,
  ],
  providers: [AppService],
})
export class AppModule { }
