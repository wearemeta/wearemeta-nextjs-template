const authConfig = {
  meEndpoint: '/me/',
  loginEndpoint: '/auth/token/',
  passwordResetEndpoint: '/password_reset/',
  storageTokenKeyName: 'access_token',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  setResetEndpoint: '/password_reset/confirm/',
};

export default authConfig;
