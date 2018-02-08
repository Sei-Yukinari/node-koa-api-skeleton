/* @flow */
import Sequelize from 'sequelize';
import User from '../entity/User';
import models from '../../../infrastructure/database/models';
import { ValidationError, NotFoundError } from '../../../interfaces/http/errors';
import type { UserRecord } from '../type/UserType';

export default class UserRepository {

  UserModel: Sequelize.Model;

  constructor() {
    this.UserModel = models.user;
  }

  async getAll(): Promise<Array<UserRecord>> {
    return this.UserModel.findAll();
  }

  async getById(userId: number): Promise<UserRecord> {
    const user = await this.UserModel.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async add(user: User): Promise<UserRecord> {
    const { valid, errors } = user.validate();
    if (!valid) {
      const error = new ValidationError(errors);
      error.details = errors;
      throw error;
    }
    return this.UserModel.create(user.toDatabase());
  }

  async update(id: number, newData: User): Promise<UserRecord> {
    try {
      const { valid, errors } = newData.validate();
      if (!valid) {
        const error = new ValidationError('ValidationError', errors);
        // error.details = errors;
        throw error;
      }
      const user: Sequelize.Model = await this.getById(id);
      if (!user) {
        const error = new NotFoundError('NotFoundError', `User does not exist . (id:${id})`);
        throw error;
      }
      return user.update(newData.toEntity());
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const user: Sequelize.Model = await this.getById(id);
      if (!user) {
        const error = new NotFoundError('NotFoundError', `User does not exist . (id:${id})`);
        // error.details = `User does not exist . (id:${id})`;
        throw error;
      }
      await user.destroy();
    } catch (error) {
      throw error;
    }
  }
}
