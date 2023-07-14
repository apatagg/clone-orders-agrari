import {BaseApi} from './base.service';
import {Order} from '../models/orders';
import {Subscription} from '../models/subscription';
import {WpAuth} from '../models/wp-auth';
import StorageService from './storage.service';
import {collection, doc, getDoc, getDocs, getFirestore} from 'firebase/firestore';

export default class SubscriptionsService extends BaseApi {
    static instance?: SubscriptionsService;

    static getInstance(): SubscriptionsService {
        if(!SubscriptionsService.instance) SubscriptionsService.instance = new SubscriptionsService();
        return SubscriptionsService.instance;
    }

    getSubscriptions(): Promise<void | Subscription[]> {
        const db = getFirestore();
        const collectionRef = collection(db, "subscriptions");

        // Use firebase/firestore to get all the subscriptions from 'subscriptions' collection
        return getDocs(collectionRef).then(docs => {
            const mappedDocs : Subscription[] = docs.docs.map(doc => {
                return {
                    subscriptionID: doc.id,
                    active: doc.data().active,
                    customerData: doc.data().customerData,
                    dayOfWeek: doc.data().dayOfWeek,
                    planId: doc.data().planId,
                    timeRange: doc.data().timeRange,
                } as Subscription;
            });
            console.log(mappedDocs);
            return mappedDocs;
        });
    }
}
