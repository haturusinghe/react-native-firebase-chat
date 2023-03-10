export const colors = {
  primary: 'yellow',
  primary_dark: '#D4AC0D',
  success: 'green',
  error: 'red',

  grey: 'grey',
  white: 'white',
  black: 'black',
};

export const routes = {
  home: 'Home',
  login: 'Login',
  signUp: 'SignUp',
  forgotPassword: 'Forgot Password',
  newsDetails: 'News Details',
  scheduleDetails: 'Schedule Details',
  participants: 'Participants',
  profile: 'Profile',
  subDirectory: 'subDirectory',
  about: 'About',
  companyProfile: 'Company Profile',
  chat: 'chat',
};

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export enum directoryTypes {
  About,
  IFAWPCA_Members,
  OfficeBearers,
  BoardMembers,
  Delegates,
  MainSponsors,
}

export const API_ROUTES = {
  USER: {
    LOGIN: '/auth/login',
    WHO_AM_I: '/auth/check-user',
  },
};

export enum HTTP_TYPES {
  'GET' = 'get',
  'POST' = 'post',
  'PUT' = 'put',
  'DELETE' = 'delete',
  'PATCH' = 'patch',
}
