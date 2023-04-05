import {User} from '../store/user';

export interface ICompany {
  _id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  memberStatus?: string;
  objectives: string[];
  references: Array<{
    _id: string;
    name: string;
    url: string;
  }>;
  associates?: Array<ICompany>;
  representives?: Array<User>;
  creator: string;
  editableBy: string;
  createdAt: string;
}

export interface IOfficeBearer {
  _id: string;
  name: string;
  president: User;
  firstVPrisident: User;
  secondVPrisident: User;
  secretaryGeneral: User;
  ProSecretaryGeneral: User;
  isCurrent: boolean;
}
