export interface Product {
  id: number;
  appliance_type: string;
  application_date: string;
  brand: string;
  collection_address: string;
  created_at: string;
  damaged_appliance_image: string;
  preferred_contact_method: string;
  problem_details: string;
  service_type: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
  };
}

