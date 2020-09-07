import Axios from 'axios'
import { LocalStorage } from 'quasar'

const baseURL = process.env['VUE_APP_API_URL'] as string;
const axios = Axios.create({ baseURL });

axios.interceptors.request.use(config => {
    if (LocalStorage.has('session')) {
        const session = LocalStorage.getItem('session') as any;
        config.headers['Authorization'] = `Bearer ${session['token']}`;
    }
    return config;
});

export class Service {

    public async login(username: string, password: string): Promise<void> {
        const response = await axios.post('/login', { username, password });
        const token = response.data['token'];
        LocalStorage.set('session', { token });
    }

}

export default new Service();