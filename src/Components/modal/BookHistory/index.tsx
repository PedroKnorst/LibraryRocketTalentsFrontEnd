import React from 'react';
import { ButtonClose, ContainerBookModal, BookModal, ContainerTable } from '../style';
import Close from '../../../assets/svg/Close';
import HistoryLoans from '../../../components/Table';
import { Book } from '../../../interfaces/book';
import { useParams } from 'react-router-dom';
import { getBook } from '../../../services/books';

const BookHistory = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<Book | null>(null);

  React.useEffect(() => {
    getBook(`${id}`).then(res => {
      setData(res.data);
    });
  }, [id]);

  if (data)
    return (
      <ContainerBookModal>
        <BookModal>
          <ButtonClose to="/home/biblioteca">
            <Close />
          </ButtonClose>
          <ContainerTable>
            <h2 style={{ justifySelf: 'start' }}>Histórico de empréstimos do livro</h2>
            <HistoryLoans bookTitle={false} loans={data?.rentHistory} />
          </ContainerTable>
        </BookModal>
      </ContainerBookModal>
    );
  else return null;
};

export default BookHistory;
