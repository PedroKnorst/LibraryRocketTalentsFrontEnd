import React from 'react';
import Add from '../../../assets/svg/Add';
import { ContainerImg } from './style';
import { InputError } from '../InputText/style';

interface Props {
  cover?: string;
  img: string;
  error: string;
  onChangeFile: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  imgTestId?: string;
  inputTestId?: string;
  errorTestId?: string;
  addImgTestId?: string;
}

const InputFile = ({
  cover,
  img,
  error,
  imgTestId,
  addImgTestId,
  inputTestId,
  errorTestId,
  onBlur,
  onChangeFile,
}: Props) => {
  const [updatedImg, setUpdatedImg] = React.useState(cover ? cover : img);

  React.useEffect(() => {
    setUpdatedImg(img);
  }, [img]);

  return (
    <>
      <ContainerImg>
        <input
          onBlur={() => onBlur && onBlur}
          data-testid={inputTestId}
          onChange={onChangeFile}
          type="file"
          accept="image/*"
          id="input_capa"
          name="uploaded_file"
        />

        {img ? (
          <span data-testid={imgTestId}>
            <img
              src={`${cover === updatedImg ? `http://localhost:3001/static/${cover}` : updatedImg}`}
              alt="uploaded_file"
            />
          </span>
        ) : (
          <span data-testid={addImgTestId}>
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
