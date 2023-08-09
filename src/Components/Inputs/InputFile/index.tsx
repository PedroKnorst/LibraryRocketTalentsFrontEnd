import React from "react";
import Add from "../../../assets/svg/Add";
import { ContainerImg } from "./style";

interface Props {
  cover?: string | null | ArrayBuffer;
  setImg: (img: string | ArrayBuffer | null) => void;
  img: string | ArrayBuffer | null;
}

const InputFile = ({ cover, setImg, img }: Props) => {
  function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        if (reader)
          reader.onloadend = () => {
            setImg(reader.result);
          };
        reader.readAsDataURL(file);
      } else {
        setImg(null);
      }
    }
  }

  React.useEffect(() => {
    if (cover) setImg(cover);
  }, [cover]);

  return (
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
  );
};

export default InputFile;
