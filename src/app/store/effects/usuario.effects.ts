import { createEffect, Actions, ofType } from '@ngrx/effects';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuario } from '../actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as usuarioActios from '../actions/usuario.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioEffects {
	constructor(private actions$: Actions, private usuarioService: UsuarioService) {}
	cargarUsuario$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(cargarUsuario),
			mergeMap(({ id }) =>
				this.usuarioService
					.getUser(id)
					.pipe(
						map(user => usuarioActios.cargarUsuarioSuccess({ user })),
						catchError(error => of(usuarioActios.cargarUsuarioError({ error })))
					)
			)
		);
	});
}
