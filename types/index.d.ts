import { NextPageContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export type ApolloNextPageContext = NextPageContext & { apolloClient: ApolloClient<NormalizedCacheObject> }; //eslint-disable-line
export type Author = {
  id: string;
  name: string;
  born: string;
  died: string;
  gernes: Gerne[];
  description: string;
  photo: string;
  books: Book[];
  quotes: Quote[];
  comments: AuthorComment[];
  createdAt: string;
  updatedAt: string;
};

export type Book = {
  id: string;
  title: string;
  authors: Author[];
  thumbnail: string;
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  saleStatus: string;
  wantCount: number;
  readingCount: number;
  readCount: number;
  comments: Comment[];
  gernes: Gerne[];
  totalRating: number;
  ratedUserNum: number;
  avgRating: number;
  addUser: User[];
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  user: User;
  book?: Book;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type Display = {
  id: string;
  user: User[];
  book: Book;
  shelves: Shelf[];
  createdAt: string;
  updatedAt: string;
};

export type File = {
  filename: string;
  mimetype: string;
  encoding: string;
};

export type Gerne = {
  id: string;
  term: string;
  books?: Book[];
  authors?: Author[];
  booksCount: number;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthorComment = {
  id: string;
  author: Author;
  user: User;
  text: string;
  createdAt: string;
  updatedAt: string;
};

// export enum Gender {
//   MALE
//   FEMALE
// }

export type Profile = {
  id: string;
  age: number;
  gender: Gender;
  bio: string;
  interests: string;
  favoriteBook: string;
  createdAt: string;
  updatedAt: string;
};

export type Quote = {
  id: string;
  term: string;
  author: Author;
  tags: Tag[];
  likesCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Rating = {
  id: string;
  user: User;
  book: Book;
  count: number;
  createdAt: string;
  updatedAt: string;
};

export type Shelf = {
  id: string;
  name: string;
  displays: Display[];
};

export type Tag = {
  id: string;
  quotes: Quote[];
  term: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  username: string;
  profilePhoto: string;
  profile: Profile;
  isAdmin: boolean;
  ratings: Rating[];
  ratingBooks: Book[];
  bookAvgRating: string;
  bookComments: Comment[];
  shelves: Shelf[];
  likeQuotes: Quote[];
  displays: Display[];
  createdAt: string;
  updatedAt: string;
};
export type CacheUser = {
  id: string;
  email: string;
  password: string;
  username: string;
  bookAvgRating: string;
  profile: Profile;
  profilePhoto: string;
  isAdmin: boolean;
  shelves: Shelf[];
  displays: Display[];
  bookComments: Comment[];
};
