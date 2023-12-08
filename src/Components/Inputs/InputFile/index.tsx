import React from 'react';
import Add from '../../../assets/svg/Add';
import { ContainerImg } from './style';
import { InputError } from '../InputText/style';

interface Props {
  cover?: string;
  setImg: (img: string) => void;
  img: string;
  error: string;
  setFile: (file: File) => void;
  dataTestId?: string;
  inputTestId?: string;
  errorTestId?: string;
}

const InputFile = ({ cover, setImg, img, error, setFile, dataTestId, inputTestId, errorTestId }: Props) => {
  function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result && !(reader.result instanceof ArrayBuffer)) setImg(reader.result);
        };

        reader.readAsDataURL(file);
      } else {
        setImg('');
      }
    }
  }

  React.useEffect(() => {
    if (cover) setImg(cover);
  }, [cover]);

  return (
    <>
      <ContainerImg>
        <input
          data-testid={inputTestId}
          onChange={changeImage}
          type="file"
          accept="image/*"
          id="input_capa"
          name="uploaded_file"
        />

        {img ? (
          <span>
            <img
              data-testid={dataTestId}
              src={`${cover === img ? `http://localhost:3001/static/${img}` : img}`}
              alt="uploaded_file"
            />
          </span>
        ) : (
          <span>
            <Add />
            <p>Capa</p>
          </span>
        )}
      </ContainerImg>
      {error && <InputError data-testid={errorTestId}>{error}</InputError>}
    </>
  );
};

export default InputFile;
