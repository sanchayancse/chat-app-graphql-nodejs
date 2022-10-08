import { ApolloServer, gql } from "apollo-server";

import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import crypto from "crypto";

const users = [
  {
    id: 1,
    firstName: "sanchayan",
    lastName: "das",
    email: "sanchayandas@gmail.com",
    password: "12345",
  },
  {
    id: 2,
    firstName: "munni",
    lastName: "das",
    email: "munni@gmail.com",
    password: "12345",
  },
];

const todo = [
  {
    title:"abcd",
    by: 1
  },
  {
    title:"abcd2",
    by: 2
  }
]

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    todos:[Todo]
  }

  input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
  }

  type Todo{
    title: String!
    by: ID!

  }

  type Query {
    users: [User],
    user(id:ID!):User
  }

  type Mutation{
    createUser(userNew:UserInput!):User
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return users;
    },

    user: (parent, { id }, context) => {
      return users.find((item) => item.id == id);
    },
  },
  User:{
    todos:(parent)=>{
      console.log(parent,"parent");
     return todo.filter(todo=>todo.by == parent.id)
    }
  },

  Mutation:{
    createUser:(_,{userNew})=>{
      const newUser = {
        id:crypto.randomUUID(),
        ...userNew
      }
      users.push(newUser)
      return newUser
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
