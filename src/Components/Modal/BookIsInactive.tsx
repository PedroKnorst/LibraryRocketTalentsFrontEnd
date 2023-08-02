import React from "react";
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
} from "./BookContentStyle";
import { useParams } from "react-router-dom";
import { getBook, putBook } from "../../services/books";
import { ReactComponent as Close } from "../../assets/svg/Caminho 265.svg";
import { ReactComponent as Book } from "../../assets/svg/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg";

const BookIsInactive = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getBook(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  function activeBook() {
    putBook(id, { ...data, status: { isActive: true, description: "" } }).then(
      (res) => {
        return res.data;
      }
    );
    alert("Livro ativado novamente!");
    location.reload();
  }

  if (data)
    return (
      <ContainerBook>
        <ButtonClose to="..">
          <Close />
        </ButtonClose>
        <CoverBook
          src={`http://localhost:3001/static/${data.image}`}
          alt="livro"
        />
        <LinkBorrow active={`${false}`}>
          <Book />
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
          <HistoryButton>Histórico</HistoryButton>
        </ContainerBookButtons>
      </ContainerBook>
    );
  else return null;
};

export default BookIsInactive;
