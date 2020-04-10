import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	private baseUrl = 'https://reqres.in/api';

	constructor(private http: HttpClient) {}

	getUsers() {
		return this.http.get(`${this.baseUrl}/users?per_page=7`).pipe(map((data: any) => data.data));
	}
}
