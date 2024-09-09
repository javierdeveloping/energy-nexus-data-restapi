import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

//rename table
@Entity('products')
export class Product {
  @ApiProperty({
    example: '9fd47ea-f426-42be-8ebb-17e107c350a4',
    description: 'Product Id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'CO2 emission futures, expiration on September 20, 2024',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 'co2-futures-sep-20-2024',
    description: 'Product SLUG - for SEO',
    uniqueItems: true,
  })
  @Column({ type: 'text', unique: true })
  slug: string;

  @ApiProperty({
    example: 'futures',
    description: "Product type:  ['futures','cfd','stock','out of standard']",
  })
  @Column({ type: 'text' })
  type: string; //H,M,U

  //feed
  // @OneToMany(() => Feed, (feed) => feed.product, {
  //   cascade: true,
  //   eager: true,
  // })
  // feed?: Feed[];

  // //Get user when finding products due to eager is equal to true
  // @ManyToOne(() => User, (user) => user.product, { eager: true })
  // user: User;

  //en lugar de ponerlo en el create
  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    //slug is mandatory, we always have the value if we are updating the registry

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
