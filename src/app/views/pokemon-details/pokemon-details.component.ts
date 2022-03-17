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
    const name = this.pokemonService.getPokemon(`${this.urlName}/${this.id}`);
    console.log(this.id);

    return forkJoin([pokemon, name]).subscribe(
      res =>{
        this.pokemons = res;
        this.isLoading = true;
        console.log(this.pokemons);
      }
    )

  }

}
