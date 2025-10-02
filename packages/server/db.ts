import dotenv from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import {
  Comment, Reaction, Topic, User,
} from './models';

dotenv.config();

const {
  POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT,
} =
  process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const sequelize = new Sequelize(sequelizeOptions);

    await sequelize.sync();

    sequelize.addModels([User, Topic, Comment, Reaction]);

    User.hasMany(Topic, { foreignKey: 'owner_id', onDelete: 'cascade' });
    Topic.belongsTo(User, { foreignKey: 'owner_id' });

    User.hasMany(Comment, { foreignKey: 'owner_id', onDelete: 'cascade' });
    Comment.belongsTo(User, { foreignKey: 'owner_id' });

    User.hasMany(Reaction, { foreignKey: 'owner_id', onDelete: 'cascade' });
    Reaction.belongsTo(User, { foreignKey: 'owner_id' });

    Topic.hasMany(Comment, { foreignKey: 'topic_id', onDelete: 'cascade' });
    Comment.belongsTo(Topic, { foreignKey: 'topic_id' });

    Comment.hasMany(Comment, { foreignKey: 'parent_id', onDelete: 'cascade' });
    Comment.belongsTo(Comment, { foreignKey: 'parent_id' });

    Comment.hasMany(Reaction, { foreignKey: 'comment_id', onDelete: 'cascade' });
    Reaction.belongsTo(Comment, { foreignKey: 'comment_id' });

    await sequelize.sync();

    console.log('  ➜ 🎸 Connected to the database', sequelize.config.database);

    return sequelize;
  } catch (e) {
    console.error(e);
  }

  return null;
};
