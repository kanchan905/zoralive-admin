export interface FakeHost {
  id?: number;
  image?: string;
  name: string;
  hostId: string;
  coin: number;
  country: string;
  agencyName: string;
  live?: boolean;
  video?: boolean;
}
