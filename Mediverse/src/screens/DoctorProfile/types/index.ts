export interface Doctor {
  name: string;
  specialization: string;
  hospital: string;
  image: string;
  patients: string;
  experience: string;
  rating: number;
  reviewsCount: string;
  about: string;
  workingTime: string;
}

export interface Review {
  rating: number;
  comment: string;
  user:{
    name:string;
    profilePic:string;
  }
}
