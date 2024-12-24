interface Address {
  district: string;
  city_state: string;
  zip_code: string;
  country: string;
}

interface Description {
  company_size: number[];
  industry: string;
  headquarters: string;
  links: string[];
  founded: Date;
  specialities: string[];
}

interface Review {
  user_id: string;
  rating: number;
  review: string;
}

interface ICompany {
  _id?: string;
  owner_id?: string;
  admin_id?: string[];
  company_name?: string;
  address?: Address;
  description?: Description;
  short_description?: string;
  number_of_employees?: number;
  number_of_followers?: number;
  legal_document_url?: string;
  reviews?: Review[];
  followers?: string[];
}

export default ICompany;
