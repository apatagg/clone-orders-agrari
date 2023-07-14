import {BaseApi} from './base.service';
import {LineItem} from '../models/orders';

export enum WEIGHT_TYPES {
    VERY_HEAVY,
    HEAVY,
    MEDIUM,
    NORMAL,
    LIGHT,
    FRAGILE,
    TOP
}

export default class WeightService extends BaseApi {
    static instance?: WeightService;

    PRODUCTS: {[key: string]: WEIGHT_TYPES} = {
        '1963': WEIGHT_TYPES.VERY_HEAVY, // Sandia
        '1965': WEIGHT_TYPES.VERY_HEAVY, // Melon
        '543': WEIGHT_TYPES.VERY_HEAVY, // Calabaza cacahuete
        '434': WEIGHT_TYPES.VERY_HEAVY, // Calabaza redonda
        '600': WEIGHT_TYPES.VERY_HEAVY, // Cacahuete crudo
        '1080': WEIGHT_TYPES.VERY_HEAVY, // Maiz
        '383': WEIGHT_TYPES.VERY_HEAVY, // Patata
        '731': WEIGHT_TYPES.VERY_HEAVY, // Boniato
        '430': WEIGHT_TYPES.VERY_HEAVY, // Cebolla seca
        '428': WEIGHT_TYPES.VERY_HEAVY, // Cebolla dulce
        '1042': WEIGHT_TYPES.VERY_HEAVY, // Cebolla tierna
        '381': WEIGHT_TYPES.VERY_HEAVY, // Zanahoria
        '567': WEIGHT_TYPES.VERY_HEAVY, // Limon
        '729': WEIGHT_TYPES.VERY_HEAVY, // Col lisa
        '727': WEIGHT_TYPES.VERY_HEAVY, // Col rizada
        '963': WEIGHT_TYPES.VERY_HEAVY, // Coliflor

        '416': WEIGHT_TYPES.HEAVY, // Bajoqueta Perona
        '564': WEIGHT_TYPES.HEAVY, // Bajoqueta bobi
        '1957': WEIGHT_TYPES.HEAVY, // Aceite de Oliva ECO Virgen Extra Premium (500mL)
        '2716': WEIGHT_TYPES.NORMAL, // Aceite de Oliva Virgen Extra (1L)
        '1959': WEIGHT_TYPES.NORMAL, // Aceite de Oliva Virgen Extra Premium (1L)
        '1961': WEIGHT_TYPES.HEAVY, // Almendras
        '1954': WEIGHT_TYPES.HEAVY, // Malferida
        '905': WEIGHT_TYPES.HEAVY, // Nueces
        '2098': WEIGHT_TYPES.HEAVY, // Arroz

        '407': WEIGHT_TYPES.MEDIUM, // Garrofo
        '1078': WEIGHT_TYPES.MEDIUM, // Chufa
        '1456': WEIGHT_TYPES.MEDIUM, // Ajo
        '1048': WEIGHT_TYPES.MEDIUM, // Habas
        '426': WEIGHT_TYPES.MEDIUM, // Magrana
        '798': WEIGHT_TYPES.MEDIUM, // Naranja
        '569': WEIGHT_TYPES.MEDIUM, // Rabano
        '395': WEIGHT_TYPES.MEDIUM, // Pera Conferencia
        '397': WEIGHT_TYPES.MEDIUM, // Pera Ercolina
        '745': WEIGHT_TYPES.MEDIUM, // Alcachofa

        '389': WEIGHT_TYPES.NORMAL, // Calabacin
        '379': WEIGHT_TYPES.NORMAL, // Berenjena
        '393': WEIGHT_TYPES.NORMAL, // Pimiento italiano
        '410': WEIGHT_TYPES.NORMAL, // Pimiento rojo
        '1931': WEIGHT_TYPES.NORMAL, // Aguacate
        '1044': WEIGHT_TYPES.NORMAL, // Calçot
        '1454': WEIGHT_TYPES.NORMAL, // Espárrago
        '566': WEIGHT_TYPES.NORMAL, // Kaki
        '808': WEIGHT_TYPES.NORMAL, // Kiwi
        '412': WEIGHT_TYPES.NORMAL, // Puerro
        '391': WEIGHT_TYPES.NORMAL, // Platano
        '3269': WEIGHT_TYPES.NORMAL, // Mermelada de Naranja Amarga
        '3260': WEIGHT_TYPES.NORMAL, // Mermelada de limón y miel (250gr)
        '3256': WEIGHT_TYPES.NORMAL, // Mermelada de Mandarina (250gr)
        '3110': WEIGHT_TYPES.NORMAL, // Crema untable de Chufa y Cacao (230g)
        '3108': WEIGHT_TYPES.NORMAL, // Hummus ECO (110gr)
        '3106': WEIGHT_TYPES.NORMAL, // Paté Zanahoria con Nueces y Albahaca ECO (110gr)
        '2264': WEIGHT_TYPES.NORMAL, // Miel artesanal de la sierra de Mariola (1kg)
        '2174': WEIGHT_TYPES.NORMAL, // Paté olivas negras con tomate seco (110gr)
        '2172': WEIGHT_TYPES.NORMAL, // Paté ECO Berenjena con tahine negro y comino (110gr)
        '1220': WEIGHT_TYPES.NORMAL, // Sobravegana Eco Clásica (110gr)
        '1211': WEIGHT_TYPES.HEAVY, // Paté vegetal de Alcachofa al curry (110gr)
        '1218': WEIGHT_TYPES.HEAVY, // Garbanzos cocidos con comino
        '1213': WEIGHT_TYPES.HEAVY, // Hummus (de garbanzos) con Calabaza y Ras El Hanout (110gr)

        '574': WEIGHT_TYPES.LIGHT, // Mandarina
        '401': WEIGHT_TYPES.LIGHT, // Ciruela amarilla
        '424': WEIGHT_TYPES.LIGHT, // Ciruela negra
        '1941': WEIGHT_TYPES.LIGHT, // Ciruela fresa
        '1832': WEIGHT_TYPES.LIGHT, // Albaricoque
        '1755': WEIGHT_TYPES.LIGHT, // Paraguayo
        '399': WEIGHT_TYPES.LIGHT, // Melocoton
        '1046': WEIGHT_TYPES.LIGHT, // Coles de bruselas
        '1459': WEIGHT_TYPES.LIGHT, // Nispero

        '882': WEIGHT_TYPES.FRAGILE, // Lechuga hoja roble
        '884': WEIGHT_TYPES.FRAGILE, // Lechuga Lollo Rosso
        '432': WEIGHT_TYPES.FRAGILE, // Lechuga Romana
        '403': WEIGHT_TYPES.FRAGILE, // Champiñones
        '1452': WEIGHT_TYPES.FRAGILE, // Fresa
        '1751': WEIGHT_TYPES.FRAGILE, // Cerezas
        '414': WEIGHT_TYPES.FRAGILE, // Acelga
        '422': WEIGHT_TYPES.FRAGILE, // Espinaca
        '565': WEIGHT_TYPES.FRAGILE, // Brocoli
        '436': WEIGHT_TYPES.FRAGILE, // Uva moscatel
        '438': WEIGHT_TYPES.FRAGILE, // Uva blanca
        '570': WEIGHT_TYPES.FRAGILE, // Uva negra
        '405': WEIGHT_TYPES.FRAGILE, // Rebollones
        '3193': WEIGHT_TYPES.FRAGILE, // Tomates RAF
        '2056': WEIGHT_TYPES.FRAGILE, // Tomates Ensalada
        '420': WEIGHT_TYPES.FRAGILE, // Tomate Valenciano
        '418': WEIGHT_TYPES.FRAGILE, // Tomate Pera

        '3207': WEIGHT_TYPES.TOP, // Huevos Camperos (6ud)
        '3202': WEIGHT_TYPES.TOP, // Huevos Camperos (12ud)
    }

    static getInstance(): WeightService {
        if(!WeightService.instance) WeightService.instance = new WeightService();
        return WeightService.instance;
    }

    reorderByWeight(products: LineItem[]) {
        return products.sort((a, b) => {
            const weightA = this.getWeight(a.product_id);
            const weightB = this.getWeight(b.product_id);

            if(weightA === weightB) return 0;
            if(weightA > weightB) return 1;
            return -1;
        });
    }

    getWeight(productId: number) {
        return this.PRODUCTS[productId] ?? WEIGHT_TYPES.NORMAL;
    }

}
