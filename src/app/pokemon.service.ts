import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  urlBase: string = "https://pokeapi.co/api/v2/pokemon";
  urlEvolucoes: string = "https://pokeapi.co/api/v2/evolution-chain/";
  constructor(private http: HttpClient) { }

  // pegando todos os pokemons
  getPokemons(limit: number, offset: number){
    return this.http.get(`${this.urlBase}?limit=${limit}&offset=${offset}`);
  }

  // buscando informações de cada pokemon
  getMaisInfo(name: string){
    return this.http.get(`${this.urlBase}/${name}`);
  }

  getPokemon(url: string): Observable<any>{
    return this.http.get(url).pipe(
      map(
        res => res
      )
    )
  }
  getPokemonEvolucoes(id: string){
    return this.http.get(`${this.urlEvolucoes}${id}`).pipe(
      map(
        res => res
      )
    )
  }

}
