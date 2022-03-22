import { PokemonService } from './../../pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  id!: string;
  pokemons: any[] = [];


  public isLoading: boolean = false;
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private activeRouter: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemon;
  }

  get pokemon(){
    this.id = this.activeRouter.snapshot.params['id'];
    const pokemon = this.pokemonService.getPokemon(`${this.urlPokemon}/${this.id}`);
    const evolucoes = this.pokemonService.getPokemonEvolucoes();

    return forkJoin([pokemon, evolucoes]).subscribe(
      res =>{
        this.pokemons = res;
        this.isLoading = true;
        this.getInfoAdcionais();
      }
    )
  }

  getInfoAdcionais(){
    for(let pokemon of this.pokemons[1].pokemon){
      if(this.id == pokemon.id){
        this.pokemons.push(pokemon.weaknesses)
        this.pokemons.splice(1,1)
        console.log(this.pokemons)
      }
    }
  }

}
