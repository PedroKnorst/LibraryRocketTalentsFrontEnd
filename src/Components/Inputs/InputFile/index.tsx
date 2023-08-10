import React from "react";
import Add from "../../../assets/svg/Add";
import { ContainerImg } from "./style";
import { InputError } from "../InputText/style";

interface Props {
  cover?: string;
  setImg: (img: string) => void;
  img: string;
  error: string;
}

const InputFile = ({ cover, setImg, img, error }: Props) => {
  function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result && !(reader.result instanceof ArrayBuffer))
            setImg(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImg("");
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
          onChange={changeImage}
          type="file"
          accept="image/*"
          id="input_capa"
        />

        {img ? (
          <span>
            <img src={`${img}`} alt="Uploaded" />
          </span>
        ) : (
          <span>
            <Add />
            <p>Capa</p>
          </span>
        )}
      </ContainerImg>
      {error && <InputError>{error}</InputError>}
    </>
  );
};

export default InputFile;
