import { getConnection } from "typeorm";
import { UserEntity } from "../database/entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { connectionName } from "../consts";

const propertyOf = <TClass>(name: keyof TClass) => name;

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository =
      getConnection(connectionName).getCustomRepository(UserRepository);
  }

  public listFullNames = async (skipVal: number = 0, takeVal: number = 10) => {
    const users = await this.userRepository.find({
      select: [propertyOf("name"), propertyOf("surname")],
      skip: skipVal,
      take: takeVal,
    });
    return users.map((u) => {
      return {
        fullName: `${u.name.trim()} ${u.surname.trim()}`,
      };
    });
  };

  public listUsers = async (skipVal: number = 0, takeVal: number = 10) => {
    const users = await this.userRepository.find({
      skip: skipVal,
      take: takeVal,
    });

    return users;
  };

  public create = async (user: UserEntity) => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  };

  public update = async (user: UserEntity, id: UserEntity["id"]) => {
    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  };

  public delete = async (id: UserEntity["id"]) => {
    const deletedUser = await this.userRepository.delete(id);
    return deletedUser;
  };
}
