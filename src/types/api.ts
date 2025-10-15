/**
 * API request and response types
 */

import { JobStatus, ApplicationStatus } from './database';

/**
 * Generic API response
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

/**
 * Sort params
 */
export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * Job filter params for API
 */
export interface JobFilterParams {
  status?: JobStatus | JobStatus[];
  category?: string;
  minRate?: number;
  maxRate?: number;
  location?: string;
  urgent?: boolean;
  search?: string;
}

/**
 * Application filter params
 */
export interface ApplicationFilterParams {
  status?: ApplicationStatus | ApplicationStatus[];
  jobId?: string;
  workerId?: string;
}

/**
 * Report generation params
 */
export interface ReportParams {
  startDate?: string;
  endDate?: string;
  type: 'users' | 'jobs' | 'applications' | 'revenue';
  format?: 'json' | 'csv';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
