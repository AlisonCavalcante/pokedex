import { PokemonService } from './../../pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-card-evolucoes',
  templateUrl: './pokemon-card-evolucoes.component.html',
  styleUrls: ['./pokemon-card-evolucoes.component.css']
})
export class PokemonCardEvolucoesComponent implements OnInit {

  pokemons: any[] = [];
  constructor(private poKemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.poKemonService.getPokemonEvolucoes().subscribe((res: any ) =>{
      this.pokemons = res.pokemon;
      console.log(this.pokemons);
    })
  }

}
