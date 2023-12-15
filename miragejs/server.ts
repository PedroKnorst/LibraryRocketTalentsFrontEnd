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
      photo: Factory.extend({ data: FormData }),
      user: Factory.extend({
        name() {
          return faker.person.firstName();
        },
        email() {
          return faker.internet.email();
        },
        password() {
          return faker.number.int();
        },
      }),
    },

    seeds(server) {
      server.create('book');
      server.create('loan');
      server.create('user');
    },

    routes() {
      this.namespace = 'api';

      this.get('http://localhost:3001/books', schema => {
        return schema.all('book');
      });

      this.get('http://localhost:3001/books/:id', (schema, request) => {
        const id = request.params.id;
        const book = schema.find('book', id);
        return book;
      });

      this.get('http://localhost:3001/books/history', schema => {
        return schema.all('loan');
      });

      this.post('http://localhost:3001/books', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.create('book', attrs);
      });

      this.post('http://localhost:3001/photos', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.create('photo', attrs);
      });

      this.post('http://localhost:3001/users', (schema, request) => {
        const attrs: User = JSON.parse(request.requestBody);

        const users = schema.all('user');

        const findUser = users.filter(user => user.email === attrs.email && user.password === attrs.password);

        return findUser;
      });

      this.delete('http://localhost:3001/books/:id', (schema, request) => {
        const id = request.params.id;

        schema.find('book', id)?.destroy();
        return Response;
      });
    },
  });
};
