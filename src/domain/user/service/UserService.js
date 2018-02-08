/* @flow */
import Operation from './Operation';
import User from '../entity/User';
import UserRepository from '../repository/UserRepository';
import UserSerializer from '../../../interfaces/http/user/UserSerializer';
import Logger from '../../../infrastructure/logging/logger';
import type { UserRequest, UserResponse } from '../type/UserType';

export default class UserService extends Operation {

  userRepository: UserRepository;
  userSerializer: UserSerializer;
  logger: Logger;

  constructor({ userRepository, userSerializer, logger }: any) {
    super();
    this.userRepository = userRepository;
    this.userSerializer = userSerializer;
    this.logger = logger;
  }

  async getAllUsers(): Promise<void> {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const users = await this.userRepository.getAll();
      this.emit(SUCCESS, users.map(this.userSerializer.serialize));
    } catch (error) {
      this.emit(ERROR, error);
    }
  }

  async getUser(userId: number): Promise<void> {
    const { SUCCESS, NOT_FOUND } = this.outputs;
    try {
      const user = await this.userRepository.getById(userId);
      this.emit(SUCCESS, this.userSerializer.serialize(user));
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details,
      });
    }
  }

  async createUser(userData: UserRequest): Promise<void> {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    try {
      const user = new User(userData);
      const newUser = await this.userRepository.add(user);
      this.emit(SUCCESS, this.userSerializer.serialize(newUser));
    } catch (error) {
      this.emit(VALIDATION_ERROR, {
        details: error.details,
      });
      this.emit(ERROR, error);
    }
  }

  async updateUser(userId: number, userData: UserRequest): Promise<void> {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const user = new User(userData);
      const updateUser = await this.userRepository.update(userId, user);
      this.emit(SUCCESS, this.userSerializer.serialize(updateUser));
    } catch (error) {
      switch (error.message) {
      case 'ValidationError':
        this.emit(VALIDATION_ERROR, error);
        break;
      case 'NotFoundError':
        this.emit(NOT_FOUND, error);
        break;
      default:
        this.emit(ERROR, error);
      }
    }
  }

  async deleteUser(userId: number): Promise<void> {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;
    try {
      await this.userRepository.remove(userId);
      this.emit(SUCCESS);
    } catch (error) {
      switch (error.message) {
      case 'NotFoundError':
        this.emit(NOT_FOUND, error);
        break;
      default:
        this.emit(ERROR, error);
      }
    }
  }

}

UserService.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);
