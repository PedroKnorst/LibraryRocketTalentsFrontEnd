import React from 'react';
import { ButtonClose, ContainerBookModal, BookModal, ContainerTable } from '../style';
import Close from '../../../assets/svg/Close';
import HistoryLoans from '../../../components/Table';
import { Book } from '../../../interfaces/book';
import { useParams } from 'react-router-dom';
import { getBook } from '../../../services/books';

const BookHistory = ({ dataTestId }: { dataTestId?: string }) => {
  const { id } = useParams();
  const [data, setData] = React.useState<Book | null>(null);

  React.useEffect(() => {
    getBook(`${id}`).then(res => {
      setData(res.data);
    });
  }, [id]);

  return (
    <ContainerBookModal data-testid={dataTestId}>
      <BookModal>
        <ButtonClose to="/home/biblioteca">
          <Close />
        </ButtonClose>
        <ContainerTable>
          <h2 style={{ justifySelf: 'start' }}>Histórico de empréstimos do livro</h2>
          {data && <HistoryLoans bookTitle={false} loans={data?.rentHistory} />}
        </ContainerTable>
      </BookModal>
    </ContainerBookModal>
  );
};

export default BookHistory;
