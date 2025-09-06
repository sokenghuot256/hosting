import { Module } from '@nestjs/common';
import { BookController } from './controller';
import { BookService } from './service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class BookModule {}
