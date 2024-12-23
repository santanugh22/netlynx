interface IProfileDetailSocialMedia {
  id?: string;
  card_id?: string;
  image?: string;
  is_custom?: string;
  status?: string;
  type?: string;
  url?: string;
  created_at?: string;
  title?: string;
  status?: string;
  company_id?: string;
  master_id?: string;
  isMasterSocialMedia?: boolean;
}

interface IProfileDetailReviewLinks {
  company_id?: string;
  id?: string;
  image?: string;
  is_selected?: string;
  type?: string;
  url?: string;
}

interface IPersonalInfo {
  id?: string;
  role?: string;
  fname: string;
  lname: string;
  title: string;
  email: string;
  user_name: string;
  address: string;
  unit_appt?: number;
  country?: string;
  city?: string;
  province?: string;
  logo?: string;
  postal_code?: number;
  phone: string;
  mobile: string;
  about: string;
  website: string;
  image?: string;
  qr_code?: string;
  status?: string;
  auth_key?: string;
  gender?: string;
  dob?: string;
  company_name: string;
  vcard?: string;
  background_image?: string;
  company_id?: string;
  wp_staff_id?: string;
  digital_card?: string;
  business_address?: string;
}

interface IProfileDetailVideo {
  id: string;
  card_id?: string;
  title: string;
  video_url: string;
  image: string;
  status: string;
  staff_id?: string;
}

interface IProfileDetail {
  error: boolean;
  personal_info: IPersonalInfo;
  social_media?: IProfileDetailSocialMedia[];
  master_social_media?: IProfileDetailSocialMedia[];
  card_video?: IProfileDetailVideo[];
  staff_video?: IProfileDetailVideo[];
  staff_review_links?: IProfileDetailReviewLinks[];
  msg?: string | undefined;
}

interface IUpdateUser {
  auth_key: string;
  id: string | Blob;
  persionalInfo: {
    fname: string;
    lname: string;
    email: string;
    phone: string | Blob;
    website: string;
    user_name: string;
    about: string;
    gender: string;
    dob: string;
  };
  selectedGender: string;
}

interface IRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  mobile: string;
  phone: string;
}

interface IFile {
  data: {
    card_id: string;
    file_url: string;
    id: string;
    status: string;
    title: string;
  }[];
  error: boolean;
}
