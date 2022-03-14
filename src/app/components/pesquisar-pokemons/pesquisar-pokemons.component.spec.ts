import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarPokemonsComponent } from './pesquisar-pokemons.component';

describe('PesquisarPokemonsComponent', () => {
  let component: PesquisarPokemonsComponent;
  let fixture: ComponentFixture<PesquisarPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisarPokemonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
