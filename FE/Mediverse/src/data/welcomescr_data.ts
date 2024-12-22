const { img_3, img_2, img_1 } = require('../assets');
export type WelconDataType = {
  id: number;
  title: string;
  description: string;
  image: any;
}
export const welcomeScreens: WelconDataType[] = [
  {
    id: 1,
    title: "Meet Doctors Online",
    description: "Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.",
    image: img_1
  },
  {
    id: 2,
    title: "Connect with Specialists",
    description: "Access a Wide Network of Experts for Personalized Medical Advice and Second Opinions.",
    image: img_2
  },
  {
    id: 3,
    title: "Thousands of Online Specialists",
    description: "Explore a Large Array of Online Medical Specialists, Offering Their Expertise Tailored to Your Health Needs.",
    image: img_3
  },
];
