export interface HostProfileImageItem {
  id?: number;
  newImage?: string;
  oldImage?: string;
  name: string;
  hostId: string;
  country?: string;
  createdAt?: string;
  isApprove?: boolean;
}

export interface HostImageItem {
  id?: number;
  image?: string;
  name: string;
  hostId: string;
  country?: string;
  createdAt?: string;
  showImage?: boolean;
  isApprove?: boolean;
}
