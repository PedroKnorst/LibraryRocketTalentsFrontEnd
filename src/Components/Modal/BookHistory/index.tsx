import React from "react";
import { ButtonClose, ContainerBook } from "../style";
import Close from "../../../assets/svg/Close";
import { BookModal } from "../ModalBook/style";
import { ContainerTable } from "./style";
import HistoryLoans from "../../Table";
import { Book } from "../../../UserContext";
import { useParams } from "react-router-dom";
import { getBook } from "../../../services/books";

const BookHistory = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<Book | null>(null);

  React.useEffect(() => {
    getBook(`${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  if (data)
    return (
      <BookModal>
        <ContainerBook>
          <ButtonClose to="..">
            <Close />
          </ButtonClose>
          <ContainerTable>
            <h2 style={{ justifySelf: "start" }}>
              Histórico de empréstimos do livro
            </h2>
            <HistoryLoans bookTitle={false} loans={data?.rentHistory} />
          </ContainerTable>
        </ContainerBook>
      </BookModal>
    );
  else return null;
};

export default BookHistory;
