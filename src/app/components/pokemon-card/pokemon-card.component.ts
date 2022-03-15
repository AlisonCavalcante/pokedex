import { PokemonService } from './../../pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  page = 1;
  totalPokemons!: number;
  setPokemons: any [] = [];
  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons(){
    this.pokemonService.getPokemons(20, this.page + 0)
    .subscribe((response: any ) =>{
      this.totalPokemons = response.count;
      response.results.forEach((result: any) => {
        this.pokemonService.getMaisInfo(result.name)
        .subscribe((uniqresponse: any) =>{
          this.pokemons.push(uniqresponse);
          this.setPokemons.push(uniqresponse);
          console.log(this.pokemons);
        })
      })
    })
  }
  navegacao(id: string){
    console.log("entrando aqui")
    this.router.navigate(['pokemon', id]);
  }

  getPesquisar(value: string){
    console.log(value);
    const filter = this.setPokemons.filter((res: any) =>{
      return !res.name.indexOf(value.toLowerCase());
    });
    this.pokemons = filter;
  }
}
