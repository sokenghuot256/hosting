import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@/generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.log('Connecting to the database...');
    await this.$connect();
    this.logger.log('Connected to the database');
  }
}
