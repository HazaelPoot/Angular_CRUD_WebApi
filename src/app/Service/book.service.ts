import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Book } from '../Models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  Url = 'http://www.gblobalwebapi.somee.com/api/books'

  constructor(private http:HttpClient) 
  {

  }

  //LISTAR LIBROS
   getBooks()
   {
    return this.http.get(this.Url +`/Get`);
   }
   
   //AGREGAR LIBROS
   addBook(book:Book): Observable<Book>
   {
      return this.http.post<Book>(this.Url, book);
   }

   //EDITAR LIBROS
   editBook(idLibro:number, book:Book) : Observable<Book>
   {
    return this.http.put<Book>(this.Url + `/${idLibro}`, book);
   }

   //ELIMINAR LIBROS
   deletBook(idLibro:number)
   {
    return this.http.delete(this.Url + `/${idLibro}`);
   }
}
