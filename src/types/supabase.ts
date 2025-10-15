/**
 * Supabase-specific types and helpers
 */

import { PostgrestError } from '@supabase/supabase-js';

/**
 * Generic Supabase response type
 */
export interface SupabaseResponse<T> {
  data: T | null;
  error: PostgrestError | null;
}

/**
 * Supabase query builder types
 */
export type SupabaseQuery<T> = {
  data: T[] | null;
  error: PostgrestError | null;
  count: number | null;
  status: number;
  statusText: string;
};

/**
 * Real-time payload types
 */
export interface RealtimePayload<T = Record<string, unknown>> {
  commit_timestamp: string;
  errors: string[] | null;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: T;
  old: Partial<T>;
  schema: string;
  table: string;
}

/**
 * Auth user type
 */
export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    user_type?: 'worker' | 'client' | 'admin';
    [key: string]: unknown;
  };
  created_at?: string;
}

/**
 * Helper type for database row with relations
 */
export type WithRelations<T, R extends Record<string, unknown>> = T & R;
