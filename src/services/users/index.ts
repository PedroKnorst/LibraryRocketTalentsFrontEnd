import { User } from '../../interfaces/user';
import { api } from '../api';

export const postUser = async (body: User) => await api.post('/users', body);
