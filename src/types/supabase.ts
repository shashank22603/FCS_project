export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          phone_number: string | null
          avatar_url: string | null
          bio: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          phone_number?: string | null
          avatar_url?: string | null
          bio?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          phone_number?: string | null
          avatar_url?: string | null
          bio?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          type: 'direct' | 'group'
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: 'direct' | 'group'
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: 'direct' | 'group'
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          user_id: string
          role: 'member' | 'admin'
          joined_at: string
        }
        Insert: {
          conversation_id: string
          user_id: string
          role?: 'member' | 'admin'
          joined_at?: string
        }
        Update: {
          conversation_id?: string
          user_id?: string
          role?: 'member' | 'admin'
          joined_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string | null
          content: string | null
          encrypted_content: string | null
          media_ids: string[] | null
          is_ephemeral: boolean
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id?: string | null
          content?: string | null
          encrypted_content?: string | null
          media_ids?: string[] | null
          is_ephemeral?: boolean
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string | null
          content?: string | null
          encrypted_content?: string | null
          media_ids?: string[] | null
          is_ephemeral?: boolean
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          owner_id: string
          type: 'image' | 'video' | 'document' | 'audio'
          url: string
          thumbnail_url: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          type: 'image' | 'video' | 'document' | 'audio'
          url: string
          thumbnail_url?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          type?: 'image' | 'video' | 'document' | 'audio'
          url?: string
          thumbnail_url?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      marketplace_listings: {
        Row: {
          id: string
          seller_id: string
          title: string
          description: string | null
          price: number
          currency: string
          media_ids: string[] | null
          status: 'active' | 'sold' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          title: string
          description?: string | null
          price: number
          currency?: string
          media_ids?: string[] | null
          status?: 'active' | 'sold' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          title?: string
          description?: string | null
          price?: number
          currency?: string
          media_ids?: string[] | null
          status?: 'active' | 'sold' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      follows: {
        Row: {
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string | null
          reported_user_id: string
          reason: string
          status: 'pending' | 'reviewed' | 'resolved'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reporter_id?: string | null
          reported_user_id: string
          reason: string
          status?: 'pending' | 'reviewed' | 'resolved'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string | null
          reported_user_id?: string
          reason?: string
          status?: 'pending' | 'reviewed' | 'resolved'
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          entity_type: string
          entity_id?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          entity_type?: string
          entity_id?: string | null
          metadata?: Json
          created_at?: string
        }
      }
    }
    Functions: {
      log_audit_event: {
        Args: {
          p_action: string
          p_entity_type: string
          p_entity_id: string
          p_metadata?: Json
        }
        Returns: void
      }
    }
  }
}