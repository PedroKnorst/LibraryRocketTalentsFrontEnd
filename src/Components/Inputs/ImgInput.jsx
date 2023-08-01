import { styled } from "styled-components";
import React from "react";
import { ReactComponent as AddCapa } from "../../assets/svg/Caminho 261.svg";

const ContainerImg = styled.label`
  cursor: pointer;
  grid-area: capa;
  width: 10rem;
  display: flex;
  align-items: center;
  border: #ffc501 dashed 2px;
  color: #ffc501;
  font-weight: 500;
  font-size: 1.25rem;
  justify-content: center;

  & img {
    max-width: 100%;
    height: 200px;
  }

  & input {
    display: none;
  }

  & span {
    display: flex;
    gap: 0.5rem;
  }
`;

const InputFile = ({ cover }) => {
  const [img, setImg] = React.useState(null);

  React.useEffect(() => {
    setImg(cover);
  }, [cover]);

  function changeImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImg(null);
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
          <AddCapa />
          <p>Capa</p>
        </span>
      )}
    </ContainerImg>
  );
};

export default InputFile;
