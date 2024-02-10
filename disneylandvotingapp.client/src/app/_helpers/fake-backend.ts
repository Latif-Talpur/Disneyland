import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Role } from '..//_models';
import { Character } from '../_models/character';

const usersKey = 'users_data';
let users = JSON.parse(localStorage.getItem(usersKey)) || 
[
    { id: 1, title: 'Mr', firstName: 'Joe', lastName: 'Bloggs', email: 'joe@bloggs.com', role: Role.User, password: 'joe123' },
    { id: 2, title: 'Mr', firstName: 'Joe', lastName: 'Bloggs', email: 'joe@bloggs.com', role: Role.User, password: 'joe123' },
    { id: 3, title: 'Mr', firstName: 'Joe', lastName: 'Bloggs', email: 'joe@bloggs.com', role: Role.User, password: 'joe123' },
    
];

const characterKey = 'characters_data';
let characters = JSON.parse(localStorage.getItem(characterKey)) || [
  {"id":1,"name":"Mickey Mouse","pictureUrl":"src\\images\\Mickey_mouse.svg.png"},
  {"id":2,"name":"Donald Duck","pictureUrl":"src\\images\\Donald_Duck.png"},
  {"id":3,"name":"Goofy","pictureUrl":"src\\images\\Goofy_Duckipedia.png"},
  {"id":4,"name":"Cinderella","pictureUrl":"src\\images\\Cinderella.png"},
  {"id":5,"name":"Simba","pictureUrl":"src\\images\\Simba.png"},
  {"id":6,"name":"Ariel","pictureUrl":"src\\images\\Ariel_disney.png"}
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.endsWith('/users') && method === 'POST':
                    return createUser();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.endsWith('/characters') && method === 'GET':
                    return getCharacters();
                case url.match(/\/characters\/\d+$/) && method === 'GET':
                    return getCharacterById();
                case url.endsWith('/characters') && method === 'POST':
                    return createCharacter();
                case url.match(/\/characters\/\d+$/) && method === 'PUT':
                    return updateCharacter();
                case url.match(/\/characters\/\d+$/) && method === 'DELETE':
                    return deleteCharacter();
                default:
                    return next.handle(request);
            }
        }
        function getUsers() {
            return ok(users.map(x => basicUserDetails(x)));
        }

        function getUserById() {
            const user = users.find(x => x.id === idFromUrl());
            return ok(basicUserDetails(user));
        }

        function createUser() {
            const user = body;

            if (users.find(x => x.email === user.email)) {
                return error(`User with the email ${user.email} already exists`);
            }
            user.id = newUserId();
            delete user.confirmPassword;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function updateUser() {
            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            if (!params.password) {
                delete params.password;
            }
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function getCharacters() {
            return ok(characters.map(x => basicCharacterDetails(x)));
        }

        function getCharacterById() {
            const character = characters.find(x => x.id === idFromUrl());
            return ok(basicCharacterDetails(character));
        }

        function createCharacter() {
            const character = body;
            character.id = newCharacterId();
            characters.push(character);
            localStorage.setItem(characterKey, JSON.stringify(characters));

            return ok();
        }

        function updateCharacter() {
            let params = body;
            let character = characters.find(x => x.id === idFromUrl());
            
            Object.assign(character, params);
            localStorage.setItem(characterKey, JSON.stringify(characters));

            return ok();
        }

        function deleteCharacter() {
            characters = characters.filter(x => x.id !== idFromUrl());
            localStorage.setItem(characterKey, JSON.stringify(characters));
            return ok();
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); 
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); 
        }

        function basicUserDetails(user) {
            const { id, title, firstName, lastName, email, role } = user;
            return { id, title, firstName, lastName, email, role };
        }

        function basicCharacterDetails(character) {
            const { id, name, pictureUrl } = character;
            return { id, name, pictureUrl} ;
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function newUserId() {
            return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        }

        function newCharacterId() {
            return characters.length ? Math.max(...characters.map(x => x.id)) + 1 : 1;
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
