import React from "react";
import BookContent from "./BookContent";
import { BookModal } from "./ModalBookStyle";

const ModalBook = () => {
  return (
    <BookModal>
      <BookContent />
    </BookModal>
  );
};

export default ModalBook;
