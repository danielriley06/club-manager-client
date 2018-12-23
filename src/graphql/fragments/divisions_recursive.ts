import gql from "graphql-tag";

const divisionsRecursiveFragment = gql`
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

export default divisionsRecursiveFragment;
