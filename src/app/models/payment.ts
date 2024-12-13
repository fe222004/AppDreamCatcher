export interface Payment {
  user_id: number;
  full_name: string;
  email: string;
  telephone_number: string;
  card_type: string;
  card_number: string;
  security_code: string;
  amount_payable: number;
  product_id: number;
}
