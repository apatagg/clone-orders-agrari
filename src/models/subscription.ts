export interface Subscription {
    active: boolean;
    customerData: string;
    dayOfWeek: string;
    planId: string;
    subscriptionID: string;
    timeRange: string;
    planType: 'medium' | 'large';
    planInterval: 'monthly' | 'biweekly';
}

export interface SubscriptionDTO {
    active: boolean;
    customerData: string;
    dayOfWeek: string;
    planId: string;
    subscriptionID: string;
    timeRange: string;
}
