import React from 'react';
import { ButtonClose, ContainerBookModal, BookModal, ContainerTable } from '../style';
import Close from '../../../assets/svg/Close';
import HistoryLoans from '../../../components/Table';
import { useParams } from 'react-router-dom';
import { getBook } from '../../../services/books';
import { Loan } from '../../../interfaces/history';

const BookHistory = ({ dataTestId }: { dataTestId?: string }) => {
  const { id } = useParams();
  const [data, setData] = React.useState<Loan[]>([]);

  React.useEffect(() => {
    if (id)
      getBook(id).then(res => {
        setData(res.data.rentHistory);
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
          <HistoryLoans bookTitle={false} loans={data} />
        </ContainerTable>
      </BookModal>
    </ContainerBookModal>
  );
};

export default BookHistory;
