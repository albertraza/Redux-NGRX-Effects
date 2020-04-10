import { Usuario } from 'src/app/models/usuario.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as usuarioActions from '../actions/index';

export interface UsuarioState {
	user: Usuario;
	id: string;
	loaded: boolean;
	loading: boolean;
	error: any;
}

const initialState: UsuarioState = {
	user: null,
	id: null,
	loaded: false,
	loading: false,
	error: null
};

const _usuarioReducer = createReducer(
	initialState,
	on(usuarioActions.cargarUsuario, (state, { id }) => ({ ...state, id, loading: true })),
	on(usuarioActions.cargarUsuarioSuccess, (state, { user }) => ({
		...state,
		id: null,
		loading: false,
		loaded: true,
		user: { ...user }
	})),
	on(usuarioActions.cargarUsuarioError, (state, { error }) => ({
		...state,
		error: { url: error.url, message: error.message, status: error.status },
		loading: false,
		loaded: false
	}))
);

export function usuarioReducer(state: UsuarioState, action: Action) {
	return _usuarioReducer(state, action);
}
