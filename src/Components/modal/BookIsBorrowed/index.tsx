import Close from '../../../assets/svg/Close';
import {
  LinkBorrowed,
  ButtonClose,
  BookModal,
  ContainerBookButtons,
  ContainerDataStudent,
  CoverBook,
  EditButton,
  HistoryButton,
  InactiveButton,
  TextBook,
} from '../style';
import BookSvg from '../../../assets/svg/BookSvg';
import { putBook } from '../../../services/books';
import { Book } from '../../../interfaces/book';

interface Props {
  data: Book;
}

const BookIsBorrowed = ({ data }: Props) => {
  let lastItem = data.rentHistory[data.rentHistory.length - 1];

  const changeBorrow = () => {
    lastItem = {
      bookTitle: lastItem.bookTitle,
      studentName: lastItem.studentName,
      class: lastItem.class,
      withdrawalDate: lastItem.withdrawalDate,
      deliveryDate: new Date().toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
      }),
    };

    data.rentHistory[data.rentHistory.length - 1] = lastItem;

    if (data.id)
      putBook(data.id, { ...data, isBorrowed: false })
        .then(() => {
          alert('Livro devolvido!');
          location.reload();
        })
        .catch(error => console.log(error));
  };

  if (data)
    return (
      <BookModal>
        <ButtonClose to="/home/biblioteca">
          <Close />
        </ButtonClose>
        <CoverBook src={`http://localhost:3001/static/${data.image}`} alt="livro" />
        <LinkBorrowed to={''} onClick={changeBorrow}>
          <BookSvg />
          Devolver
        </LinkBorrowed>
        <TextBook>
          <h2>{data.title}</h2>
          <div>
            <h3>Sinopse</h3>
            <p>{data.synopsis}</p>
          </div>
          <div>
            <h3>Autor</h3>
            <p>{data.author}</p>
          </div>
          <div>
            <h3>Gênero</h3>
            <p>{data.genre}</p>
          </div>
          <div>
            <h3>Data de Entrada</h3>
            <p>{data.systemEntryDate}</p>
          </div>
        </TextBook>
        <ContainerBookButtons>
          <EditButton to={`/home/editar/${data.id}`}>Editar</EditButton>
          <InactiveButton disabled style={{ cursor: 'not-allowed' }}>
            Inativar
          </InactiveButton>
          <HistoryButton to={`/home/biblioteca/historico/${data.id}`}>Histórico</HistoryButton>
        </ContainerBookButtons>
        <ContainerDataStudent>
          <h2>Dados do aluno</h2>
          <div>
            <div>
              <h3>Nome do aluno</h3>
              <p>{lastItem.studentName}</p>
            </div>
            <div>
              <h3>Turma</h3>
              <p>{lastItem.class}</p>
            </div>
            <div>
              <h3>Data de retirada</h3>
              <p>{lastItem.withdrawalDate}</p>
            </div>
            <div>
              <h3>Data de entrega</h3>
              <p>{lastItem.deliveryDate}</p>
            </div>
          </div>
        </ContainerDataStudent>
      </BookModal>
    );
  else return null;
};

export default BookIsBorrowed;
