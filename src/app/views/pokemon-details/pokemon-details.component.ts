import { Constantes } from './../../utils/constantes';
import { PokemonService } from './../../pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {

  id!: string;
  pokemons: any[] = [];
  megaEvolucoes: any;
  nomes: any[] = [];
  nomeMega!: string;
  public isLoading: boolean = false;

  constructor(
    private activeRouter: ActivatedRoute,
    private pokemonService: PokemonService,
    private rota: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    this.activeRouter.params.subscribe((params: any) => {
      let idTemporario;
      this.pokemon;
      idTemporario = params['id'];
      if (this.id != idTemporario) {
        this.id = idTemporario;
        this.pokemon;
        window.location.reload();
      }
    });
    this.getMegaEvolucoes();

  }

  get pokemon() {
    const pokemon = this.pokemonService.getPokemon(this.id);
    const evolucoes = this.pokemonService.getPokemonEvolucoes();

    return forkJoin([pokemon, evolucoes]).subscribe((res) => {
      this.pokemons = res;
      this.isLoading = true;
      this.getInfoAdcionais();
    });
  }

  getInfoAdcionais() {
    for (let pokemon of this.pokemons[1].pokemon) {
      if (this.id == pokemon.id) {
        this.pokemons.push(pokemon.weaknesses);
        this.pokemons.splice(1,1);
        console.log(this.pokemons)
      }
    }
  }
  getMegaEvolucoes(){

    this.pokemonService.getMegaEvol(this.id).subscribe((res: any) =>{
       for(let i of res.varieties){
         this.nomes.push(i.pokemon.name);
       }
      this.nomes.splice(0,1);
    });

  }
  busarMegaEvol(){

    this.pokemonService.getGenerico(Constantes.URLBASE+`${this.nomeMega}`).subscribe((res:any) =>{
      this.rota.navigate(['/pokemon', res.id]);
    })
  }
}
