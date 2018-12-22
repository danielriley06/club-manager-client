export interface IDivision {
  id: number;
  name: string;
  ancestry: string | null;
  ancestorName: string | null;
  children: {
    id: number;
    name: string;
    ancestry: string | null;
    ancestorName: string | null;
  };
}

export interface ISeason {
  id: number;
  name: string;
  startDate: string | null;
  endDate: string | null;
  active: boolean;
}

export interface IClub {
  id: number;
  name: string;
}

export interface IAgeGroup {
  id: number;
  title: string;
  maxAge: string | null;
}

export interface ITeam {
  id: number;
  name: string;
  level: string | null;
  gender: string | null;
  zipCode: string | null;
  timeZone: string | null;
  club: IClub;
  ageGroup: IAgeGroup;
}

export interface IUser {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  clubRole: string;
  email: string;
  mobileNumber: string | null;
  mobileNumberVerified: boolean;
  gender: string | null;
  dateOfBirth: string | null;
  active: boolean;
  emailVerified: boolean;
  invitedToDashboard: boolean;
  inviteAccepted: boolean;
  avatarLink: string | null;
  createdAt: string;
  updatedAt: string;
  isClubOwner: boolean;
  club: IClub;
  teams: ITeam[];
}
