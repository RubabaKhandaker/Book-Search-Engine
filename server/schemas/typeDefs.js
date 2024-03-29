const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String!
        title: String!
        image: String!
        link: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input BookInput {
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(): User
        removeBook(): User
    }
`;

module.exports = typeDefs;