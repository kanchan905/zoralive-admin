export type AdNetworkType = 'google' | 'facebook';

export interface AdNetworkConfig {
  enabled: boolean;
  interstitialId: string;
  rewardId: string;
  nativeId: string;
}

export interface AdvertisementSettings {
  google: AdNetworkConfig;
  facebook: AdNetworkConfig;
}
