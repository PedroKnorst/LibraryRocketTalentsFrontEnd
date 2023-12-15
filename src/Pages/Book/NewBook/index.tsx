import React from 'react';
import {
  ButtonCancel,
  ButtonSave,
  ContainerButtons,
  ContainerInputs,
  ContainerBookPage,
  SectionInputs,
} from '../style';
import Select from '../../../components/Inputs/Select';
import useForm from '../../../hooks/useForm';
import InputFile from '../../../components/Inputs/InputFile';
import { UserBooksContext } from '../../../context/UserContext';
import { Book } from '../../../interfaces/book';
import InputText from '../../../components/Inputs/InputText';
import NavHome from '../../../components/NavBack';
import InputTextArea from '../../../components/Inputs/TexArea';
import { postBook, postCover } from '../../../services/books';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {
  const { books } = React.useContext(UserBooksContext);
  const [filterGenre, setFilterGenre] = React.useState<string[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setFilterGenre(
      books.reduce((items: string[], currentItem: Book) => {
        if (currentItem.genre) {
          if (items.indexOf(currentItem.genre) < 0) {
            items.push(currentItem.genre);
          }
        }
        return items;
      }, [])
    );
  }, []);

  const title = useForm();
  const synopsis = useForm();
  const author = useForm();
  const genre = useForm();
  const entryDate = useForm();
  const cover = useForm();

  const validateFields = () => {
    title.validate();
    synopsis.validate();
    author.validate();
    genre.validate();
    entryDate.validate();
    cover.validate();

    if (
      title.validate() &&
      synopsis.validate() &&
      author.validate() &&
      genre.validate() &&
      entryDate.validate() &&
      cover.validate()
    ) {
      return true;
    } else return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const findRepeatBookTitle = books.find(book => book.title === title.value);

    const validation = validateFields();

    if (validation) {
      if (!findRepeatBookTitle) {
        const changedDateEntry = new Date(entryDate.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        const formData = new FormData();
        formData.append('uploaded_file', cover.file);

        let uploadedImg = cover.value;

        await postCover(formData).then(res => {
          uploadedImg = res.data;
        });

        postBook({
          title: title.value,
          author: author.value,
          genre: genre.value,
          isBorrowed: false,
          rentHistory: [],
          status: {
            isActive: true,
            description: '',
          },
          synopsis: synopsis.value,
          systemEntryDate: changedDateEntry,
          image: uploadedImg,
        }).then(res => res.data);

        navigate('/home');
        alert('Livro adicionado a biblioteca!');
      } else {
        title.setError('Titulo de livro ja existente.');
      }
    }
  };

  const defaultItem = () => {
    genre.setValue('');
    genre.validate();
  };

  return (
    <ContainerBookPage data-testid="containerNewBook">
      <NavHome path=".." page="Cadastrar novo livro" />
      <SectionInputs
        data-testid="formNewBook"
        onSubmit={handleSubmit}
        action="/photos"
        method="post"
        encType="multipart/form-data"
      >
        <ContainerInputs>
          <InputFile
            onChangeFile={cover.onChangeFile}
            inputTestId="coverInput"
            errorTestId="coverError"
            imgTestId="coverField"
            addImgTestId="coverAddField"
            error={cover.error}
            img={cover.value}
          />
          <InputText
            onBlur={title.onBlur}
            errorTestId="titleError"
            inputTestId="titleField"
            gridArea={{ gridArea: 'titulo' }}
            id="input_title"
            label="Título"
            onChange={title.onChange}
            value={title.value}
            type="text"
            error={title.error}
          />
          <InputTextArea
            onBlur={synopsis.onBlur}
            errorTestId="synopsisError"
            inputTestId="synopsisField"
            gridArea={{ gridArea: 'sinopse' }}
            id="input_synopsis"
            label="Sinopse"
            onChange={synopsis.onChange}
            value={synopsis.value}
            error={synopsis.error}
          />
          <InputText
            onBlur={author.onBlur}
            inputTestId="autorField"
            errorTestId="autorError"
            gridArea={{ gridArea: 'autor' }}
            id="input_author"
            label="Autor"
            onChange={author.onChange}
            value={author.value}
            type="text"
            error={author.error}
          />
          <Select
            defaultItemTestId="genderDefault"
            dataTestId="genderField"
            errorTestId="genderError"
            selectedItemTestId="genderSelected"
            onBlur={genre.onBlur}
            mediaquerie="true"
            defaultItem={defaultItem}
            selectItem={e => genre.onSelect(e)}
            list={filterGenre}
            value={genre.value}
            style={{ gridArea: 'genero' }}
            labelStyle={'#133052'}
            label={'Gênero'}
            error={genre.error}
          />
          <InputText
            onBlur={entryDate.onBlur}
            inputTestId="entryDateField"
            errorTestId="entryDateError"
            gridArea={{ gridArea: 'data' }}
            id="input_date"
            label="Data de entrada"
            onChange={entryDate.onChange}
            value={entryDate.value}
            type="date"
            error={entryDate.error}
          />
        </ContainerInputs>
        <ContainerButtons>
          <ButtonCancel to="..">Cancelar</ButtonCancel>
          <ButtonSave data-testid="saveBook">Salvar</ButtonSave>
        </ContainerButtons>
      </SectionInputs>
    </ContainerBookPage>
  );
};

export default NewBook;
