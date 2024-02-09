import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Role } from '../_models';

// array in local storage for registered users
const Key = 'angular-master-details-character';
let characters = JSON.parse(localStorage.getItem(Key)) || [
  {"id":1,"name":"Mickey Mouse","pictureUrl":"https://example.com/mickey.jpg"},
  {"id":2,"name":"Donald Duck","pictureUrl":"https://example.com/donald.jpg"},
  {"id":3,"name":"Goofy","pictureUrl":"https://example.com/goofy.jpg"},
  {"id":4,"name":"Cinderella","pictureUrl":"https://example.com/cinderella.jpg"},
  {"id":5,"name":"Simba","pictureUrl":"https://example.com/simba.jpg"},
  {"id":6,"name":"Ariel","pictureUrl":"https://example.com/ariel.jpg"}
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
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
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function getCharacters() {
            return ok(characters.map(x => basicDetails(x)));
        }

        function getCharacterById() {
            const user = characters.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function createCharacter() {
            const character = body;
            // assign user id and a few other properties then save
            character.id = newUserId();
            characters.push(character);
            localStorage.setItem(Key, JSON.stringify(characters));

            return ok();
        }

        function updateCharacter() {
            let params = body;
            let user = characters.find(x => x.id === idFromUrl());

            // update and save user
            Object.assign(characters, params);
            localStorage.setItem(Key, JSON.stringify(characters));

            return ok();
        }

        function deleteCharacter() {
          characters = characters.filter(x => x.id !== idFromUrl());
            localStorage.setItem(Key, JSON.stringify(characters));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function basicDetails(user) {
            const { id, title, firstName, lastName, email, role } = user;
            return { id, title, firstName, lastName, email, role };
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function newUserId() {
            return characters.length ? Math.max(...characters.map(x => x.id)) + 1 : 1;
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
