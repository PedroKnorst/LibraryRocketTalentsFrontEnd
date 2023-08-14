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
} from "../style";
import { putBook } from "../../../services/books";
import Close from "../../../assets/svg/Close";
import BookSvg from "../../../assets/svg/BookSvg";
import { Book } from "../../../interfaces/book";
import { useParams } from "react-router-dom";

interface Props {
  data: Book;
}

const BookIsInactive = ({ data }: Props) => {
  const { account } = useParams();

  function activeBook() {
    if (data.id)
      putBook(data.id, {
        ...data,
        status: { isActive: true, description: "" },
      }).then((res) => {
        return res.data;
      });
    alert("Livro ativado novamente!");
    location.reload();
  }

  return (
    <BookModal>
      <ButtonClose to="..">
        <Close />
      </ButtonClose>
      <CoverBook src={`${data.image}`} alt="livro" />
      <LinkBorrow to={""} active={`${false}`}>
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
        <EditButton to={`/${account}/editar/${data.id}`}>Editar</EditButton>
        <ActiveButton onClick={activeBook}>Ativar</ActiveButton>
        <HistoryButton to={`../historico/${data.id}`}>Histórico</HistoryButton>
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
