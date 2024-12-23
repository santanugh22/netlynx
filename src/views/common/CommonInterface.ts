export interface IBottomSheet {
  children: any;
  show: boolean;
  setShow: (e: boolean) => void;
}

export interface IAddVideo {
  show: boolean;
  setShow: (e: boolean) => void;
  openLocation?: string;
}

export interface ISocialMediaProps {
  show: boolean;
  setShow: (e: boolean) => void;
  itemData: IProfileDetailSocialMedia | null;
  openLocation?:string
}
