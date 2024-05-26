import { DataTypes, Model } from "sequelize";
import connection from "./../connection";

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
  first_name: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  last_name: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  profile_picture_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  country: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  languages: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(25),
    allowNull: true,
    defaultValue: null
  },
  user_role: {
    type: DataTypes.TINYINT({ length: 1 }),
    allowNull: false,
    defaultValue: -1
  },
  visible: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 1
  },
  date_created: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "user_specs",
  sequelize: connection
});

export default UserSpecs;