import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SearchService {
  protected readonly indexKey: string;

  constructor(
    protected readonly logger: LoggerService,
    protected readonly configService: ConfigService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {}

  protected getIndex(): string {
    const environment = this.configService.get('application.env') || 'development';
    return `${environment}_${this.indexKey}`;
  }
}
