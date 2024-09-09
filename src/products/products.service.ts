import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    console.log(createProductDto);
    console.log(user);
    try {
      const { ...productDetails } = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        // user,
      });

      //save here saves both product and other objected related to it, feed
      await this.productRepository.save(product);
      console.log(product);

      return { ...product };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
    });
    return products;
  }

  async findOne(term: string) {
    let product: Product;

    console.log(term);
    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      //query builder will protect me against SQL injections
      const queryBuilder = this.productRepository.createQueryBuilder('prod'); //alias for the Product table

      product = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();

      // product = await this.productRepository.findOneBy({ slug: term });
    }

    if (!product) {
      throw new NotFoundException(`Product with ${term} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    console.log(user);
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    // product.user = user;
    //query runner allow me to execute many sql statements, and if one of them fail i can rollback the whole transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); //important await, make sure the connection is well established
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(product);
      //if there are no errors up to this point, commit the transaction
      //with query manager the database is not modified, only when we call commitTransaction changes are applied to the database
      await queryRunner.commitTransaction();
      await queryRunner.release();

      /*     await this.productRepository.save(product); */ //no necesario ya
      return await this.findOnePlain(product.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findOnePlain(term: string) {
    const product = await this.findOne(term);
    return product;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    //cascade deletion
    return await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: any) {
    console.log(error);
    this.logger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Error here');
  }

  //future use with seed feature
  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
