import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pesquisar-pokemons',
  templateUrl: './pesquisar-pokemons.component.html',
  styleUrls: ['./pesquisar-pokemons.component.css']
})
export class PesquisarPokemonsComponent implements OnInit {

  @Output() public emmitPesquisar: EventEmitter<string> = new EventEmitter();

  pesquisarTexto = '';
  constructor() { }

  ngOnInit(): void {
  }

  pesquisar(){
    this.emmitPesquisar.emit(this.pesquisarTexto);
  }
}
