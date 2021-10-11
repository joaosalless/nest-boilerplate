import { Injectable } from '@nestjs/common';
import { User } from '../core/entities/user.entity';
import { SearchService } from '../core/modules/search/search.service';
import { UserSearchBody, UserSearchResult } from './types/user-search-body.interface';

@Injectable()
export class UserSearchService extends SearchService {
  protected readonly indexKey: string = 'users';

  async getBody(user: User): Promise<UserSearchBody> {
    return Promise.resolve({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async index(user: User) {
    return this.elasticsearchService.index<UserSearchResult, UserSearchBody>({
      index: this.getIndex(),
      body: await this.getBody(user),
    });
  }

  async search(text: string) {
    const { body } = await this.elasticsearchService.search<UserSearchResult>({
      index: this.getIndex(),
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['name', 'email'],
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async remove(id: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.getIndex(),
      body: {
        query: {
          match: { id },
        },
      },
    });
  }

  async upsert(user: User) {
    const payload = await this.getBody(user);

    const script = Object.entries(payload).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.getIndex(),
      body: {
        query: {
          match: { id: user.id },
        },
        script: {
          inline: script,
        },
      },
    });
  }
}
