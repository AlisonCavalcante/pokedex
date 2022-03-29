import { Constantes } from './../../utils/constantes';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from './../../pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-card-evolucoes',
  templateUrl: './pokemon-card-evolucoes.component.html',
  styleUrls: ['./pokemon-card-evolucoes.component.css'],
})
export class PokemonCardEvolucoesComponent implements OnInit {
  id!: string;
  pokemons: any[] = [];
  // evolucoes: any[] = [];
  evolucao: any[] = [];
  // prev_evolution: any;
  sem_evolucao = true;
  // evolucao_previa = false;
  names: any[] = [];
  evolucoesNovas: any;

  constructor(
    private poKemonService: PokemonService,
    private router: ActivatedRoute,
    private rota: Router
  ) {}

  ngOnInit(): void {
    this.poKemonService.getPokemonEvolucoes().subscribe((res: any) => {
      this.pokemons = res.pokemon;
      // this.extrairEvolucoes();
    });
    this.getNamesEvolucoes();
  }

  navegar(id: string) {
    this.rota.navigate(['/pokemon', id]);
  }

  getNamesEvolucoes() {
    this.id = this.router.snapshot.params['id'];
    this.poKemonService
      .getGenerico(Constantes.URLBASE + `${this.id}`)
      .subscribe((res: any) => {
        let url = res.species.url;
        this.poKemonService.getGenerico(url).subscribe((res: any) => {
          url = res.evolution_chain.url;
          this.poKemonService.getGenerico(url).subscribe((res: any) => {
            console.log(res);
            this.evolucoesNovas = res;
            this.extrairEvol(this.evolucoesNovas);
          });
        });
      });
  }

  extrairEvol(novasEvol: any) {
    this.names.push(novasEvol.chain.species.name);
    if (novasEvol.chain.evolves_to.length != 0) {
      this.names.push(novasEvol.chain.evolves_to[0].species.name);
      if (novasEvol.chain.evolves_to[0].evolves_to.length != 0) {
        this.names.push(
          novasEvol.chain.evolves_to[0].evolves_to[0].species.name
        );
        if (
          novasEvol.chain.evolves_to[0].evolves_to[0].evolves_to.length != 0
        ) {
          this.names.push(
            novasEvol.chain.evolves_to[0].evolves_to[0].evolves_to[0].species
              .name
          );
        }
      }
    }
    this.getPokemon(this.names);
  }

  // extrairEvolucoes() {
  //   // obtendo os array das evoluçõe prévias e próximas
  //   this.getNext_Prev_Evolution();

  //   // realizando a chamada das informações das evoluções prévias e próximas mais a ordenação pelo id;
  //   this.getPokemonArray(this.evolucoes[0]);
  //   this.getPokemonArray(this.evolucoes[1]);

  //   // requisição do pokemon que está no detalhe
  //   this.poKemonService
  //     .getPokemon(this.prev_evolution.name.toLowerCase())
  //     .subscribe((res) => {
  //       this.evolucao.push(res);
  //       this.evolucao.sort((a: any, b: any) => {
  //         return a.id - b.id;
  //       });
  //     });
  // }

  getPokemon(array: any) {
    if (array) {
      this.sem_evolucao = false;
      for (let evol of array) {
        console.log(evol);
        this.poKemonService.getPokemon(evol).subscribe((res) => {
          this.evolucao.push(res);
          // this.evolucao.sort((a: any, b: any) => {
          //   return a.id - b.id;
          // });
        });
      }
    }
    console.log(this.evolucao)
  }
  // getPokemon(name: string) {
  //   if (name) {
  //     this.poKemonService.getPokemon(name.toLowerCase()).subscribe((res) => {
  //       console.log(res);
  //     });
  //   }
  // }

  // getNext_Prev_Evolution() {
  //   this.id = this.router.snapshot.params['id'];
  //   //busca o pokemon que vai ser exibido as evoluções pelo id vindo da rota;
  //   for (let pokemon of this.pokemons) {
  //     if (this.id == pokemon.id) {
  //       //pegando a forma do pokemon da rota para juntar no array com as próximas
  //       this.prev_evolution = pokemon;
  //       // salvando o array de evoluções

  //       if (pokemon.next_evolution == undefined) {
  //         if (pokemon.prev_evolution) {
  //           this.evolucoes.push(pokemon.prev_evolution);
  //         }
  //       } else if (pokemon.next_evolution) {
  //         this.evolucoes.push(pokemon.next_evolution);
  //         this.evolucao_previa = true;
  //         if (pokemon.prev_evolution) {
  //           this.evolucoes.push(pokemon.prev_evolution);
  //         }
  //       }
  //     }
  //   }
  // }
}
