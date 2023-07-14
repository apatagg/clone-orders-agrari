export type StorageType = "Token" | "WPTK";
const StorageTypes: StorageType[] = ["Token", "WPTK"];

export default class StorageService {
    formatName = 'Agrari';
    static instance?: StorageService;

    static getInstance(): StorageService {
        if(!StorageService.instance) StorageService.instance = new StorageService();
        return StorageService.instance;
    }

    store(objects: { key: StorageType, value: any }[] | { key: StorageType, value: any }) {
        let objectArray: { key: string, value: any }[] = [];

        objectArray = !Array.isArray(objects) ? [objects] : objects;

        objectArray.forEach((object: {key: string, value: any}) => {
            const objectString = typeof object.value !== 'string' ? JSON.stringify(object.value) : object.value;
            localStorage.setItem(this.formatName + object.key, objectString);
        });
    }

    get(keys: StorageType[] | StorageType) {
        let keyArray: string[] = [];
        let response : any = {};

        keyArray = !Array.isArray(keys) ? [keys] : keys;

        keyArray.forEach(key => {
                try {
                    response[key] = JSON.parse(localStorage.getItem(this.formatName + key)!);
                } catch (e) {
                    response[key] = localStorage.getItem(this.formatName + key);
                }
            }
        );

        return response;
    }

    remove(keys: StorageType[] | StorageType) {
        let keyArray: string[] = [];

        keyArray = !Array.isArray(keys) ? [keys] : keys;

        keyArray.forEach(key => {
            localStorage.removeItem(this.formatName + key);
        });
    }

    clear() {
        StorageTypes.forEach(key => {
            localStorage.removeItem(this.formatName + key);
        });
    }
}
