import { ActivatedRoute } from '@angular/router';
import { PokemonService } from './../../pokemon.service';
import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-pokemon-card-evolucoes',
  templateUrl: './pokemon-card-evolucoes.component.html',
  styleUrls: ['./pokemon-card-evolucoes.component.css'],
})
export class PokemonCardEvolucoesComponent implements OnInit {
  id!: string;
  pokemons: any[] = [];
  evolucoes: any[] = [];
  evolucao: any[] = [];
  prev_evolution: any;
  sem_evolucao = true;
  constructor(
    private poKemonService: PokemonService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.poKemonService.getPokemonEvolucoes().subscribe((res: any) => {
      this.pokemons = res.pokemon;
      this.extrairEvolucoes();
    });
  }

  extrairEvolucoes() {
    this.id = this.router.snapshot.params['id'];
    let namePrimeiraForma;
    for (let pokemon of this.pokemons) {
      if (this.id == pokemon.id) {
        this.prev_evolution = pokemon;
        this.evolucoes.push(pokemon.next_evolution);
      }
    }
    if (this.evolucoes[0] != undefined) {
      this.sem_evolucao = false;
      for (let evol of this.evolucoes[0]) {
        let name = evol.name.toLowerCase();
        this.poKemonService
          .getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .subscribe((res) => {
            this.evolucao.push(res);
          });
      }
      this.poKemonService
          .getPokemon(`https://pokeapi.co/api/v2/pokemon/${this.prev_evolution.name.toLowerCase()}`)
          .subscribe((res) => {
            this.evolucao.unshift(res);
          });
      console.log(this.evolucao);
    }
  }
}
