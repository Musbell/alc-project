import Sequelize from 'sequelize';

const sequelize = new Sequelize('student', null, null, {
  dialect: 'sqlite',
  storage: './student.sqlite',
});


const db = {
  Student: sequelize.import(`${__dirname}/student`),
};

db.sequelize = sequelize;

export default db;
