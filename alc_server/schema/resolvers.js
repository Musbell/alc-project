const pubsub = require('../pubsub');


const resolvers = {
  Query: {
    allStudents: async (root, args, { models }) => await models.Student.findAll(),
    Student: async (root, { id }, { models }) => await models.Student.findOne({
      where: { id },
    }),
  },
  Mutation: {
    createStudent: async (root, args, { models }) => {
      const newStudent = await models.Student.create(args); // 3

      pubsub.publish('Student', { student: { mutation: 'CREATED', node: newStudent } });

      return newStudent;
    },
    updateStudent: async (root, {
      id,
      lastName,
      firstName,
      otherName,
      gender,
      dateOfBirth,
      nationality,
      sessionOfAdmission,
      dateOfAdmission,
      stateOfOrigin,
      religion,
      address,
      city,
      state,
      email,
      phone,
      newLastName,
      newFirstName,
      newOtherName,
      newGender,
      newDateOfBirth,
      newNationality,
      newSessionOfAdmission,
      newDateOfAdmission,
      newStateOfOrigin,
      newReligion,
      newAddress,
      newCity,
      newState,
      newEmail,
      newPhone,
    }, { models }) => {
      const updatedStudent = await models.Student.update({
        id,
        lastName: newLastName,
        firstName: newFirstName,
        otherName: newOtherName,
        gender: newGender,
        dateOfBirth: newDateOfBirth,
        nationality: newNationality,
        sessionOfAdmission: newSessionOfAdmission,
        dateOfAdmission: newDateOfAdmission,
        stateOfOrigin: newStateOfOrigin,
        religion: newReligion,
        address: newAddress,
        city: newCity,
        state: newState,
        email: newEmail,
        phone: newPhone,
      }, {
        where: {
          id,
        },
      }); // 3

      pubsub.publish('Student', { student: { mutation: 'UPDATED', node: updatedStudent } });

      return updatedStudent;
    },
    deleteStudent: async (root, args, { models }) => {
      const deletedStudent = await models.Student.destroy({
        where: args,
      });

      pubsub.publish('Student', { student: { mutation: 'DELETED', node: deletedStudent } });

      return deletedStudent;
    },
  },
  Subscription: {
    Student: {
      subscribe: () => pubsub.asyncIterator('Student'),
    },
  },
};


module.exports = resolvers;
