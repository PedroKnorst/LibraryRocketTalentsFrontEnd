import { User } from '../../interfaces/user';
import { api } from '../api';

export const getUser = async (acc: string) => api.get('/users/' + acc);

export const postUser = async (body: User) => api.post('/users', body);
