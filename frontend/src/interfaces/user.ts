export interface IAddress {
  district: string;
  city_state: string;
  zip_code: string;
  country: string;
}

export interface IUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_verified?: boolean;
  phone?: string;
  address?: IAddress;
  gender?: "male" | "female";
  date_of_birth?: Date;
  avatar?: string;
  short_bio?: string;
}

export default IUser;
