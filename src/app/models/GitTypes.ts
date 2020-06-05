export type GitRepository = {
  name: string;
  clone_ur: string;
  owner: {
    url: string;
  };
  created_at: Date;
  language: string;
};

export type GitUser = {
  name: string;
  login: string;
  location: string;
  bio: string;
  avatar_url: string;
};
