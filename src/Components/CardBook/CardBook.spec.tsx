import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContainerBook from '.';
import { BrowserRouter } from 'react-router-dom';

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

describe('<ContainerBook />', () => {
  it('should render the component', () => {
    render(<ContainerBook dataTestId="containerBook" data={book} />, { wrapper: BrowserRouter });

    const element = screen.getByTestId('containerBook');

    expect(element).toBeInTheDocument();
  });
});
