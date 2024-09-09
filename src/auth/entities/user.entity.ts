import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: '9fd47ea-f426-42be-8ebb-17e107c350a4',
    description: 'User id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column('text', { unique: true }) //ver cual soporta postgres
  email: string;

  //with find password is not returned, unless specified
  @Column('text', { select: false })
  password: string;

  @ApiProperty({
    example: 'Javier',
    description: 'Username',
  })
  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  // @OneToMany(() => Product, (product) => product.user)
  // product: Product;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
