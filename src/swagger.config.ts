// src/config/swagger.config.ts

import { DocumentBuilder } from '@nestjs/swagger';

export enum APPLICATION_API_TAGS {
  AUTH = 'Authentication',
  PRODUCTS = 'Products',
  FEED = 'Feed',
  SEED = 'Seed',
}

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Energy Nexus Data')
  .setDescription(
    'All the endpoints offered by Energy Nexus for users creation, and products listing and their historical data feed',
  )
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'access-token', // This name will be used in the @ApiBearerAuth() decorator
  )
  .build();

// Define the tags order explicitly
export const swaggerTags = [
  {
    name: APPLICATION_API_TAGS.AUTH,
    description: 'Operations related to user creation and authentication',
  },
  {
    name: APPLICATION_API_TAGS.PRODUCTS,
    description: 'Operations related to managing financial products',
  },
  {
    name: APPLICATION_API_TAGS.FEED,
    description: 'Operations related to data feed',
  },
  {
    name: APPLICATION_API_TAGS.SEED,
    description: 'Operations related to database seed',
  },
];
