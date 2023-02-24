import { Substance, User } from './types';

export const SUBSTANCES: Substance[] = [
  {
    id: 'd91a836b-7099-4800-e1c1-078b767d1427',
    name: 'GHB',
    nickname: 'G',
    fullName: 'Gamma Hydroxybutyrate',
    dose: {
      min: 1.5,
      max: 3.5,
      unit: 'ml'
    },
    duration: {
      min: 1,
      max: 3
    }
  },
  {
    id: '6df1d036-9b93-4bb1-cd69-6f66fad5bbe8',
    name: 'Amphetamine',
    nickname: 'Speed',
    fullName: 'Amphetamine',
    dose: {
      unit: 'mg'
    }
  }
];

export const USERS: User[] = [
  {
    id: '6b2e34fa-72f0-4297-b2a1-993cb5f97645',
    name: 'User 1'
  },
  {
    id: '442b0ee6-21b3-4850-c132-06265aeaf47c',
    name: 'User 2'
  }
];
