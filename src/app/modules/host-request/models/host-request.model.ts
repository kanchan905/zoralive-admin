export interface HostRequest {
  id?: number;
  video?: string;
  profileImage?: string;
  newImage?: string;
  name: string;
  hostId: string;
  coin?: number | string;
  followers?: number | string;
  following?: number | string;
  country?: string;
  agencyName?: string;
  showImage?: boolean;
  isAccept?: boolean;
  isDecline?: boolean;
  createdAt?: string;
}
