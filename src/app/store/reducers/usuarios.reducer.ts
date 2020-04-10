import { createReducer, on, Action } from '@ngrx/store';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from './../actions/index';
import { Usuario } from 'src/app/models/usuario.model';

export interface UsuariosState {
	users: Usuario[];
	loaded: boolean;
	loading: boolean;
	error: any;
}

const initialState: UsuariosState = {
	users: [],
	loaded: false,
	loading: false,
	error: null
};

const _usuariosReducer = createReducer(
	initialState,
	on(cargarUsuarios, state => ({ ...state, loading: true })),
	on(cargarUsuariosSuccess, (state, { usuarios }) => ({
		...state,
		loaded: true,
		loading: false,
		users: usuarios
	})),
	on(cargarUsuariosError, (state, { payload }) => ({
		...state,
		loading: false,
		loaded: false,
		error: { url: payload.url, message: payload.message, error: payload.error }
	}))
);

export function usuariosReducer(state: UsuariosState, action: Action) {
	return _usuariosReducer(state, action);
}
