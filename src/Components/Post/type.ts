export type PostType = {
  id: number;
  image: string;
  text: string;
  date: string;
  title: string;
};

export type PostProps = {
  post: PostType;
};
