import { create, AxiosInstanceWrapper } from 'middleware-axios/dist';
import SessionService from './session.service';
import StorageService from './storage.service';
import {WpAuth} from '../models/wp-auth';

export class BaseApi {

    // create wrapped instance in the same way as normal axios instance
    api: AxiosInstanceWrapper = create({
        baseURL: process.env.REACT_APP_WP_API_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    constructor() {
        const wpAuth: WpAuth = StorageService.getInstance().get('WPTK').WPTK;
        console.log(wpAuth);
        this.api.use(async (config, next) => {
            if(!config.headers) config.headers = {};
            // Add token session to headers
            const token = SessionService.getInstance().getToken();
            if(token) config.headers.Authorization = token;
            config.url = config.url + `${'?per_page=100&consumer_key=' + wpAuth.API_KEY + '&consumer_secret=' + wpAuth.API_SECRET + '&key_id='+ wpAuth.KEY_ID + '&user_id=' + wpAuth.USER_ID + '&key_permissions=' + wpAuth.PERMISSIONS}`;
            await next(config);
        });
    }
}
