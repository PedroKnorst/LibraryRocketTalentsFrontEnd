import {
  ButtonClose,
  BookModal,
  ContainerBookButtons,
  CoverBook,
  EditButton,
  HistoryButton,
  ActiveButton,
  LinkBorrow,
  TextBook,
  ContainerDataInactive,
  ContainerInactiveContent,
} from '../style';
import { putBook } from '../../../services/books';
import Close from '../../../assets/svg/Close';
import BookSvg from '../../../assets/svg/BookSvg';
import { Book } from '../../../interfaces/book';

interface Props {
  reloadContent: () => void;
  data: Book;
}

const BookIsInactive = ({ data, reloadContent }: Props) => {
  function activeBook() {
    if (data.id)
      putBook(data.id, {
        ...data,
        status: { isActive: true, description: '' },
      }).then(res => {
        return res.data;
      });
    alert('Livro ativado novamente!');
    reloadContent();
  }

  return (
    <BookModal data-testid="modalBookIsInactive">
      <ButtonClose to="/home/biblioteca">
        <Close />
      </ButtonClose>
      <CoverBook src={`http://localhost:3001/static/${data.image}`} alt="livro" />
      <LinkBorrow to={''} active={`${false}`}>
        <BookSvg />
        Emprestar
      </LinkBorrow>
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
        <ActiveButton onClick={activeBook} data-testid="submitButton">
          Ativar
        </ActiveButton>
        <HistoryButton to={`/home/biblioteca/historico/${data.id}`}>Histórico</HistoryButton>
      </ContainerBookButtons>
      <ContainerDataInactive>
        <h2>Informações da inativação</h2>
        <ContainerInactiveContent>
          <h3>Motivo</h3>
          <p>{data.status.description}</p>
        </ContainerInactiveContent>
      </ContainerDataInactive>
    </BookModal>
  );
};

export default BookIsInactive;
