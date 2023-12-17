import React from 'react';
import BookIsBorrowed from '../BookIsBorrowed';
import BookInformations from '../BookInformations';
import { getBook } from '../../../services/books';
import { useParams } from 'react-router-dom';
import BookIsInactive from '../BookIsinactive';
import { Book } from '../../../interfaces/book';
import { ContainerBookModal } from '../style';

const BookContent = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<Book | null>(null);

  React.useEffect(() => {
    getBookData();
  }, []);

  const getBookData = async () => {
    if (id)
      await getBook(id).then(res => {
        setData(res.data);
      });
  };

  if (data) {
    if (!data.isBorrowed && data.status.isActive)
      return (
        <ContainerBookModal>
          <BookInformations data={data} />;
        </ContainerBookModal>
      );
    else if (data.isBorrowed && data.status.isActive)
      return (
        <ContainerBookModal>
          <BookIsBorrowed reloadContent={getBookData} data={data} />;
        </ContainerBookModal>
      );
    else if (!data.isBorrowed && !data.status.isActive)
      return (
        <ContainerBookModal>
          <BookIsInactive reloadContent={getBookData} data={data} />;
        </ContainerBookModal>
      );
    else return null;
  } else return null;
};

export default BookContent;
