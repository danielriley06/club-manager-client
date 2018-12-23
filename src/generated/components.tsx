export type Maybe<T> = T | null;

/** Specifies the gender of a user */
export enum Gender {
  NotSpecified = "not_specified",
  Male = "male",
  Female = "female",
  Other = "other"
}
/** Specifies the gender of a team */
export enum TeamGender {
  Male = "male",
  Female = "female",
  Coed = "coed"
}

/** An ISO 8601-encoded datetime */
export type Iso8601DateTime = any;

/** action_dispatch_uploaded_file */
export type Upload = any;

// ====================================================
// Documents
// ====================================================

export type CreateSeasonVariables = {
  name: string;
  startDate?: Maybe<string>;
  endDate?: Maybe<string>;
  active?: Maybe<boolean>;
};

export type CreateSeasonMutation = {
  __typename?: "Mutation";

  createSeason: Maybe<CreateSeasonCreateSeason>;
};

export type CreateSeasonCreateSeason = {
  __typename?: "CreateSeasonPayload";

  season: Maybe<CreateSeasonSeason>;
};

export type CreateSeasonSeason = SeasonFragmentFragment;

export type CreateTeamVariables = {
  name: string;
  seasonId: string;
  divisionId: string;
  ageGroupId?: Maybe<string>;
};

export type CreateTeamMutation = {
  __typename?: "Mutation";

  createTeam: Maybe<CreateTeamCreateTeam>;
};

export type CreateTeamCreateTeam = {
  __typename?: "CreateTeamPayload";

  team: Maybe<CreateTeamTeam>;
};

export type CreateTeamTeam = TeamFragmentFragment;

export type CreateUserVariables = {
  firstName: string;
  lastName: string;
  clubRole: string;
  gender: string;
  dateOfBirth: Iso8601DateTime;
};

export type CreateUserMutation = {
  __typename?: "Mutation";

  createUser: Maybe<CreateUserCreateUser>;
};

export type CreateUserCreateUser = {
  __typename?: "CreateUserPayload";

  user: Maybe<CreateUserUser>;
};

export type CreateUserUser = UserFragmentFragment;

export type UpdateUserVariables = {
  avatar: Upload;
};

export type UpdateUserMutation = {
  __typename?: "Mutation";

  updateUser: Maybe<UpdateUserUpdateUser>;
};

export type UpdateUserUpdateUser = {
  __typename?: "UpdateUserPayload";

  user: Maybe<UpdateUserUser>;
};

export type UpdateUserUser = UserFragmentFragment;

export type GetAgeGroupsVariables = {};

export type GetAgeGroupsQuery = {
  __typename?: "Query";

  ageGroups: GetAgeGroupsAgeGroups[];
};

export type GetAgeGroupsAgeGroups = {
  __typename?: "AgeGroup";

  id: string;

  title: string;
};

export type GetAllDivisionsVariables = {};

export type GetAllDivisionsQuery = {
  __typename?: "Query";

  allDivisions: Maybe<GetAllDivisionsAllDivisions[]>;
};

export type GetAllDivisionsAllDivisions = DivisionFragmentFragment;

export type GetDivisionsVariables = {};

export type GetDivisionsQuery = {
  __typename?: "Query";

  divisions: Maybe<GetDivisionsDivisions[]>;
};

export type GetDivisionsDivisions = DivisionFragmentFragment;

export type GetDivisionChildrenVariables = {
  parentId: string;
};

export type GetDivisionChildrenQuery = {
  __typename?: "Query";

  divisionChildren: Maybe<GetDivisionChildrenDivisionChildren[]>;
};

export type GetDivisionChildrenDivisionChildren = DivisionFragmentFragment;

export type GetSeasonsVariables = {};

export type GetSeasonsQuery = {
  __typename?: "Query";

  seasons: GetSeasonsSeasons[];
};

export type GetSeasonsSeasons = {
  __typename?: "Season";

  id: string;

  name: string;

  startDate: Maybe<Iso8601DateTime>;

  endDate: Maybe<Iso8601DateTime>;

  active: boolean;
};

export type GetTeamsVariables = {
  page: number;
};

export type GetTeamsQuery = {
  __typename?: "Query";

  teams: Maybe<GetTeamsTeams[]>;

  teamsTotal: number;
};

export type GetTeamsTeams = TeamFragmentFragment;

export type GetUsersVariables = {
  page: number;
};

export type GetUsersQuery = {
  __typename?: "Query";

  usersCount: number;

  users: Maybe<GetUsersUsers[]>;
};

export type GetUsersUsers = UserFragmentFragment;

export type GetCurrentUserVariables = {};

export type GetCurrentUserQuery = {
  __typename?: "Query";

  currentUser: GetCurrentUserCurrentUser;
};

export type GetCurrentUserCurrentUser = UserFragmentFragment;

export type CreateDivisionVariables = {
  parentId?: Maybe<string>;
  name: string;
  description?: Maybe<string>;
};

export type CreateDivisionMutation = {
  __typename?: "Mutation";

  createDivision: Maybe<CreateDivisionCreateDivision>;
};

export type CreateDivisionCreateDivision = {
  __typename?: "CreateDivisionPayload";

  division: Maybe<CreateDivisionDivision>;
};

export type CreateDivisionDivision = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  ancestorName: Maybe<string>;

  children: Maybe<CreateDivisionChildren[]>;
};

export type CreateDivisionChildren = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  ancestorName: Maybe<string>;
};

export type DivisionFieldsFragmentFragment = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;
};

export type DivisionFragmentFragment = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  ancestorName: Maybe<string>;

  children: Maybe<DivisionFragmentChildren[]>;
};

export type DivisionFragmentChildren = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  ancestorName: Maybe<string>;
};

export type DivisionsRecursiveFragmentFragment = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  children: Maybe<DivisionsRecursiveFragmentChildren[]>;
};

export type DivisionsRecursiveFragmentChildren = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  children: Maybe<DivisionsRecursiveFragment_Children[]>;
};

export type DivisionsRecursiveFragment_Children = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  children: Maybe<DivisionsRecursiveFragment__Children[]>;
};

export type DivisionsRecursiveFragment__Children = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  children: Maybe<DivisionsRecursiveFragment___Children[]>;
};

export type DivisionsRecursiveFragment___Children = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  children: Maybe<DivisionsRecursiveFragment____Children[]>;
};

export type DivisionsRecursiveFragment____Children = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  children: Maybe<DivisionsRecursiveFragment_____Children[]>;
};

export type DivisionsRecursiveFragment_____Children = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;

  children: Maybe<DivisionsRecursiveFragment______Children[]>;
};

export type DivisionsRecursiveFragment______Children = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestry: Maybe<string>;
};

export type SeasonFragmentFragment = {
  __typename?: "Season";

  id: string;

  name: string;

  startDate: Maybe<Iso8601DateTime>;

  endDate: Maybe<Iso8601DateTime>;

  active: boolean;
};

export type TeamFragmentFragment = {
  __typename?: "Team";

  id: string;

  name: string;

  level: Maybe<string>;

  gender: Maybe<TeamGender>;

  zipCode: Maybe<string>;

  timeZone: Maybe<string>;

  club: Maybe<TeamFragmentClub>;

  ageGroup: Maybe<TeamFragmentAgeGroup>;

  division: Maybe<TeamFragmentDivision>;

  season: Maybe<TeamFragmentSeason>;

  members: Maybe<TeamFragmentMembers[]>;
};

export type TeamFragmentClub = {
  __typename?: "Club";

  id: string;

  name: string;
};

export type TeamFragmentAgeGroup = {
  __typename?: "AgeGroup";

  id: string;

  title: string;
};

export type TeamFragmentDivision = {
  __typename?: "Division";

  id: string;

  name: string;

  ancestorName: Maybe<string>;
};

export type TeamFragmentSeason = {
  __typename?: "Season";

  id: string;

  name: string;

  startDate: Maybe<Iso8601DateTime>;

  endDate: Maybe<Iso8601DateTime>;

  active: boolean;
};

export type TeamFragmentMembers = {
  __typename?: "User";

  id: string;
};

export type UserFragmentFragment = {
  __typename?: "User";

  id: string;

  firstName: string;

  middleName: Maybe<string>;

  lastName: string;

  clubRole: string;

  email: string;

  mobileNumber: Maybe<string>;

  mobileNumberVerified: boolean;

  gender: Gender;

  dateOfBirth: Maybe<Iso8601DateTime>;

  active: boolean;

  emailVerified: boolean;

  invitedToDashboard: boolean;

  inviteAccepted: boolean;

  avatarLink: Maybe<string>;

  createdAt: Iso8601DateTime;

  updatedAt: Iso8601DateTime;

  isClubOwner: boolean;

  club: Maybe<UserFragmentClub>;

  teams: Maybe<UserFragmentTeams[]>;
};

export type UserFragmentClub = {
  __typename?: "Club";

  id: string;

  name: string;
};

export type UserFragmentTeams = {
  __typename?: "Team";

  id: string;

  name: string;

  level: Maybe<string>;

  gender: Maybe<TeamGender>;

  zipCode: Maybe<string>;

  timeZone: Maybe<string>;

  club: Maybe<UserFragment_Club>;

  ageGroup: Maybe<UserFragmentAgeGroup>;
};

export type UserFragment_Club = {
  __typename?: "Club";

  id: string;

  name: string;
};

export type UserFragmentAgeGroup = {
  __typename?: "AgeGroup";

  id: string;

  title: string;

  maxAge: Maybe<number>;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const DivisionFieldsFragmentFragmentDoc = gql`
  fragment divisionFieldsFragment on Division {
    id
    name
    ancestry
  }
`;

export const DivisionFragmentFragmentDoc = gql`
  fragment divisionFragment on Division {
    id
    name
    ancestry
    ancestorName
    children {
      id
      name
      ancestry
      ancestorName
    }
  }
`;

export const DivisionsRecursiveFragmentFragmentDoc = gql`
  fragment divisionsRecursiveFragment on Division {
    id
    name
    ancestry
    children {
      id
      name
      ancestry
      children {
        id
        name
        ancestry
        children {
          id
          name
          ancestry
          children {
            id
            name
            ancestry
            children {
              id
              name
              ancestry
              children {
                id
                name
                ancestry
                children {
                  id
                  name
                  ancestry
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SeasonFragmentFragmentDoc = gql`
  fragment seasonFragment on Season {
    id
    name
    startDate
    endDate
    active
  }
`;

export const TeamFragmentFragmentDoc = gql`
  fragment teamFragment on Team {
    id
    name
    level
    gender
    zipCode
    timeZone
    club {
      id
      name
    }
    ageGroup {
      id
      title
    }
    division {
      id
      name
      ancestorName
    }
    season {
      id
      name
      startDate
      endDate
      active
    }
    members {
      id
    }
  }
`;

export const UserFragmentFragmentDoc = gql`
  fragment userFragment on User {
    id
    firstName
    middleName
    lastName
    clubRole
    email
    mobileNumber
    mobileNumberVerified
    gender
    dateOfBirth
    active
    emailVerified
    invitedToDashboard
    inviteAccepted
    avatarLink
    createdAt
    updatedAt
    isClubOwner
    club {
      id
      name
    }
    teams {
      id
      name
      level
      gender
      zipCode
      timeZone
      club {
        id
        name
      }
      ageGroup {
        id
        title
        maxAge
      }
    }
  }
`;

// ====================================================
// Components
// ====================================================

export const CreateSeasonDocument = gql`
  mutation CreateSeason(
    $name: String!
    $startDate: String
    $endDate: String
    $active: Boolean
  ) {
    createSeason(
      name: $name
      startDate: $startDate
      endDate: $endDate
      active: $active
    ) {
      season {
        ...seasonFragment
      }
    }
  }

  ${SeasonFragmentFragmentDoc}
`;
export class CreateSeasonComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateSeasonMutation, CreateSeasonVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateSeasonMutation, CreateSeasonVariables>
        mutation={CreateSeasonDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateSeasonProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateSeasonMutation, CreateSeasonVariables>
> &
  TChildProps;
export type CreateSeasonMutationFn = ReactApollo.MutationFn<
  CreateSeasonMutation,
  CreateSeasonVariables
>;
export function CreateSeasonHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateSeasonMutation,
        CreateSeasonVariables,
        CreateSeasonProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateSeasonMutation,
    CreateSeasonVariables,
    CreateSeasonProps<TChildProps>
  >(CreateSeasonDocument, operationOptions);
}
export const CreateTeamDocument = gql`
  mutation CreateTeam(
    $name: String!
    $seasonId: String!
    $divisionId: String!
    $ageGroupId: String
  ) {
    createTeam(
      name: $name
      seasonId: $seasonId
      divisionId: $divisionId
      ageGroupId: $ageGroupId
    ) {
      team {
        ...teamFragment
      }
    }
  }

  ${TeamFragmentFragmentDoc}
`;
export class CreateTeamComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateTeamMutation, CreateTeamVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateTeamMutation, CreateTeamVariables>
        mutation={CreateTeamDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateTeamProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateTeamMutation, CreateTeamVariables>
> &
  TChildProps;
export type CreateTeamMutationFn = ReactApollo.MutationFn<
  CreateTeamMutation,
  CreateTeamVariables
>;
export function CreateTeamHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateTeamMutation,
        CreateTeamVariables,
        CreateTeamProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateTeamMutation,
    CreateTeamVariables,
    CreateTeamProps<TChildProps>
  >(CreateTeamDocument, operationOptions);
}
export const CreateUserDocument = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $clubRole: String!
    $gender: String!
    $dateOfBirth: ISO8601DateTime!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      clubRole: $clubRole
      gender: $gender
      dateOfBirth: $dateOfBirth
    ) {
      user {
        ...userFragment
      }
    }
  }

  ${UserFragmentFragmentDoc}
`;
export class CreateUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateUserMutation, CreateUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateUserMutation, CreateUserVariables>
        mutation={CreateUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateUserMutation, CreateUserVariables>
> &
  TChildProps;
export type CreateUserMutationFn = ReactApollo.MutationFn<
  CreateUserMutation,
  CreateUserVariables
>;
export function CreateUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateUserMutation,
        CreateUserVariables,
        CreateUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateUserMutation,
    CreateUserVariables,
    CreateUserProps<TChildProps>
  >(CreateUserDocument, operationOptions);
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($avatar: Upload!) {
    updateUser(avatar: $avatar) {
      user {
        ...userFragment
      }
    }
  }

  ${UserFragmentFragmentDoc}
`;
export class UpdateUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<UpdateUserMutation, UpdateUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateUserMutation, UpdateUserVariables>
        mutation={UpdateUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateUserMutation, UpdateUserVariables>
> &
  TChildProps;
export type UpdateUserMutationFn = ReactApollo.MutationFn<
  UpdateUserMutation,
  UpdateUserVariables
>;
export function UpdateUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateUserMutation,
        UpdateUserVariables,
        UpdateUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateUserMutation,
    UpdateUserVariables,
    UpdateUserProps<TChildProps>
  >(UpdateUserDocument, operationOptions);
}
export const GetAgeGroupsDocument = gql`
  query GetAgeGroups {
    ageGroups {
      id
      title
    }
  }
`;
export class GetAgeGroupsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetAgeGroupsQuery, GetAgeGroupsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetAgeGroupsQuery, GetAgeGroupsVariables>
        query={GetAgeGroupsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAgeGroupsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAgeGroupsQuery, GetAgeGroupsVariables>
> &
  TChildProps;
export function GetAgeGroupsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAgeGroupsQuery,
        GetAgeGroupsVariables,
        GetAgeGroupsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAgeGroupsQuery,
    GetAgeGroupsVariables,
    GetAgeGroupsProps<TChildProps>
  >(GetAgeGroupsDocument, operationOptions);
}
export const GetAllDivisionsDocument = gql`
  query GetAllDivisions {
    allDivisions {
      ...divisionFragment
    }
  }

  ${DivisionFragmentFragmentDoc}
`;
export class GetAllDivisionsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetAllDivisionsQuery, GetAllDivisionsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetAllDivisionsQuery, GetAllDivisionsVariables>
        query={GetAllDivisionsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllDivisionsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllDivisionsQuery, GetAllDivisionsVariables>
> &
  TChildProps;
export function GetAllDivisionsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllDivisionsQuery,
        GetAllDivisionsVariables,
        GetAllDivisionsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllDivisionsQuery,
    GetAllDivisionsVariables,
    GetAllDivisionsProps<TChildProps>
  >(GetAllDivisionsDocument, operationOptions);
}
export const GetDivisionsDocument = gql`
  query GetDivisions {
    divisions {
      ...divisionFragment
    }
  }

  ${DivisionFragmentFragmentDoc}
`;
export class GetDivisionsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetDivisionsQuery, GetDivisionsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetDivisionsQuery, GetDivisionsVariables>
        query={GetDivisionsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetDivisionsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetDivisionsQuery, GetDivisionsVariables>
> &
  TChildProps;
export function GetDivisionsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetDivisionsQuery,
        GetDivisionsVariables,
        GetDivisionsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetDivisionsQuery,
    GetDivisionsVariables,
    GetDivisionsProps<TChildProps>
  >(GetDivisionsDocument, operationOptions);
}
export const GetDivisionChildrenDocument = gql`
  query GetDivisionChildren($parentId: ID!) {
    divisionChildren(id: $parentId) {
      ...divisionFragment
    }
  }

  ${DivisionFragmentFragmentDoc}
`;
export class GetDivisionChildrenComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      GetDivisionChildrenQuery,
      GetDivisionChildrenVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetDivisionChildrenQuery, GetDivisionChildrenVariables>
        query={GetDivisionChildrenDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetDivisionChildrenProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetDivisionChildrenQuery, GetDivisionChildrenVariables>
> &
  TChildProps;
export function GetDivisionChildrenHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetDivisionChildrenQuery,
        GetDivisionChildrenVariables,
        GetDivisionChildrenProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetDivisionChildrenQuery,
    GetDivisionChildrenVariables,
    GetDivisionChildrenProps<TChildProps>
  >(GetDivisionChildrenDocument, operationOptions);
}
export const GetSeasonsDocument = gql`
  query GetSeasons {
    seasons {
      id
      name
      startDate
      endDate
      active
    }
  }
`;
export class GetSeasonsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetSeasonsQuery, GetSeasonsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetSeasonsQuery, GetSeasonsVariables>
        query={GetSeasonsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetSeasonsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetSeasonsQuery, GetSeasonsVariables>
> &
  TChildProps;
export function GetSeasonsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetSeasonsQuery,
        GetSeasonsVariables,
        GetSeasonsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetSeasonsQuery,
    GetSeasonsVariables,
    GetSeasonsProps<TChildProps>
  >(GetSeasonsDocument, operationOptions);
}
export const GetTeamsDocument = gql`
  query GetTeams($page: Int!) {
    teams(page: $page) {
      ...teamFragment
    }
    teamsTotal
  }

  ${TeamFragmentFragmentDoc}
`;
export class GetTeamsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetTeamsQuery, GetTeamsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetTeamsQuery, GetTeamsVariables>
        query={GetTeamsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetTeamsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetTeamsQuery, GetTeamsVariables>
> &
  TChildProps;
export function GetTeamsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetTeamsQuery,
        GetTeamsVariables,
        GetTeamsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetTeamsQuery,
    GetTeamsVariables,
    GetTeamsProps<TChildProps>
  >(GetTeamsDocument, operationOptions);
}
export const GetUsersDocument = gql`
  query GetUsers($page: Int!) {
    usersCount
    users(page: $page) {
      ...userFragment
    }
  }

  ${UserFragmentFragmentDoc}
`;
export class GetUsersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetUsersQuery, GetUsersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetUsersQuery, GetUsersVariables>
        query={GetUsersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetUsersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetUsersQuery, GetUsersVariables>
> &
  TChildProps;
export function GetUsersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetUsersQuery,
        GetUsersVariables,
        GetUsersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetUsersQuery,
    GetUsersVariables,
    GetUsersProps<TChildProps>
  >(GetUsersDocument, operationOptions);
}
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    currentUser {
      ...userFragment
    }
  }

  ${UserFragmentFragmentDoc}
`;
export class GetCurrentUserComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetCurrentUserQuery, GetCurrentUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetCurrentUserQuery, GetCurrentUserVariables>
        query={GetCurrentUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCurrentUserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetCurrentUserQuery, GetCurrentUserVariables>
> &
  TChildProps;
export function GetCurrentUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCurrentUserQuery,
        GetCurrentUserVariables,
        GetCurrentUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetCurrentUserQuery,
    GetCurrentUserVariables,
    GetCurrentUserProps<TChildProps>
  >(GetCurrentUserDocument, operationOptions);
}
export const CreateDivisionDocument = gql`
  mutation CreateDivision(
    $parentId: String
    $name: String!
    $description: String
  ) {
    createDivision(
      parentId: $parentId
      name: $name
      description: $description
    ) {
      division {
        id
        name
        ancestry
        ancestorName
        children {
          id
          name
          ancestry
          ancestorName
        }
      }
    }
  }
`;
export class CreateDivisionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateDivisionMutation, CreateDivisionVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateDivisionMutation, CreateDivisionVariables>
        mutation={CreateDivisionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateDivisionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateDivisionMutation, CreateDivisionVariables>
> &
  TChildProps;
export type CreateDivisionMutationFn = ReactApollo.MutationFn<
  CreateDivisionMutation,
  CreateDivisionVariables
>;
export function CreateDivisionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateDivisionMutation,
        CreateDivisionVariables,
        CreateDivisionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateDivisionMutation,
    CreateDivisionVariables,
    CreateDivisionProps<TChildProps>
  >(CreateDivisionDocument, operationOptions);
}
