import gql from 'graphql-tag'

export const STUDENT_QUERY = gql`
  query StudentQuery($id: ID!) {
    Student(id: $id) {
      id
      lastName
      firstName
      otherName
      gender
      dateOfBirth
      nationality
      sessionOfAdmission
      dateOfAdmission
      stateOfOrigin
      religion
      address
      city
      state
      email
      phone

    }
  }
`

export const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudentMutation($id: ID!) {
    deleteStudent(id: $id)
  }
`

export const CREATE_STUDENT_MUTATION = gql`
  # 2
  mutation CreateStudentMutation(
  $lastName: String!,
  $firstName: String!,
  $otherName: String!,
  $gender: String!,
  $dateOfBirth: String!,
  $nationality: String!,
  $sessionOfAdmission: String!,
  $dateOfAdmission: String!,
  $stateOfOrigin: String!,
  $religion: String!,
  $address: String!,
  $city: String!,
  $state: String!,
  $email: String!,
  $phone: String!
  ) {
    createStudent(
      lastName: $lastName,
      firstName: $firstName,
      otherName: $otherName,
      gender:$gender,
      dateOfBirth:$dateOfBirth,
      nationality:$nationality,
      sessionOfAdmission:$sessionOfAdmission,
      dateOfAdmission:$dateOfAdmission,
      stateOfOrigin:$stateOfOrigin,
      religion:$religion,
      address:$address,
      city:$city,
      state:$state,
      email:$email,
      phone:$phone
    ) {
      id
    }
  }
`

export const UPDATE_STUDENT_MUTATION = gql`  
  mutation UpdatetudentMutation(
  $id: ID!,
  $newLastName: String,
  $newFirstName: String,
  $newOtherName: String,
  $newGender: String,
  $newDateOfBirth: String,
  $newNationality: String,
  $newSessionOfAdmission: String,
  $newDateOfAdmission: String,
  $newStateOfOrigin: String,
  $newReligion: String,
  $newAddress: String,
  $newCity: String,
  $newState: String,
  $newEmail: String,
  $newPhone: String,
  ) {
    updateStudent(
      id: $id,
      newLastName: $newLastName,
      newFirstName:  $newFirstName,
      newOtherName: $newOtherName,
      newGender: $newGender,
      newDateOfBirth: $newDateOfBirth,
      newNationality: $newNationality,
      newSessionOfAdmission: $newSessionOfAdmission,
      newDateOfAdmission: $newDateOfAdmission,
      newStateOfOrigin: $newStateOfOrigin,
      newReligion: $newReligion,
      newAddress: $newAddress,
      newCity: $newCity,
      newState: $newState,
      newEmail: $newEmail,
      newPhone: $newPhone
    )
  }
`
export const ALL_STUDENTS_SEARCH_QUERY = gql`
  query AllStudentsSearchQuery{
    allStudents{
      id
      firstName
      lastName
      dateOfAdmission
      sessionOfAdmission
    }
  }
`
