import { Association, DataTypes, Model } from "sequelize";
import connection from "./../connection";
import User from "./user";

class UserSpecs extends Model {
  public readonly id!: number;
  public user_id!: number;
  public weight!: number;
  public weight_goal!: number;
  public height!: number;
  public bmi!: number;
  public total_calorie_burned!: number;
  public total_workouts!: number;
  public workout_preferences!: string | null;
  public sex!: string | null;
  public fitness_level!: string | null;
  public date_of_birth!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserSpecs.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
    references: {
      model: "Users",
      key: "id"
    },
    onDelete: "CASCADE"
  },
  weight: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  weight_goal: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  height: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  bmi: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  total_calorie_burned: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  total_workouts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  workout_preferences: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  sex: {
    type: DataTypes.ENUM("male", "female"),
    allowNull: true,
    defaultValue: null,
  },
  fitness_level: {
    type: DataTypes.ENUM("beginner","intermediate","advanced","pro"),
    allowNull: true,
    defaultValue: null
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: "user_specs",
  sequelize: connection
});

User.hasOne(UserSpecs, {
  foreignKey: "user_id",
  as: "user_specs"
});
UserSpecs.belongsTo(User, {
  foreignKey: "user_id"
});

export default UserSpecs;