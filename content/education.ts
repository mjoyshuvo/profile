export type Degree = {
  degree: string;
  institution: string;
  institutionUrl?: string;
  under?: string;
  date: string;
  location: string;
};

export const education: Degree[] = [
  {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "National University of Bangladesh",
    institutionUrl: "https://www.nu.ac.bd/",
    under: "Institute of Science and Technology",
    date: "Apr 2016",
    location: "Bangladesh",
  },
];
