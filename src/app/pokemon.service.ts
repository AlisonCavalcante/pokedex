import { Constantes } from './utils/constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url: string = "";
  constructor(private http: HttpClient) { }

  // pegando todos os pokemons
  getPokemons(limit: number, offset: number){
    console.log(offset)
    return this.http.get(Constantes.URLBASE+`?limit=${limit}&offset=${offset}`);
  }

  // buscando informações de cada pokemon
  getMaisInfo(name: string){
    return this.http.get(Constantes.URLBASE+`${name}`);
  }

  getPokemon(id: string): Observable<any>{
    return this.http.get(Constantes.URLBASE+`${id}`).pipe(
      map(
        res => res
      )
    )
  }
  // novasEvolucoes(id: string){
  //   this.http.get(`${this.urlBase}/${id}`).subscribe((res: any) =>{
  //      this.url = res.species.url;
  //     this.http.get(this.url).subscribe((res: any) =>{
  //       this.url = res.evolution_chain.url;

  //     })
  //   })
  //   console.log(this.url)
  //   return this.http.get(this.url);
  // }

  getPokemonEvolucoes(){
     return this.http.get(Constantes.URLEVOLUCOES).pipe(
       map(
         res => res
       )
     )
   }

  getMegaEvol(id: string){
    return this.http.get(Constantes.URLMEGAEVOLUCOES+`${id}`);
  }
  getGenerico(url: string){
    return this.http.get(url);
  }


}
