/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Model, Response, Server } from 'miragejs';
import { faker } from '@faker-js/faker';
import { User } from '../src/interfaces/user';

export const mockServer = ({ environment = 'test' }) => {
  return new Server({
    environment,
    models: {
      book: Model,
      loan: Model,
      photo: Model,
      user: Model,
    },

    factories: {
      book: Factory.extend({
        id() {
          return faker.string.uuid();
        },
        title() {
          return faker.lorem.sentence();
        },
        author() {
          return faker.person.fullName();
        },
        genre() {
          return faker.word.adjective();
        },
        status: {
          isActive: false,
          description() {
            return faker.lorem.text();
          },
        },
        isBorrowed: false,
        image: 'livro01.png',
        systemEntryDate: '02/01/2020',
        synopsis:
          'Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
        rentHistory: [
          {
            studentName: 'Gustavo Kunde',
            class() {
              return `T${faker.number.int({ min: 1, max: 99 })}`;
            },
            withdrawalDate: faker.date
              .past({ refDate: '2020-01-01T00:00:00.000Z' })
              .toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            deliveryDate() {
              return faker.date
                .future({ refDate: '2020-01-01T00:00:00.000Z' })
                .toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            },
          },
          {
            studentName: 'Douglas Miller',
            class() {
              return `T${faker.number.int({ min: 1, max: 99 })}`;
            },
            withdrawalDate() {
              return faker.date
                .past({ refDate: '2020-01-01T00:00:00.000Z' })
                .toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            },
            deliveryDate() {
              return faker.date
                .future({ refDate: '2020-01-01T00:00:00.000Z' })
                .toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            },
          },
        ],
      }),
      loan: Factory.extend({
        bookTitle() {
          return faker.lorem.sentence();
        },
        studentName() {
          return faker.person.fullName();
        },
        class() {
          return `T${faker.number.int({ min: 1, max: 99 })}`;
        },
        withdrawalDate() {
          return faker.date
            .past({ refDate: '2020-01-01T00:00:00.000Z' })
            .toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        },
        deliveryDate() {
          return faker.date
            .future({ refDate: '2020-01-01T00:00:00.000Z' })
            .toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        },
      }),
      photo: Factory.extend(FormData),
      user: Factory.extend({
        name: 'gx2',
        email: 'gx2tecnologia@gx2.com.br',
        password: 'gx2@123',
      }),
    },

    seeds(server) {
      server.create('book');
      server.create('loan');
      server.create('user');
    },

    routes() {
      this.urlPrefix = 'http://localhost:3001';

      this.get('/books', schema => {
        const books = schema.all('book');

        return books.models;
      });

      this.get('/books/:id', (schema, request) => {
        const id = request.params.id;
        const book = schema.find('book', id);
        if (book) return book.attrs;
        else return Response;
      });

      this.patch('/books/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const book = schema.find('book', id);
        book?.update(attrs);
        book?.reload();

        return Response;
      });

      this.get('/books/history', schema => {
        const history = schema.all('loan');

        return history.models;
      });

      this.post('/books', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.create('book', attrs);
      });

      this.post('/photos', () => {
        return 'image';
      });

      this.post('/users', (schema, request) => {
        const attrs: User = JSON.parse(request.requestBody);

        const users = schema.all('user');

        const findUser = users.models.find(
          (user: any) => user.attrs.email === attrs.email && user.attrs.password === attrs.password
        );

        if (findUser) return findUser.attrs;
        return Response;
      });

      this.delete('/books/:id', (schema, request) => {
        const id = request.params.id;

        schema.find('book', id)?.destroy();
        return Response;
      });
    },
  });
};
