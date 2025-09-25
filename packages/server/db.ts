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
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

async function ensureData() {
  await User.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      avatar: null,
      first_name: 'John',
      last_name: 'Smith',
      display_name: null,
      phone: '+7 (987) 654-01-23',
      email: 'john@mail.com',
      login: 'johnsmith',
    },
  });

  await Topic.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      title: 'Topic',
      content: 'Topic content',
      owner_id: 1,
    },
  });

  await Comment.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      content: 'Comment content',
      parent_id: null,
      topic_id: 1,
      owner_id: 1,
    },
  });
}

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const sequelize = new Sequelize(sequelizeOptions);

    await sequelize.sync();

    sequelize.addModels([User, Topic, Comment, Reaction]);

    User.hasMany(Topic, { foreignKey: 'owner_id' });
    Topic.belongsTo(User, { foreignKey: 'owner_id' });

    User.hasMany(Comment, { foreignKey: 'owner_id' });
    Comment.belongsTo(User, { foreignKey: 'owner_id' });

    User.hasMany(Reaction, { foreignKey: 'owner_id' });
    Reaction.belongsTo(User, { foreignKey: 'owner_id' });

    Topic.hasMany(Comment, { foreignKey: 'topic_id' });
    Comment.belongsTo(Topic, { foreignKey: 'topic_id' });

    Comment.hasMany(Reaction, { foreignKey: 'comment_id' });
    Reaction.belongsTo(Comment, { foreignKey: 'comment_id' });

    await sequelize.sync();

    ensureData();

    await sequelize.sync();

    console.log('  ➜ 🎸 Connected to the database', sequelize.config.database);

    return sequelize;
  } catch (e) {
    console.error(e);
  }

  return null;
};
