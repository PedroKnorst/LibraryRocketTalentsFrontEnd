import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BookInfomations from '.';

const book = {
  id: '2',
  title: 'Hereges de Duna',
  author: 'Frank Herbert',
  genre: 'Ficção Cientifica',
  status: {
    isActive: true,
    description: '',
  },
  isBorrowed: false,
  image: 'livro02.png',
  systemEntryDate: '02/01/2020',
  synopsis:
    'Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
  rentHistory: [],
};

describe('<BookInfomations />', () => {
  it('should render the component', () => {
    render(<BookInfomations data={book} dataTestId="bookInfosModal" />, { wrapper: BrowserRouter });

    const bookInfosModal = screen.getByTestId('bookInfosModal');

    expect(bookInfosModal).toBeInTheDocument();
  });
});
