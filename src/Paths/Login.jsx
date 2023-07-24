import React from "react";
import "./Login.css";
import {
  ContainerInputLogin,
  IconeInput,
  InputLogin,
  FormLogin,
  LogoLogin,
  ButtonLogin,
  LostPassword,
} from "../Components/FormLogin/FormLogin";
import { ReactComponent as Email } from "../Assets/svg/Grupo 37.svg";
import { ReactComponent as Senha } from "../Assets/svg/Grupo 36.svg";

const Login = () => {
  return (
    <section>
      <FormLogin>
        <LogoLogin />
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
      </FormLogin>
    </section>
  );
};

export default Login;
