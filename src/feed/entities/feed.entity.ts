import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//snake case recommended
@Entity('feeds')
export class Feed {
  @ApiProperty({
    example: '9fd47ea-f426-42be-8ebb-17e107c350a4',
    description: 'Data entry id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  //each feed refers to one minute trading span.
  //timestamp is referenced to unix timestamp in seconds

  @ApiProperty({
    example: 1725882590,
    description: 'Timestamp',
    default: 0,
  })
  @Column('int', { default: 0 })
  timestamp: number;

  @ApiProperty({
    example: 200.02,
    description:
      'Maximum price that was traded for given product and timestamp',
    default: 0,
  })
  @Column('float', { default: 0 })
  maximum: number;

  @ApiProperty({
    example: 50.05,
    description:
      'Minimum price that was traded for given product and timestamp',

    default: 0,
  })
  @Column('float', { default: 0 })
  minimum: number;

  @ApiProperty({
    example: 70.07,
    description: 'Closing price for given product and timestamp',
    default: 0,
  })
  @Column('float', { default: 0 })
  close: number;

  @ApiProperty({
    example: 80.08,
    description: 'Opening price for given product and timestamp',
    default: 0,
  })
  @Column('float', { default: 0 })
  open: number;

  //N feed -> 1 product
  // @ManyToOne(() => Product, (product) => product.feed, {
  //   onDelete: 'CASCADE', //that is the key to enable cascade deletion
  // })
  // product: Product;
}
