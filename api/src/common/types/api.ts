import { ID } from '.';

export type CachedSession = {
  cacheExpiry: number;
  token: ID;
  expires: Date;
  user: SessionUser;
};

export type SessionUser = {
  id: string;
  emailAddress: string;
  role: Role;
};

export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export type ApiType = 'shop' | 'admin';
