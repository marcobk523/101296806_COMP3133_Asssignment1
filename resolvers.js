const User = require('./models/User');
const Employee = require('./models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function for JWT tokens
const createToken = (userId) => {
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '100d' });
};

const resolvers = {
    Query: {
      // Login Query
      login: async (_, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user || !(await user.correctPassword(password, user.password))) {
          throw new Error('Incorrect username or password');
        }
  
        const token = createToken(user.id);
        return { ...user._doc, id: user._id, token };
      },
      // Get all employees Query
      getAllEmployees: async () => {
        return await Employee.find();
      },
      // Search employee by eid Query
      searchEmployeeByEid: async (_, { eid }) => {
        return await Employee.findById(eid);
      }
    },
    Mutation: {
      // Signup Mutation
      signup: async (_, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = createToken(user.id);
        return { ...user._doc, id: user._id, token };
      },
      // Add New employee Mutation
      addNewEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
        return await Employee.create({ first_name, last_name, email, gender, salary });
      },
      // Update employee by eid Mutation
      updateEmployeeByEid: async (_, { eid, first_name, last_name, email, gender, salary }) => {
        return await Employee.findByIdAndUpdate(eid, { first_name, last_name, email, gender, salary }, { new: true });
      },
      // Delete employee by eid Mutation
      deleteEmployeeByEid: async (_, { eid }) => {
        await Employee.findByIdAndDelete(eid);
        return "Employee deleted successfully";
      }
    }
  };
  
  module.exports = resolvers;