import gql from "graphql-tag";

const userFragment = gql`
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
    accountIsActive
    emailVerified
    invitedToDashboard
    inviteAccepted
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

export default userFragment;
