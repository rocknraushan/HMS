export interface GSTData {
  gstType: number;
  legalName: string;
  tradeName: string;
  gstStatus: string;
  dateOfRegistration: string;
  contitutionOfBuissness: string;
  aadharCardNumber: string;
  principleAddress: string;
  additionalAddress: string[];
}

export interface GSTType {
  id: number;
  gst: string;
}
