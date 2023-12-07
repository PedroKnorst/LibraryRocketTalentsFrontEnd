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
  const [img, setImg] = React.useState<string>('');
  const [file, setFile] = React.useState<Blob | string>('');
  const navigate = useNavigate();

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

  const infoChange = (i: string) => {
    setImg(i);
    cover.setValue(i);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const findRepeatBookTitle = books.find(book => book.title === title.value);

    const validation = validateFields();

    if (validation) {
      if (!findRepeatBookTitle) {
        const changedDateEntry = new Date(entryDate.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        const formData = new FormData();
        formData.append('uploaded_file', file);

        let uploadedImg = img;

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

        navigate('home');
        alert('Livro adicionado a biblioteca!');
        location.reload();
      } else {
        title.setError('Titulo de livro ja existente.');
      }
    }
  };

  const filterGenre = books.reduce((items: string[], currentItem: Book) => {
    if (currentItem.genre) {
      if (items.indexOf(currentItem.genre) < 0) {
        items.push(currentItem.genre);
      }
    }
    return items;
  }, []);

  const defaultItem = () => {
    genre.setValue('');
  };

  return (
    <ContainerBookPage data-testid="containerNewBook">
      <NavHome path=".." page="Cadastrar novo livro" />
      <SectionInputs onSubmit={handleSubmit} action="/photos" method="post" encType="multipart/form-data">
        <ContainerInputs>
          <InputFile dataTestId="coverField" error={cover.error} img={img} setImg={infoChange} setFile={setFile} />
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
            dataTestId="genderField"
            errorTestId="genderError"
            selectedItemTestId="genderSelected"
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
