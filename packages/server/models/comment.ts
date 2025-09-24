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
import { Topic } from './topic';

@Table({
  tableName: 'comments',
})
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @AllowNull(false)
  @Column(DataType.STRING)
    content: string | undefined;

  @Column(DataType.INTEGER)
    parent_id: number | null | undefined;

  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
    topic_id: number | null | undefined;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
    owner_id: number | undefined;
}
