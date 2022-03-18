import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './views/pokemon-details/pokemon-details.component';
import { PesquisarPokemonsComponent } from './components/pesquisar-pokemons/pesquisar-pokemons.component';
import { PokemonCardEvolucoesComponent } from './components/pokemon-card-evolucoes/pokemon-card-evolucoes.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    PesquisarPokemonsComponent,
    PokemonCardEvolucoesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
