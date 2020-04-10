import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { cargarUsuario } from 'src/app/store/actions';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styles: []
})
export class UsuarioComponent implements OnInit, OnDestroy {
	private subs: Subscription = new Subscription();

	usuario: Usuario = null;

	constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {}

	ngOnInit(): void {
		this.subs.add(this.getUser());
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}

	private getUser() {
		return this.activatedRoute.params
			.pipe(
				map(params => params.id),
				filter(id => id != null),
				tap(userId => this.store.dispatch(cargarUsuario({ id: userId }))),
				switchMap(() => this.store.select('usuario'))
			)
			.subscribe(({ user }) => (this.usuario = user));
	}
}
