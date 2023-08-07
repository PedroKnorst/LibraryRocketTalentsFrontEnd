import React from "react";
import Add from "../../../assets/svg/Add";
import { ContainerImg } from "./style";

interface Props {
  cover: string;
}

const InputFile = ({ cover }: Props) => {
  const [img, setImg] = React.useState("");

  React.useEffect(() => {
    setImg(cover);
  }, [cover]);

  function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImg(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImg("");
      }
    }
  }

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
          <img
            src={`${cover ? `http://localhost:3001/static/${img}` : img}`}
            alt="Uploaded"
          />
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
