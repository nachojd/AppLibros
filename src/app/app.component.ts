import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libro } from './Interfaces/libro';
import { LibroService } from './Services/libro.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  listaLibros:Libro[]=[];
  formularioLibro:FormGroup;

  constructor(
    private _libroServicio:LibroService,
    private fb:FormBuilder
  ){

this.formularioLibro = this.fb.group({
  titulo:['',Validators.required],
  autor:['',Validators.required],
  imagen:['',Validators.required],
  descripcion:['',Validators.required],
  fechaPublicacion:['',Validators.required],
  estrellas:['',Validators.required],

})
}

obtenerLibros(){
  this._libroServicio.getList().subscribe({
    next:(data)=>{
      this.listaLibros = data;
    },error:(e)=>{}
  });
}



ngOnInit(): void {
    this.obtenerLibros();
}

agregaLibro(){
  const request: Libro = {
    id:0,
    titulo: this.formularioLibro.value.titulo,
    autor: this.formularioLibro.value.autor,
    imagen: this.formularioLibro.value.imagen,
    descripcion: this.formularioLibro.value.descripcion,
    fechaPublicacion: this.formularioLibro.value.fechaPublicacion,
    estrellas: this.formularioLibro.value.estrellas,
  }

  this._libroServicio.add(request).subscribe({
    next:(data)=>{
      this.listaLibros.push(data);
      this.formularioLibro.patchValue({
        titulo:'',
        autor:'',
        imagen:'',
        descripcion:'',
        fechaPublicacion:'',
        estrellas:'',
      })
    },error:(e)=>{}
  })
}

eliminarLibro(libro: Libro){
  this._libroServicio.delete(libro.id).subscribe({
    next:(data)=>{
      // Devuelve la nueva lista sin el libro eliminado
      const nuevaLista = this.listaLibros.filter(item => item.id!=libro.id);
      this.listaLibros = nuevaLista;
    },error:(e)=>{
      console.error('Error al eliminar el libro:', e);
    }
  })
}

}

