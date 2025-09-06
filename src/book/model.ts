export class BookRequest {
  title: string;
  author: string;
  description: string;
  price: number;
}

export class BookResponse {
  id: string;
  title: string;
  author: string;
  description: string | null;
  price: number;
}
