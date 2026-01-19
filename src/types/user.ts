export interface User {
  id: number;
  email: string;
  name: string;
  display_name?: string;
  avatar?: string;
  job_title?: string;
  department?: string;
  [key: string]: unknown; // Allow additional fields
}

export interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
