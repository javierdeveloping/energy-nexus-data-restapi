import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { FeedModule } from './feed/feed.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      //in production synchronize is left as false
      synchronize: true,
      //entities that we create are loaded automatically
      autoLoadEntities: true,
    }),
    AuthModule,
    CommonModule,
    ProductsModule,
    FeedModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
