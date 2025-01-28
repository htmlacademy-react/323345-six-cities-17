export type CommentType = {
  id: string;
  date: string;
  comment: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};
