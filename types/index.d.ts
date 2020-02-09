export type ApolloNextPageContext = NextPageContext & { apolloClient: ApolloClient<NormalizedCacheObject> }; //eslint-disable-line
type Author = {
  id: string;
  name: string;
  born: string;
  died: string;
  gernes: Gerne[];
  description: string;
  photos: [string];
  books: Book[];
  quotes: Quote[];
  createdAt: string;
  updatedAt: string;
};

type Book = {
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
  addUser: User[];
  createdAt: string;
  updatedAt: string;
};

type Comment = {
  id: string;
  book: Book[];
  text: string;
  createdAt: string;
  updatedAt: string;
};

type Display = {
  id: string;
  user: User[];
  book: Book[];
  shelves: Shelf[];
  createdAt: string;
  updatedAt: string;
};

type File = {
  filename: string;
  mimetype: string;
  encoding: string;
};

type Gerne = {
  id: string;
  term: string;
  books: Book[];
  authors: Author[];
  createdAt: string;
  updatedAt: string;
};

type Profile = {
  id: string;
  username: string;
  age: number;
  gender: Gender;
  bio: string;
  interests: string;
  favoriteBook: string;
  createdAt: string;
  updatedAt: string;
};

type Quote = {
  id: string;
  term: string;
  author: Author;
  tags: Tag[];
  likesCount: number;
  createdAt: string;
  updatedAt: string;
};

type Rating = {
  id: string;
  user: User;
  book: Book;
  count: number;
  createdAt: string;
  updatedAt: string;
};

type Shelf = {
  id: string;
  user: User;
  name: string;
  displays: Display[];
  createdAt: string;
  updatedAt: string;
};

type Tag = {
  id: string;
  quotes: Quote[];
  term: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  email: string;
  password: string;
  username: string;
  profile: Profile;
  isAdmin: Boolean;
  ratings: Rating[];
  ratingBooks: Book[];
  bookAvgRating: Float;
  bookComments: Comment[];
  shelves: Shelf[];
  likeQuotes: Quote[];
  displays: Display[];
  createdAt: string;
  updatedAt: string;
};
