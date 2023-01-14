import { ContactCategory } from './contact.category.enum';

export class Contact {
  id!: string;
  name!: string;
  lastName!: string;
  phone!: string;
  email!: string;
  category!: ContactCategory;
}
