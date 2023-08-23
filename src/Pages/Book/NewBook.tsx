import React from 'react';
import { ButtonCancel, ButtonSave, ContainerButtons, ContainerInputs, ContainerBookPage, SectionInputs } from './style';
import Select from '../../components/Inputs/Select';
import useForm from '../../hooks/useForm';
import InputFile from '../../components/Inputs/InputFile';
import { UserContext } from '../../UserContext';
import { Book } from '../../interfaces/book';
import InputText from '../../components/Inputs/InputText';
import NavHome from '../../components/NavBack';
import InputTextArea from '../../components/Inputs/TexArea';
import { postBook, postCover } from '../../services/books';
import { useNavigate, useParams } from 'react-router-dom';

const NewBook = () => {
  const { books } = React.useContext(UserContext);
  const [img, setImg] = React.useState<string>('');
  const [file, setFile] = React.useState<Blob | string>('');
  const navigate = useNavigate();
  const { account } = useParams();

  const title = useForm();
  const synopsis = useForm();
  const author = useForm();
  const genre = useForm();
  const entryDate = useForm();
  const cover = useForm();

  const infoChange = (i: string) => {
    setImg(i);
    cover.setValue(i);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      title.validate() &&
      synopsis.validate() &&
      author.validate() &&
      genre.validate() &&
      entryDate.validate() &&
      cover.validate()
    ) {
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

      navigate(`../../${account}`);
      alert('Livro adicionado a biblioteca!');
      location.reload();
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
    <ContainerBookPage>
      <NavHome path=".." page="Cadastrar novo livro" />
      <SectionInputs onSubmit={handleSubmit} action="/photos" method="post" encType="multipart/form-data">
        <ContainerInputs>
          <InputFile error={cover.error} img={img} setImg={infoChange} setFile={setFile} />
          <InputText
            gridArea={{ gridArea: 'titulo' }}
            id="input_title"
            label="Títutlo"
            onChange={title.onChange}
            value={title.value}
            type="text"
            error={title.error}
          />
          <InputTextArea
            gridArea={{ gridArea: 'sinopse' }}
            id="input_synopsis"
            label="Sinopse"
            onChange={synopsis.onChange}
            value={synopsis.value}
            error={synopsis.error}
          />
          <InputText
            gridArea={{ gridArea: 'autor' }}
            id="input_author"
            label="Autor"
            onChange={author.onChange}
            value={author.value}
            type="text"
            error={author.error}
          />
          <Select
            mediaquerie="true"
            defaultItem={defaultItem}
            selectItem={e => genre.onSelect(e)}
            list={filterGenre}
            value={genre.value}
            style={{ gridArea: 'genero' }}
            labelStyle={'#133052'}
            label={'Gênero'}
          />
          <InputText
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
          <ButtonSave>Salvar</ButtonSave>
        </ContainerButtons>
      </SectionInputs>
    </ContainerBookPage>
  );
};

export default NewBook;
