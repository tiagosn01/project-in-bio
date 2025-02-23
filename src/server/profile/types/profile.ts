export type ProfileData = {
  userId: string;
  totalVisits: number;
  createdAt: number;
  name: string;
  description: string;
  imagePath: string;
  socialMedias: {
    github: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  link1?: Link;
  link2?: Link;
  link3?: Link;
  updatedAt?: number;
};

export type ProjectData = {
  id: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  imagePath: string;
  createdAt: string;
  totalVisits?: number;
};

export type Link = {
  title: string;
  url: string;
};
