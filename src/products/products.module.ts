import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  //an array with all the entities, insert them here to be created in our database
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  exports: [ProductsService],
})
export class ProductsModule {}
