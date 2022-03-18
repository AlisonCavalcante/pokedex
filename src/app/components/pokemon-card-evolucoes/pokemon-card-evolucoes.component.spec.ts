import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardEvolucoesComponent } from './pokemon-card-evolucoes.component';

describe('PokemonCardEvolucoesComponent', () => {
  let component: PokemonCardEvolucoesComponent;
  let fixture: ComponentFixture<PokemonCardEvolucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonCardEvolucoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardEvolucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
