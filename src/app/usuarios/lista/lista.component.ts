import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styles: []
})
export class ListaComponent implements OnInit, OnDestroy {
	private subs: Subscription = new Subscription();

	usuarios: Usuario[] = [];

	constructor(private usuarioService: UsuarioService) {}

	ngOnInit(): void {
		this.subs.add(this.getUsers());
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}

	private getUsers() {
		return this.usuarioService.getUsers().subscribe(data => (this.usuarios = data));
	}
}
