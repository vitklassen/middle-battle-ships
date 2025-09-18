import {
  AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table,
} from 'sequelize-typescript';
import { User } from './user';

@Table({
  tableName: 'topics',
})
export class Topic extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
  override id: number | undefined;

    @AllowNull(false)
    @Column(DataType.STRING)
      title: string | undefined;

    @AllowNull(false)
    @Column(DataType.STRING)
      content: string | undefined;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
      owner_id: number | undefined;
}
