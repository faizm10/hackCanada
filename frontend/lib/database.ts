export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    tables: {
      // Add your Supabase tables here
    }
    views: {
      // Add your views here
    }
    functions: {
      // Add your functions here
    }
  }
}