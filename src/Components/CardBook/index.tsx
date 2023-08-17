import { ContainerBookStyle } from './style';
import { Book } from '../../interfaces/book';

interface Props {
  data: Book;
}

const ContainerBook = ({ data }: Props) => {
  return (
    <ContainerBookStyle to={`livro/${data.id}`}>
      <img src={`${data.image}`} alt={data.title} />
      <h2>{data.title}</h2>
    </ContainerBookStyle>
  );
};

export default ContainerBook;
