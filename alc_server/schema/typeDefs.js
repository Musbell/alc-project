// define types
const typeDefs = `
type Student {
  id: ID!
  lastName: String!
  firstName: String!
  otherName: String!
  gender: String!
  dateOfBirth: String!
  nationality: String!
  sessionOfAdmission: String!
  dateOfAdmission: String!
  stateOfOrigin: String!
  religion: String!
  address: String!
  city: String!
  state: String!
  email: String!
  phone: String!
  createdAt: String!
  updatedAt: String!
}
type Query {
  allStudents: [Student!]!
  Student(id: ID!): Student
}
input StudentFilter {
  OR: [StudentFilter!]
  lastName_contains: String
    firstName_contains: String
}
type Mutation {
  createStudent(
    lastName: String!
    firstName: String!
    otherName: String!
    gender: String!
    dateOfBirth: String!
    nationality: String!
    sessionOfAdmission: String!
    dateOfAdmission: String!
    stateOfOrigin: String!
    religion: String!
    address: String!
    city: String!
    state: String!
    email: String!
    phone: String!
  ): Student
  
   updateStudent(
    id: ID!
    lastName: String
    firstName: String
    otherName: String
    gender: String
    dateOfBirth: String
    nationality: String
    sessionOfAdmission: String
    dateOfAdmission: String
    stateOfOrigin: String
    religion: String
    address: String
    city: String
    state: String
    email: String
    phone: String,
    newLastName: String
    newFirstName: String
    newOtherName: String
    newGender: String
    newDateOfBirth: String
    newNationality: String
    newSessionOfAdmission: String
    newDateOfAdmission: String
    newStateOfOrigin: String
    newReligion: String
    newAddress: String
    newCity: String
    newState: String
    newEmail: String
    newPhone: String
  ): [Int!]!
  
  deleteStudent(id: ID!): Int!
  }
  

type Subscription {
   Student(filter: StudentSubscriptionFilter): StudentSubscriptionPayload
}

input StudentSubscriptionFilter {
   mutation_in: [_ModelMutationType!]
}

type StudentSubscriptionPayload {
   mutation: _ModelMutationType!
   node: Student
}

enum _ModelMutationType {
  CREATED
  UPDATED
  DELETED
}
`;
module.exports = typeDefs;
