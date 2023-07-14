export interface Billing {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
}

export interface Shipping {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
}

export interface MetaData {
    id: number;
    key: string;
    value: string;
    display_key?: string;
    display_value?: string;
}

export interface Tax {
    id: number;
    total: string;
    subtotal: string;
}

export interface LineItem {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: Tax[];
    meta_data: MetaData[];
    sku: string;
    price: number;
    parent_name?: any;
    checked?: boolean;
    meta_product_name?: string;
    meta_product_unit?: string;
    meta_product_amount?: number;
    meta_product_seller?: string;
}

export interface TaxLine {
    id: number;
    rate_code: string;
    rate_id: number;
    label: string;
    compound: boolean;
    tax_total: string;
    shipping_tax_total: string;
    rate_percent: number;
    meta_data: any[];
}
export interface ShippingLine {
    id: number;
    method_title: string;
    method_id: string;
    instance_id: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: MetaData[];
}

export interface Date {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface CouponLine {
    id: number;
    code: string;
    discount: string;
    discount_tax: string;
    meta_data: MetaData[];
}

export interface Order {
    id: number;
    parent_id: number;
    status: string;
    currency: string;
    version: string;
    prices_include_tax: boolean;
    date_created: Date;
    date_modified: Date;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    cart_tax: string;
    total: string;
    total_tax: string;
    customer_id: number;
    order_key: string;
    billing: Billing;
    shipping: Shipping;
    payment_method: string;
    payment_method_title: string;
    transaction_id: string;
    customer_ip_address: string;
    customer_user_agent: string;
    created_via: string;
    customer_note: string;
    date_completed?: any;
    date_paid: Date;
    cart_hash: string;
    number: string;
    meta_data: MetaData[];
    line_items: LineItem[];
    tax_lines: TaxLine[];
    shipping_lines: ShippingLine[];
    fee_lines: any[];
    coupon_lines: CouponLine[];
    refunds: any[];
    date_created_gmt: Date;
    date_modified_gmt: Date;
    date_completed_gmt?: any;
    date_paid_gmt: Date;
    currency_symbol: string;
}
