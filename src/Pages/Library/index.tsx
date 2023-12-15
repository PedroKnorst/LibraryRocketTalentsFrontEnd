import React from 'react';
import {
  ButtonInputSearch,
  ContainerBooksLibrary,
  ContainerInputsLibrary,
  ContainerLibrary,
  ContainerSearchLibrary,
  InputSearch,
  SectinoInputsLibrary,
} from './style';
import Search from '../../assets/svg/Search';
import Select from '../../components/Inputs/Select';
import BookContent from '../../components/modal/ModalBook';
import { UserBooksContext } from '../../context/UserContext';
import { Route, Routes } from 'react-router-dom';
import BookDataBorrow from '../../components/modal/BookDataBorrow';
import BookDataInactive from '../../components/modal/BookDataInactive';
import useForm from '../../hooks/useForm';
import { Book } from '../../interfaces/book';
import NavBack from '../../components/NavBack';
import BookHistory from '../../components/modal/BookHistory';
import ContainerBook from '../../components/CardBook';

const Library = () => {
  const [search, setSearch] = React.useState('');
  const { books } = React.useContext(UserBooksContext);
  const [filteredBooks, setfilteredBooks] = React.useState<Book[]>(books);
  const category = useForm();
  const categorys = ['Autor', 'Gênero', 'Data de Entrada'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchBook = books.filter(book =>
      book.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(
          search
            .normalize('NFD')
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, '')
        )
    );

    setfilteredBooks(searchBook);
  };

  const selectItem = (e: React.PointerEvent<HTMLElement>) => {
    category.onSelect(e);

    function converterData(dataString: string) {
      const partes = dataString.split('/');
      const dia = parseInt(partes[0]);
      const mes = parseInt(partes[1]) - 1;
      const ano = parseInt(partes[2]);
      return new Date(ano, mes, dia);
    }

    if (e.currentTarget.textContent === 'Gênero') {
      filteredBooks.sort((a, b) => (a.genre < b.genre ? -1 : 1));
    } else if (e.currentTarget.textContent === 'Autor') {
      filteredBooks.sort((a, b) => (a.author < b.author ? -1 : 1));
    } else if (e.currentTarget.textContent === 'Data de Entrada') {
      filteredBooks.sort(
        (a, b) => converterData(a.systemEntryDate).getTime() - converterData(b.systemEntryDate).getTime()
      );
    }
    setfilteredBooks(filteredBooks);
  };

  const defaultItem = () => {
    category.setValue('');

    filteredBooks.sort((a, b) => {
      if (a.id && b.id) return Number.parseInt(a.id) - Number.parseInt(b.id);
      return -1;
    });

    setfilteredBooks(filteredBooks);
  };

  if (filteredBooks)
    return (
      <ContainerLibrary data-testid="containerLibrary">
        <Routes>
          <Route path="livro/:id" element={<BookContent />} />
          <Route path="emprestar/:id" element={<BookDataBorrow />} />
          <Route path="inativar/:id" element={<BookDataInactive />} />
          <Route path="historico/:id" element={<BookHistory />} />
        </Routes>
        <NavBack path="/home" page="Biblioteca" />
        <SectinoInputsLibrary>
          <ContainerInputsLibrary>
            <ContainerSearchLibrary onSubmit={searchBook}>
              <label htmlFor="search">
                <Search />
              </label>
              <InputSearch
                data-testid="searchBookInput"
                onChange={handleChange}
                value={search}
                type="text"
                id="search"
                placeholder="Pesquisar livro..."
              />
              <ButtonInputSearch data-testid="searchBookButton">Buscar</ButtonInputSearch>
            </ContainerSearchLibrary>
            <Select
              defaultItemTestId="filterSelectItemDefault"
              inputTestId="filterSelectInput"
              selectedItemTestId="filterSelectItem"
              dataTestId="filterSelectField"
              mediaquerie="false"
              defaultItem={defaultItem}
              selectItem={selectItem}
              list={categorys}
              value={category.value}
              labelStyle={'#ADB5BD'}
              selectStyle={{ borderColor: '#ADB5BD' }}
              label={'Filtrar'}
            />
          </ContainerInputsLibrary>
          <ContainerBooksLibrary>
            {filteredBooks &&
              filteredBooks.map((book: Book) => <ContainerBook dataTestId="book" key={book.id} data={book} />)}
          </ContainerBooksLibrary>
        </SectinoInputsLibrary>
      </ContainerLibrary>
    );
  else return null;
};

export default Library;
