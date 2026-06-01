export interface Agency {
  id?: number;
  name: string;
  image?: string;
  country: string;
  email: string;
  mobile: string;
  code: string;
  createdAt?: string;
  isDisabled?: boolean;
}

export interface AgencyFormValue {
  name: string;
  image: File | null;
  country: string;
  email: string;
  mobile: string;
  password: string;
  code: string;
}
