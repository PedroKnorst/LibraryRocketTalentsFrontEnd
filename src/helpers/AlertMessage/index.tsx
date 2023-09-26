import * as Toast from '@radix-ui/react-toast';
import React from 'react';
import './style.css';
import { Cross1Icon } from '@radix-ui/react-icons';
import { ContainerModal } from './style';

interface Props {
  status: 'success' | 'failure';
  tittleMessage: string;
  message: string;
  messageButton?: React.ReactElement;
}

const AlertMessage = ({ status, tittleMessage, message, messageButton }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Toast.Provider swipeDirection="up">
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Abrir modal
      </button>
      {messageButton}
      <ContainerModal status={status}>
        <Toast.Root duration={3000} open={open} onOpenChange={setOpen} className="ToastRoot">
          <Toast.Title>{tittleMessage}</Toast.Title>
          <Toast.Description>{message}</Toast.Description>
          <Toast.Close onClick={() => setOpen(false)}>
            <Cross1Icon style={{ width: '.5rem', height: '.5rem' }} />
          </Toast.Close>
        </Toast.Root>
      </ContainerModal>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default AlertMessage;
