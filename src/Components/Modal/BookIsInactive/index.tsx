import {
  ButtonClose,
  ContainerBook,
  ContainerBookButtons,
  CoverBook,
  EditButton,
  HistoryButton,
  ActiveButton,
  LinkBorrow,
  TextBook,
} from "../style";
import { putBook } from "../../../services/books";
import Close from "../../../assets/svg/Close";
import BookSvg from "../../../assets/svg/BookSvg";
import { ContainerDataInactive, ContainerInactiveContent } from "./style";
import { Book } from "../../../UserContext";

interface Props {
  data: Book;
}

const BookIsInactive = ({ data }: Props) => {
  function activeBook() {
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
    <ContainerBook>
      <ButtonClose to="..">
        <Close />
      </ButtonClose>
      <CoverBook
        src={`http://localhost:3001/static/${data.image}`}
        alt="livro"
      />
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
        <EditButton to={`/home/editar/${data.id}`}>Editar</EditButton>
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
    </ContainerBook>
  );
};

export default BookIsInactive;
