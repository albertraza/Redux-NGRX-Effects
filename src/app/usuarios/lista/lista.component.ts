import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styles: []
})
export class ListaComponent implements OnInit, OnDestroy {
	private subs: Subscription = new Subscription();

	usuarios: Usuario[] = [];
	loading: boolean;
	error: any = null;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(cargarUsuarios());
		this.subs.add(this.getUsers());
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}

	private getUsers() {
		return this.store.select('usuarios').subscribe(({ users, loading, error }) => {
			this.usuarios = users;
			this.loading = loading;
			this.error = error;
		});
	}
}
