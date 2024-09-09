import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Feed } from './entities';

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  imports: [TypeOrmModule.forFeature([Feed]), AuthModule],
})
export class FeedModule {}
