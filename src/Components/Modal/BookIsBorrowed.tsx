import Close from "../../assets/svg/Close";
import {
  ButtonBorrow,
  ButtonClose,
  ContainerBook,
  ContainerBookButtons,
  ContainerDataStudent,
  CoverBook,
  EditButton,
  HistoryButton,
  InactiveButton,
  TextBook,
} from "./style";
import BookSvg from "../../assets/svg/BookSvg";
import { putBook } from "../../services/books";

const BookIsBorrowed = ({ data }) => {
  let lastItem = data.rentHistory[data.rentHistory.length - 1];

  function changeBorrow() {
    putBook(data.id, { ...data, isBorrowed: false }).then((res) => {
      return res.data;
    });
    alert("Livro devolvido!");
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
        <ButtonBorrow onClick={changeBorrow}>
          <BookSvg />
          Devolver
        </ButtonBorrow>
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
          <InactiveButton disabled style={{ cursor: "not-allowed" }}>
            Inativar
          </InactiveButton>
          <HistoryButton>Histórico</HistoryButton>
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
      </ContainerBook>
    );
  else return null;
};

export default BookIsBorrowed;
