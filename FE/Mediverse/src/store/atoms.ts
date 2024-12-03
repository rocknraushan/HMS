import {atom} from 'jotai';
import {Country} from '../interfaces/Country';
import {ProfileData, UserData, UserType} from '../interfaces/User';

export const countryListAtom = atom<Country[]>([]);
export const selectedCountry = atom<Country | undefined>(undefined);
export const userDataAtom = atom<UserData | undefined>(undefined);
export const profileDataAtom = atom<ProfileData | undefined>(undefined);
export const userTypeAtom = atom<UserType | undefined>(undefined);

export const welcomModalAtom = atom<boolean>(false);

export const wishlistModalAtom = atom<boolean>(false);
export const getQuoteModalAtom = atom<boolean>(false);

export const getQuoteModalDataAtom = atom<
  | {
      name: string;
      amount: string;
    }
  | undefined
>(undefined);
