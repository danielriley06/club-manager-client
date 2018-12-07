import gql from 'graphql-tag';

const userFragment = gql`
  fragment userFragment on User {
    id
    firstName
    middleName
    lastName
    clubRole
    email
    cellphone
    gender
    dateOfBirth
    active
    cellphoneVerified
    emailVerified
    invitedToDashboard
    inviteAccepted
    avatarLink
    createdAt
    updatedAt
    isClubOwner
    notify
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

export default userFragment;
