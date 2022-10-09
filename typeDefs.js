import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  
  }

  input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
  }

  

  type Query {
    users: [User],
    user(id:ID!):User
  }

  type Mutation{
    createUser(userNew:UserInput!):User
  }
`;

export default typeDefs