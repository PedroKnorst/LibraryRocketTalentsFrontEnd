import {
  Bacground1,
  Bacground2,
  ButtonLogin,
  ContainerInputLogin,
  ContainerLogin,
  IconeInput,
  InputLogin,
  ContainerLogo,
  LostPassword,
} from "./style";
import Background01 from "../../assets/BackgroundLogin1.png";
import Background02 from "../../assets/svg/BackgroundLogin2.svg";
import Senha from "../../assets/svg/Senha";
import Email from "../../assets/svg/Email";
import Logo from "../../assets/svg/Logo";

const LoginForm = () => {
  return (
    <Bacground1 active={Background01}>
      <Bacground2 active={Background02}>
        <ContainerLogin>
          <ContainerLogo>
            <Logo />
          </ContainerLogo>
          <ContainerInputLogin>
            <IconeInput htmlFor="login_email">
              <Email />
            </IconeInput>
            <InputLogin id="login_email" type="email" placeholder="E-mail" />
          </ContainerInputLogin>
          <ContainerInputLogin>
            <IconeInput htmlFor="login_senha">
              <Senha />
            </IconeInput>
            <InputLogin id="login_senha" type="password" placeholder="Senha" />
          </ContainerInputLogin>
          <LostPassword href="*">Perdeu a senha?</LostPassword>
          <ButtonLogin>Entrar</ButtonLogin>
        </ContainerLogin>
      </Bacground2>
    </Bacground1>
  );
};

export default LoginForm;
