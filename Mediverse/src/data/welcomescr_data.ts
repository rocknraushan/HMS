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


export const mockLocations = [
  {
    id: '1',
    name: 'AIIMS Delhi',
    address: 'Ansari Nagar, New Delhi, Delhi 110029',
    rating: 4.8,
    reviews: 1203,
    lat: 28.5672,
    lng: 77.2100,
    distance: '3.1 km/12min',
    type: 'Hospital',
    image: 'https://media.gettyimages.com/id/72081907/photo/indian-commuters-pass-by-the-entrance-to.jpg?s=612x612&w=gi&k=20&c=QMCuNwi0Ui2UXOqp-7E5gV2PbsaENkl4RWP7Ct0njhg=',
  },
  {
    id: '2',
    name: 'Fortis Hospital',
    address: 'Sector 62, Noida, Uttar Pradesh 201301',
    rating: 4.7,
    reviews: 942,
    lat: 28.6269,
    lng: 77.3637,
    distance: '6.4 km/20min',
    type: 'Hospital',
    image: 'https://www.deepammeditours.com/wp-content/uploads/2023/01/fortis-noida-building-1.jpg',
  },
  {
    id: '3',
    name: 'Apollo Hospitals',
    address: 'Sarita Vihar, Mathura Road, New Delhi - 110076',
    rating: 4.6,
    reviews: 870,
    lat: 28.5371,
    lng: 77.2871,
    distance: '8.2 km/25min',
    type: 'Hospital',
    image: 'https://getwellgo.com/uploads/hospitals/Apollo%20Hospital%2C%20New%20Delhi.png',
  },
  {
    id: '4',
    name: 'Narayana Health',
    address: 'Hosur Road, Bengaluru, Karnataka 560099',
    rating: 4.5,
    reviews: 654,
    lat: 12.8342,
    lng: 77.6843,
    distance: '12 km/35min',
    type: 'Hospital',
    image: 'https://www.jointreplacementsurgeryhospitalindia.com/hospital/narayana-images/narayana-health-banner.jpg',
  },
  {
    id: '5',
    name: 'Manipal Hospital',
    address: 'Old Airport Road, Bengaluru, Karnataka 560017',
    rating: 4.4,
    reviews: 780,
    lat: 12.9605,
    lng: 77.6412,
    distance: '10.2 km/30min',
    type: 'Hospital',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60',
  },
];