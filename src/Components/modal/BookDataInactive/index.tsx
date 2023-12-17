import React from 'react';
import { ButtonClose, InactiveButton, BookModal, ContainerBookModal, ContainerFormInactive } from '../style';
import Close from '../../../assets/svg/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { getBook, putBook } from '../../../services/books';
import useForm from '../../../hooks/useForm';
import InputTextArea from '../../../components/Inputs/TexArea';
import { Book } from '../../../interfaces/book';

const BookDataInactive = ({ dataTestId }: { dataTestId?: string }) => {
  const [data, setData] = React.useState<Book | null>(null);
  const { id } = useParams();
  const description = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id)
      getBook(id).then(res => {
        setData(res.data);
      });
  }, [id]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (description.validate() && id && data) {
      putBook(id, {
        ...data,
        status: { isActive: false, description: description.value },
      }).then(res => {
        return res.data;
      });
      navigate(`/home/biblioteca/livro/${id}`);
    }
  }

  return (
    <ContainerBookModal data-testid={dataTestId}>
      <BookModal>
        <ButtonClose to="..">
          <Close />
        </ButtonClose>
        <ContainerFormInactive onSubmit={handleSubmit}>
          <h2 style={{ justifySelf: 'start' }}>Inativar Livro</h2>
          <InputTextArea
            inputTestId="inactiveBookInput"
            style={{ width: '500px', height: '100px' }}
            gridArea={{ gridColumn: '1 / 3' }}
            id="input_synopsis"
            label="Sinopse"
            onChange={description.onChange}
            value={description.value}
            error={description.error}
            errorTestId="errorInactive"
          />
          <InactiveButton data-testid="submitButton" style={{ gridColumn: '2 / 3', justifySelf: 'end' }}>
            Inativar
          </InactiveButton>
        </ContainerFormInactive>
      </BookModal>
    </ContainerBookModal>
  );
};

export default BookDataInactive;
