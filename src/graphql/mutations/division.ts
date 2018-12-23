import gql from "graphql-tag";

const CREATE_DIVISION = gql`
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

export default CREATE_DIVISION;
