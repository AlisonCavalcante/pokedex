import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  urlBase: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) { }

  // pegando todos os pokemons
  getPokemons(){
    return this.http.get(`${this.urlBase}?limit=20`);
  }

  // buscando informações de cada pokemon
  getMaisInfo(name: string){
    return this.http.get(`${this.urlBase}/${name}`);
  }

}
