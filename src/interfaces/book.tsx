import { Loan } from "./history";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: {
    isActive: boolean;
    description: string;
  };
  isBorrowed: boolean;
  image: string;
  systemEntryDate: string;
  synopsis: string;
  rentHistory: Loan[];
}
