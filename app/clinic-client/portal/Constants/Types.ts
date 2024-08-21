export interface Patient {
  value?: any;
  id?: number;
  firstName: string;
  lastName: string;
  healthInsuranceNumber: string;
  ClinicId?: string;
}

export interface Order {
  id?: number;
  orthesisModel: string;
  orthesisComment: string;
  patientId?: number;
  orderDate?: string;
  orderState?: string;
  patient?: Patient;
}

export interface Measurement {
  label: string;
  value: string;
}
