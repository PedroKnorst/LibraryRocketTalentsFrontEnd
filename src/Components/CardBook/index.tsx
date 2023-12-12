import { ContainerBookStyle } from './style';
import { Book } from '../../interfaces/book';

interface Props {
  data: Book;
  dataTestId?: string;
}

const ContainerBook = ({ data, dataTestId }: Props) => {
  return (
    <ContainerBookStyle data-testid={dataTestId} to={`livro/${data.id}`}>
      <img src={`http://localhost:3001/static/${data.image}`} alt={data.title} />
      <h2>{data.title}</h2>
    </ContainerBookStyle>
  );
};

export default ContainerBook;
