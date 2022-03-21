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
  ultima_evolucao = false;

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
    //busca o pokemon que vai ser exibido as evoluções pelo id vindo da rota;
    for (let pokemon of this.pokemons) {
      if (this.id == pokemon.id) {
        //pegando a forma do pokemon da rota para juntar no array com as próximas
        this.prev_evolution = pokemon;
        // salvando o array de evoluções
        if (pokemon.next_evolution == undefined) {
          if (pokemon.prev_evolution != undefined) {
            this.evolucoes.push(pokemon.prev_evolution);
            this.evolucoes.push(pokemon.next_evolution);
          }
        } else this.evolucoes.push(pokemon.next_evolution);
        this.evolucao_previa = true;
      }
    }
    if (this.evolucoes[0] != undefined) {
      this.sem_evolucao = false;
      for (let evol of this.evolucoes[0]) {
        // console.log(evol)
        let name = evol.name.toLowerCase();
        this.poKemonService
          .getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .subscribe((res) => {
            this.evolucao.push(res);
          });
      }
      this.poKemonService
        .getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${this.prev_evolution.name.toLowerCase()}`
        )
        .subscribe((res) => {
          if (this.evolucao_previa) {
            this.evolucao.unshift(res);
          } else {
            this.evolucao.push(res);
          }
          console.log(this.evolucao)
          this.evolucao.sort((a: any,b: any) =>{
            return a.id - b.id
          })
          console.log(this.evolucao)
        });


    }


  }
  getPokemon(name: string){
    this.poKemonService
    .getPokemon(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    ).subscribe(res =>{
      this.evolucao = res;
    })
  }
}
