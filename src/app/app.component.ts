import { Component } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Book } from './Models/book.model';
import { BookService } from './Service/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD2';
  books: Book = new Book();
  datatable: any = [];

  constructor(private bookService : BookService){}

  ngOnInit() : void
  {
    this.getAllBooks();
  }

  //ACCION PARA LISTAR 
  getAllBooks()
  {
    this.bookService.getBooks()
    .subscribe(res => {
      this.datatable = res;
      console.log(res);
    })
  }

  //ACCION PARA ENVIAR DATOS AL FORM
  onSelect(select: any)
  {
    this.books.idLibro = select.idLibro;
    this.books.titulo = select.titulo;
    this.books.autor = select.autor;
    this.books.editorial = select.editorial;
  }

  //ACCION PARA LIMPIAR EL FORM
  onClear()
  {
    this.books.idLibro = 0;
    this.books.titulo = "";
    this.books.autor = "";
    this.books.editorial = "";
  }

  //ACCION PARA AGREGAR
  onAddBook(book: Book) : void
  {
    if(book.titulo == "" || book.autor == "" || book.editorial == "")
      {
        alert(`Porfavor llene todos los campos`);
      }
      else
      {
        this.bookService.addBook(book)
        .subscribe(res => {
          if(res)
          {
            alert(`El libro "${book.titulo}" se ha registrado correctamente..!!`);
            this.onClear();
            this.getAllBooks();
          }
          else
          {
            alert(`Error, algo salio mal`)
          }
          
        });
      }
    
  }

  //ACCION PARA EDITAR
  onEditBook(book:Book) : void
  {
    if(book.titulo == "" || book.autor == "" || book.editorial == "")
      {
        alert(`Porfavor seleccione un registro`);
      }
      else
      {
      this.bookService.editBook(book.idLibro, book)
        .subscribe(res => 
          {
            if(res)
            {
              alert(`El Libro "${book.titulo}" se ha modificado correctamente..!!`)
              this.onClear();
              this.getAllBooks();
            }
            else
            {
              alert(`Error, algo salio mal`)
            }
        });
    }
  }

  //ACCION PARA ELIMINAR UN LIBRO
  onDeleteBook(id:number) : void
  {
    if(id == 0)
      {
        alert(`Porfavor seleccione un registro`);
      }
      else
      {
      this.bookService.deletBook(id)
        .subscribe(res =>
          {
            if(res)
            {
              alert(`El Libro ${id} se ha eliminado correctamente..!!`)
              this.onClear();
              this.getAllBooks();
            }
            else
            {
              alert(`Error, algo salio mal`)
            }
          });
      }
  }

}
