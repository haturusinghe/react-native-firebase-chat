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
  forgotPassword: 'Forgot_Password',
  newsDetails: 'News_Details',
  scheduleDetails: 'Schedule_Details',
  participants: 'Participants',
  profile: 'Profile',
  memberList: 'memberList',
  about: 'About',
  companyProfile: 'Company_Profile',
  chat: 'chat',
  storyDetails: 'story_Details',
  eventMenu: 'eventMenu',
  sponsorList: 'sponsorList',
  sessionList: 'sessionList',
  memberProfile: 'memberProfile',
  campanyProfileRepresentives: 'campanyProfileRepresentives',
  boardMemberList: 'boardMemberList',
  officeBearers: 'officeBearers',
  updateProfile: 'updateProfile',
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
    GET_ALL_MEMBERS: '/api/user/members',
    UPDATE_USER: '/api/user/updateUser',
  },
  NEWS: {
    GET_ALL: '/api/news',
    GET_BY_ID: '/api/news/:id',
  },
  EVENTS: {
    GET_ALL: '/api/event',
    GET_SPONSORS: '/api/event/sponsors',
    GET_MY_SCHEDULE: '/api/event/mySessions',
    GET_PARTICIPANTS: '/api/event/session/users',
    UPDATE_USER_SESSION: '/api/event/session/user',
    UPDATE_USER_SESSION_BY_ID: '/api/event/sessionUser',
  },
  MEMBERS: {
    GET_MEMBERS: '/api/member/members',
  },
  OFFICE_BEARER: {
    GET_ALL: 'api/officeBearers',
  },
};

export enum HTTP_TYPES {
  'GET' = 'get',
  'POST' = 'post',
  'PUT' = 'put',
  'DELETE' = 'delete',
  'PATCH' = 'patch',
}

export const PAGE_SIZE = 3;
