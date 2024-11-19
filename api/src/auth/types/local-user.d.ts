import { Role } from '../enums/role.enum';

export type LocalUser = {
  id: string;
  name: string;
  role: Role[];
};
