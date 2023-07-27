import React from "react";
import {
  ContainerInputLogin,
  IconeInput,
  InputLogin,
  FormLogin,
  LogoLogin,
  ButtonLogin,
  LostPassword,
} from "../Components/FormLogin/FormLogin";
import { ReactComponent as Email } from "../assets/svg/Grupo 37.svg";
import { ReactComponent as Senha } from "../assets/svg/Grupo 36.svg";
import { styled } from "styled-components";
import Background01 from "../assets/BackgroundLogin1.png";
import Background02 from "../assets/svg/BackgroundLogin2.svg";

const Bacground1 = styled.section`
  background: ${({ props }) => `url(${props})`} no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
  position: relative;
`;

const Bacground2 = styled.div`
  height: 100vh;
  background: ${({ props }) => `url(${props})`};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  return (
    <section>
      <Bacground1 props={Background01}>
        <Bacground2 props={Background02}>
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
              <InputLogin
                id="login_senha"
                type="password"
                placeholder="Senha"
              />
            </ContainerInputLogin>
            <LostPassword href="*">Perdeu a senha?</LostPassword>
            <ButtonLogin>Entrar</ButtonLogin>
          </FormLogin>
        </Bacground2>
      </Bacground1>
    </section>
  );
};

export default Login;
