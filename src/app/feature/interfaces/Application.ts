export interface Application {
  id?: number;
  business_application_id?: number;
  sales_agent_first_name?: string;
  sales_agent_last_name?: string;
  sales_agent_email?: string;
  account_type?: string;
  created_at: Date;
  application_status?: string;
  business_category?: string;
  updated_at: Date;
}
