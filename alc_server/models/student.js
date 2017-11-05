module.exports =  (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    otherName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    nationality: DataTypes.STRING,
    sessionOfAdmission: DataTypes.STRING,
    dateOfAdmission: DataTypes.DATEONLY,
    stateOfOrigin: DataTypes.STRING,
    religion: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  });

  return Student;
};
