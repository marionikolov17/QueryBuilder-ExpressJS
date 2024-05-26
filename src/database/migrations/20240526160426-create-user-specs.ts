'use strict';

import { DataTypes, QueryInterface } from "sequelize";
import User from "./../models/user";

/** @type {import('sequelize-cli').Migration} */
const functions = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('user_specs', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
      },
      weight: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      weight_goal: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      height: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      bmi: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      total_calorie_burned: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      total_workouts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      workout_preferences: {
        type: Sequelize.STRING(45),
        allowNull: true,
        defaultValue: null
      },
      sex: {
        type: Sequelize.ENUM("male", "female"),
        allowNull: true,
        defaultValue: null,
      },
      fitness_level: {
        type: Sequelize.ENUM("beginner","intermediate","advanced","pro"),
        allowNull: true,
        defaultValue: null
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable('user_specs');
  }
};

export default functions;