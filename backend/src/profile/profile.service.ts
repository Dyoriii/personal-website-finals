import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProfileService {
  constructor(private supabaseService: SupabaseService) {}

  async getProfile() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('profiles')
      .select('*')
      .limit(1);

    if (error) throw new Error(error.message);
    return data && data.length > 0 ? data[0] : null;
  }
}