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
      pengeluaran: {
        Row: {
          id: string
          nama: string
          jumlah: number
          kategori: string | null
          tanggal: string
          keterangan: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          jumlah: number
          kategori?: string | null
          tanggal?: string
          keterangan?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          jumlah?: number
          kategori?: string | null
          tanggal?: string
          keterangan?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pemasukan: {
        Row: {
          id: string
          nama: string
          jumlah: number
          kategori: string | null
          tanggal: string
          keterangan: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          jumlah: number
          kategori?: string | null
          tanggal?: string
          keterangan?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          jumlah?: number
          kategori?: string | null
          tanggal?: string
          keterangan?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tugas: {
        Row: {
          id: string
          nama: string
          deskripsi: string | null
          level: 'mendesak' | 'penting' | 'normal'
          deadline: string
          selesai: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          deskripsi?: string | null
          level: 'mendesak' | 'penting' | 'normal'
          deadline: string
          selesai?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          deskripsi?: string | null
          level?: 'mendesak' | 'penting' | 'normal'
          deadline?: string
          selesai?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      hutang: {
        Row: {
          id: string
          nama: string
          jumlah: number
          jatuh_tempo: string
          lunas: boolean
          keterangan: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          jumlah: number
          jatuh_tempo: string
          lunas?: boolean
          keterangan?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          jumlah?: number
          jatuh_tempo?: string
          lunas?: boolean
          keterangan?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      budget_bulanan: {
        Row: {
          id: string
          bulan: number
          tahun: number
          total_budget: number
          target_tabungan: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          bulan: number
          tahun: number
          total_budget: number
          target_tabungan?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bulan?: number
          tahun?: number
          total_budget?: number
          target_tabungan?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
