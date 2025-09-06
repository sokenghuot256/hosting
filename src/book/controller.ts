import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './service';
import { BookRequest } from './model';

@Controller('books')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() request: BookRequest) {
    return this.service.create(request);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() request: BookRequest) {
    return this.service.update(id, request);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
