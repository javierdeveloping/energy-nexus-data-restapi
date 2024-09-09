import { ValidRoles } from 'src/auth/interfaces';
import * as bcrypt from 'bcrypt';
import { PRODUCT_TYPES } from 'src/products/dto/create-product.dto';

interface SeedData {
  users: SeedUser[];
  products: SeedProduct[];
}

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: ValidRoles[];
}

interface SeedProduct {
  title: string;
  description?: string;
  slug?: string;
  type: PRODUCT_TYPES;
}

export const initialData: SeedData = {
  users: [
    {
      email: 'admin@admin.com',
      password: bcrypt.hashSync('Abc123456', 10),
      fullName: 'Admin Mickey',
      roles: [ValidRoles.user, ValidRoles.admin],
    },
    {
      email: 'user@user.com',
      password: bcrypt.hashSync('Abc123456', 10),
      fullName: 'User Miney',
      roles: [ValidRoles.user],
    },
  ],
  products: [
    {
      title: 'CO2 futures, September 20 2028 expiration',
      description: 'A future product with expiration date',
      type: PRODUCT_TYPES.FUTURE,
    },
    {
      title: 'Water CFD',
      description: 'A derivative based on water price.',
      type: PRODUCT_TYPES.CFD,
    },
  ],
};
