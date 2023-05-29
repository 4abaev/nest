import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, Table, DataType, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttr {
   email: string,
   password: string 
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    
    @ApiProperty({example: '12345qwerty', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string


    @ApiProperty({example: 'true', description: 'Заблокирован или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean

    @ApiProperty({example: 'user@mail.ru', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}