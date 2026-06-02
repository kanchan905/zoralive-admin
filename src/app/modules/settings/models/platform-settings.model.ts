export interface PaymentGatewayConfig {
  enabled: boolean;
  fields: Record<string, string>;
}

export interface PlatformSettings {
  zegoSignIn: string;
  zegoAppId: string;
  privacyPolicyLink: string;
  termsOfServiceLink: string;
  loginCoin: string;
  loginBonusAdmin: string;
  loginMessage: string;
  dailyTaskMin: string;
  dailyTaskMax: string;
  videoCallCharge: string;
  addCoinHost: string;
  redeemGateway: string;
  redeemCurrency: string;
  redeemDay: string;
  redeemMinPoints: string;
  redeemCoins: string;
  stripeEnabled: boolean;
  stripeSecretKey: string;
  stripePublishableKey: string;
  phonePayEnabled: boolean;
  phonePayId: string;
  razorpayEnabled: boolean;
  razorpayId: string;
  googlePayEnabled: boolean;
  googlePayId: string;
  callBonuses: string[];
  callDurations: string[];
}
