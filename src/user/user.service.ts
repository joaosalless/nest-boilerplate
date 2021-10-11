import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { LoggerService } from '../core/modules/logger/logger.service';
import { TranslationService } from '../core/modules/translation/translation.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../core/entities/user.entity';
import { UserSearchService } from './user-search.service';

@Injectable()
export class UserService {
  constructor(
    private i18n: TranslationService,
    private logger: LoggerService,
    private userSearchService: UserSearchService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      this.userSearchService.index(user);
      return user;
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    this.logger.info(this.connection);

    return this.usersRepository.findAndCount({
      relations: ['tokens'],
      take: 10,
    });
  }

  async search(text: string) {
    return this.userSearchService.search(text);
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id, {
      relations: ['tokens'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new Error('User not found.');
    }
    await this.userSearchService.remove(id);
  }
}
