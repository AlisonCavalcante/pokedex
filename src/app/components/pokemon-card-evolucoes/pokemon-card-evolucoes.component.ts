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
  evolucao_previa = false;

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
    // obtendo os array das evoluçõe prévias e próximas
    this.getNext_Prev_Evolution();
    // realizando a chamada das informações das evoluções prévias e próximas mais a ordenação pelo id;
    this.getPokemon(this.evolucoes[0]);
    this.getPokemon(this.evolucoes[1]);

    // requisição do pokemon que está no detalhe
    this.poKemonService
      .getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${this.prev_evolution.name.toLowerCase()}`
      )
      .subscribe((res) => {
        this.evolucao.push(res);
        this.evolucao.sort((a: any, b: any) => {
          return a.id - b.id;
        });
      });

  }

  getPokemon(array: any) {
    if (array) {
      this.sem_evolucao = false;
      for (let evol of array) {
        let name = evol.name.toLowerCase();
        this.poKemonService
          .getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .subscribe((res) => {
            this.evolucao.push(res);
            this.evolucao.sort((a: any, b: any) => {
              return a.id - b.id;
            });
          });
      }
    }
  }

  getNext_Prev_Evolution() {
    this.id = this.router.snapshot.params['id'];
    //busca o pokemon que vai ser exibido as evoluções pelo id vindo da rota;
    for (let pokemon of this.pokemons) {
      if (this.id == pokemon.id) {
        //pegando a forma do pokemon da rota para juntar no array com as próximas
        this.prev_evolution = pokemon;
        // salvando o array de evoluções

        if (pokemon.next_evolution == undefined) {
          if (pokemon.prev_evolution) {
            this.evolucoes.push(pokemon.prev_evolution);
          }
        } else if (pokemon.next_evolution) {
          this.evolucoes.push(pokemon.next_evolution);
          this.evolucao_previa = true;
          if (pokemon.prev_evolution) {
            this.evolucoes.push(pokemon.prev_evolution);
          }
        }
      }
    }
  }
}
