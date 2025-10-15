export type JobStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  workerId?: string;
  status: JobStatus;
  rate: number;
  duration: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  skillsRequired: string[];
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  endDate?: string;
  images?: string[];
}

export interface JobCreateInput {
  title: string;
  description: string;
  rate: number;
  duration: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  skillsRequired: string[];
  images?: File[];
}

export interface JobUpdateInput extends Partial<Job> {
  id: string;
}
