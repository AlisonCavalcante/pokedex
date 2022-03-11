import { PokemonService } from './../../pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons()
    .subscribe((response: any ) =>{
      response.results.forEach((result: any) => {
        this.pokemonService.getMaisInfo(result.name)
        .subscribe((uniqresponse: any) =>{
          this.pokemons.push(uniqresponse);
          console.log(this.pokemons);
        })
      })
    })
  }

}
