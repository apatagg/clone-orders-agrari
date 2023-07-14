import StorageService from './storage.service';

export default class SessionService {
    static instance?: SessionService;

    static getInstance(): SessionService {
        if(!SessionService.instance) SessionService.instance = new SessionService();
        return SessionService.instance;
    }

    /*
    loginUser(user: User) {
        return this.api.get('/orders').then(response => {
            console.log(...response.data);
        });
    }*/

    getToken() {
        return StorageService.getInstance().get('Token') as (string | undefined);
    }
}
