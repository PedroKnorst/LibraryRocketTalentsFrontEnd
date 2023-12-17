import { Book } from '../../interfaces/book';
import { api } from '../api';

export const getBooks = async () => api.get('/books');

export const getBook = async (id: string) => api.get('/books/' + id);

export const postBook = async (body: Book) => api.post('/books', body);

export const getHistory = async () => api.get('/books/history');

export const putBook = async (id: string, body: Book) => api.patch('/books/' + id, { ...body });

export const postCover = async (body: FormData) => api.post('/photos', body);
