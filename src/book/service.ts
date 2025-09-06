import { PrismaService } from '@/prisma.service';
import { BookRequest, BookResponse } from './model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@/generated/prisma';

@Injectable()
export class BookService {
  //   private readonly books: BookResponse[] = [];
  private readonly books: Map<string, BookResponse> = new Map();

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BookResponse[]> {
    // const books: BookResponse[] = [];
    // this.books.forEach((item) => {
    //   books.push(item);
    // });

    // return books;

    const data = await this.prisma.book.findMany();

    return data.map((item) => {
      const res: BookResponse = {
        id: item.id.toString(),
        title: item.title,
        author: item.author,
        description: item.description,
        price: Number(item.price),
      };

      return res;
    });
  }

  async findById(id: string): Promise<BookResponse | null> {
    // const book = this.books.find((u) => u.id === id);
    // if (!book) {
    //   throw new NotFoundException('Book Not Found');
    // }

    // return book;

    // Map
    return this.books.get(id) || null;
  }

  async create(request: BookRequest): Promise<BookResponse> {
    // const id = (this.books.length + 1).toString();
    // const entity: BookResponse = {
    //   id,
    //   ...request,
    //   //   title: request.title,
    //   //   author: request.author,
    //   //   description: request.description,
    //   //   price: request.price,
    // };

    // this.books.push(entity);

    // return entity;

    // Map
    // const id = (this.books.size + 1).toString();
    // const entity: BookResponse = {
    //   id,
    //   ...request,
    // };

    // this.books.set(id, entity);
    // return entity;

    const input: Prisma.BookCreateInput = {
      title: request.title,
      author: request.author,
      description: request.description,
      price: new Prisma.Decimal(request.price),
    };

    const result = await this.prisma.book.create({
      data: input,
    });
    
    return {
      ...result,
      id: result.id.toString(),
      price: Number(result.price),
    };
  }

  async update(id: string, request: BookRequest): Promise<BookResponse | null> {
    // const found = await this.findById(id);
    // if (found) {
    //   found.title = request.title;
    //   found.author = request.author;
    //   found.description = request.description;
    //   found.price = request.price;
    // }

    // return found;

    // Map
    const found = this.books.get(id);
    if (!found) {
      throw new NotFoundException('Book Not Found');
    }

    found.title = request.title;
    found.author = request.author;
    found.description = request.description;
    found.price = request.price;

    return found;
  }

  async delete(id: string): Promise<void> {
    // const bookIndex = this.books.findIndex((book) => book.id === id);
    // if (bookIndex === -1) {
    //   throw new NotFoundException('Book Not Found');
    // }
    // this.books.splice(bookIndex, 1);

    if (!this.books.has(id)) {
      throw new NotFoundException('Book Not Found');
    }
    this.books.delete(id);
  }
}
