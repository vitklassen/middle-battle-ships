import {
  AllowNull, AutoIncrement, Column, DataType, IsEmail, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

export function isUser(value: unknown): value is User {
  const user = value as User;

  return typeof user.id === 'number';
}

@Table({
  tableName: 'users',
})
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
  override id: number | undefined;

  @AllowNull(false)
  @Column(DataType.INTEGER)
    yandex_id: number | undefined;

  @Column(DataType.STRING)
    avatar: string | null | undefined;

    @AllowNull(false)
    @Column(DataType.STRING(50))
      first_name: string | undefined;

    @AllowNull(false)
    @Column(DataType.STRING(50))
      second_name: string | undefined;

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

    @AllowNull(false)
    @Column(DataType.STRING)
      theme: boolean | undefined;
}
