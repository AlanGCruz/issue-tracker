import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { sequelize } from "../sequelize";

export class Issue extends Model<
  InferAttributes<Issue>,
  InferCreationAttributes<Issue>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string | null;
  declare status: "todo" | "in-progress" | "done";
  declare priority: "low" | "med" | "high";
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Issue.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "todo"
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "med"
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "issues",
    modelName: "Issue",
    timestamps: true,
    createdAt: "created_at", // map createdAt → created_at column
    updatedAt: "updated_at", // map updatedAt → updated_at column
  }
);
