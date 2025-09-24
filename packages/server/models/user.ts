import {
  AllowNull,
  Column,
  DataType,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @Column(DataType.STRING)
    avatar: string | null | undefined;

  @AllowNull(false)
  @Column(DataType.STRING(50))
    first_name: string | undefined;

  @AllowNull(false)
  @Column(DataType.STRING(50))
    last_name: string | undefined;

  @Column(DataType.STRING(50))
    display_name: string | null | undefined;

  @AllowNull(false)
  @Column(DataType.STRING(25))
    phone: string | undefined;

  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING)
    email: string | undefined;

  @AllowNull(false)
  @Column(DataType.STRING(50))
    login: string | undefined;
}
