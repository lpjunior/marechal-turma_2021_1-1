import { ContactCategory } from './contact.category.enum';

export class ContactModel {
  id!: string;
  name!: string;
  lastName!: string;
  phone!: string;
  email!: string;
  imageUrl!: string;
  category!: ContactCategory;
}
