import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user';
import { Comment } from './comment';

@Table({
  tableName: 'reactions',
})
export class Reaction extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @AllowNull(false)
  @Column(DataType.INTEGER)
    code: number | undefined;

  @AllowNull(false)
  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
    comment_id: number | undefined;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
    owner_id: number | undefined;
}
