import React from 'react';
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
} from './style';
import Background01 from '../../assets/BackgroundLogin1.png';
import Background02 from '../../assets/svg/BackgroundLogin2.svg';
import Senha from '../../assets/svg/Senha';
import Email from '../../assets/svg/Email';
import Logo from '../../assets/svg/Logo';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../services/users';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('User')) {
      navigate('/home');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await postUser({ email, password })
      .then(res => {
        localStorage.setItem('User', JSON.stringify(res.data));
        navigate('/home');
      })
      .catch(() => {
        alert('Email e/ou senha incorretos');
      });
  };

  return (
    <Bacground1 active={Background01}>
      <Bacground2 active={Background02}>
        <ContainerLogin onSubmit={handleSubmit}>
          <ContainerLogo>
            <Logo />
          </ContainerLogo>
          <ContainerInputLogin>
            <IconeInput htmlFor="login_email">
              <Email />
            </IconeInput>
            <InputLogin
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              id="login_email"
              type="email"
              placeholder="E-mail"
            />
          </ContainerInputLogin>
          <ContainerInputLogin>
            <IconeInput htmlFor="login_senha">
              <Senha />
            </IconeInput>
            <InputLogin
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id="login_senha"
              type="password"
              placeholder="Senha"
            />
          </ContainerInputLogin>
          <LostPassword href="*">Perdeu a senha?</LostPassword>
          <ButtonLogin>Entrar</ButtonLogin>
        </ContainerLogin>
      </Bacground2>
    </Bacground1>
  );
};

export default Login;
