interface IAddress {
  district: string;
  city_state: string;
  zip_code: string;
  country: string;
}

interface IDescription {
  company_size: number[];
  industry: string;
  headquarters: string;
  links: string[];
  founded: Date;
  specialities: string[];
}

interface IReview {
  user_id: string;
  rating: number;
  review: string;
  date?: Date;
}

interface ICompany {
  _id?: string;
  owner_id?: string;
  admin_id?: string[];
  company_name?: string;
  address?: IAddress;
  description?: IDescription;
  short_description?: string;
  number_of_employees?: number;
  number_of_followers?: number;
  legal_document_url?: string;
  reviews?: IReview[];
  followers?: string[];
  sumRating?: number;
  applicant?: string[];
  employees?: string[];
  avatar?: string;
}

export default ICompany;
