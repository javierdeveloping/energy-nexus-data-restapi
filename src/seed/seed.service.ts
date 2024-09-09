import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async executeSeed(user: User) {
    console.log(user);
    await this.deleteTables();

    const userSeed = await this.insertUsers();

    if (userSeed.roles.includes(ValidRoles.admin)) {
      await this.insertNewProducts(userSeed);
    }
    return 'Seed executed successfully';
  }

  //destrucción ordenada de tablas
  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user)); //preparo para grabarlo pero falta el save
    });

    //lo grabamos
    const dbusers = await this.userRepository.save(users);

    return dbusers[0];
  }

  private async insertNewProducts(user: User) {
    //await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    console.log('Number of products: ', products.length);

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);
    return true;
  }
}
