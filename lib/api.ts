import { supabase } from './supabase';
import { Database } from './database.types';

type Pengeluaran = Database['public']['Tables']['pengeluaran']['Row'];
type Pemasukan = Database['public']['Tables']['pemasukan']['Row'];
type Tugas = Database['public']['Tables']['tugas']['Row'];
type Hutang = Database['public']['Tables']['hutang']['Row'];
type BudgetBulanan = Database['public']['Tables']['budget_bulanan']['Row'];

// =============================================
// HELPER FUNCTIONS
// =============================================

/**
 * Calculate task level dynamically based on deadline
 */
export function calculateTaskLevel(deadline: string): 'mendesak' | 'penting' | 'normal' {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) return 'mendesak';
  if (diffDays <= 3) return 'penting';
  return 'normal';
}

/**
 * Add dynamic level to task object
 */
export function addDynamicLevel(tugas: Tugas) {
  return {
    ...tugas,
    level: calculateTaskLevel(tugas.deadline),
  };
}

// =============================================
// PENGELUARAN (Expenses)
// =============================================

/**
 * Get all expenses, optionally filtered by month/year
 */
export async function getPengeluaran(bulan?: number, tahun?: number) {
  let query = supabase
    .from('pengeluaran')
    .select('*')
    .order('tanggal', { ascending: false });

  if (bulan && tahun) {
    const startDate = `${tahun}-${String(bulan).padStart(2, '0')}-01`;
    const endDate = new Date(tahun, bulan, 0).toISOString().split('T')[0];
    query = query.gte('tanggal', startDate).lte('tanggal', endDate);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching pengeluaran:', error);
    return [];
  }
  
  return data as Pengeluaran[];
}

/**
 * Get total expenses for a specific month
 */
export async function getTotalPengeluaran(bulan: number, tahun: number) {
  const pengeluaran = await getPengeluaran(bulan, tahun);
  return pengeluaran.reduce((total, item) => total + Number(item.jumlah), 0);
}

/**
 * Get recent expenses (limit 3 by default)
 */
export async function getPengeluaranTerbaru(limit: number = 3) {
  const { data, error } = await supabase
    .from('pengeluaran')
    .select('*')
    .order('tanggal', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent pengeluaran:', error);
    return [];
  }

  return data as Pengeluaran[];
}

/**
 * Add new expense
 */
export async function addPengeluaran(pengeluaran: Database['public']['Tables']['pengeluaran']['Insert']) {
  const { data, error } = await supabase
    .from('pengeluaran')
    .insert(pengeluaran as any)
    .select()
    .single();

  if (error) {
    console.error('Error adding pengeluaran:', error);
    throw error;
  }

  return data as Pengeluaran;
}

// =============================================
// PEMASUKAN (Income)
// =============================================

/**
 * Get all income, optionally filtered by month/year
 */
export async function getPemasukan(bulan?: number, tahun?: number) {
  let query = supabase
    .from('pemasukan')
    .select('*')
    .order('tanggal', { ascending: false });

  if (bulan && tahun) {
    const startDate = `${tahun}-${String(bulan).padStart(2, '0')}-01`;
    const endDate = new Date(tahun, bulan, 0).toISOString().split('T')[0];
    query = query.gte('tanggal', startDate).lte('tanggal', endDate);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching pemasukan:', error);
    return [];
  }
  
  return data as Pemasukan[];
}

/**
 * Get total income for a specific month
 */
export async function getTotalPemasukan(bulan: number, tahun: number) {
  const pemasukan = await getPemasukan(bulan, tahun);
  return pemasukan.reduce((total, item) => total + Number(item.jumlah), 0);
}

/**
 * Add new income
 */
export async function addPemasukan(pemasukan: Database['public']['Tables']['pemasukan']['Insert']) {
  const { data, error } = await supabase
    .from('pemasukan')
    .insert(pemasukan as any)
    .select()
    .single();

  if (error) {
    console.error('Error adding pemasukan:', error);
    throw error;
  }

  return data as Pemasukan;
}

/**
 * Delete income
 */
export async function deletePemasukan(id: string) {
  const { error } = await supabase
    .from('pemasukan')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting pemasukan:', error);
    throw error;
  }
}

// =============================================
// TUGAS (Tasks)
// =============================================

/**
 * Get all tasks
 */
export async function getTugas(selesaiOnly?: boolean) {
  let query = supabase
    .from('tugas')
    .select('*')
    .order('deadline', { ascending: true });

  if (selesaiOnly !== undefined) {
    query = query.eq('selesai', selesaiOnly);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching tugas:', error);
    return [];
  }

  // Add dynamic level to each task
  return (data as Tugas[]).map(addDynamicLevel);
}

/**
 * Get incomplete tasks
 */
export async function getTugasBelumSelesai(limit?: number) {
  let query = supabase
    .from('tugas')
    .select('*')
    .eq('selesai', false)
    .order('deadline', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching incomplete tugas:', error);
    return [];
  }

  // Add dynamic level to each task
  return (data as Tugas[]).map(addDynamicLevel);
}

/**
 * Count incomplete tasks
 */
export async function countTugasBelumSelesai() {
  const { count, error } = await supabase
    .from('tugas')
    .select('*', { count: 'exact', head: true })
    .eq('selesai', false);

  if (error) {
    console.error('Error counting tugas:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Add new task
 */
export async function addTugas(tugas: Database['public']['Tables']['tugas']['Insert']) {
  const { data, error } = await supabase
    .from('tugas')
    .insert(tugas as any)
    .select()
    .single();

  if (error) {
    console.error('Error adding tugas:', error);
    throw error;
  }

  return data as Tugas;
}

/**
 * Update task (e.g., mark as complete)
 */
export async function updateTugas(id: string, updates: Database['public']['Tables']['tugas']['Update']) {
  const { data, error } = await supabase
    .from('tugas')
    .update(updates as any)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating tugas:', error);
    throw error;
  }

  return data as Tugas;
}

// =============================================
// HUTANG (Debts)
// =============================================

/**
 * Get all debts
 */
export async function getHutang(lunasOnly?: boolean) {
  let query = supabase
    .from('hutang')
    .select('*')
    .order('jatuh_tempo', { ascending: true });

  if (lunasOnly !== undefined) {
    query = query.eq('lunas', lunasOnly);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching hutang:', error);
    return [];
  }

  return data as Hutang[];
}

/**
 * Get unpaid debts
 */
export async function getHutangBelumLunas(limit?: number) {
  let query = supabase
    .from('hutang')
    .select('*')
    .eq('lunas', false)
    .order('jatuh_tempo', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching unpaid hutang:', error);
    return [];
  }

  return data as Hutang[];
}

/**
 * Count debts due this week
 */
export async function countHutangJatuhTempoMingguIni() {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const { count, error } = await supabase
    .from('hutang')
    .select('*', { count: 'exact', head: true })
    .eq('lunas', false)
    .gte('jatuh_tempo', today.toISOString().split('T')[0])
    .lte('jatuh_tempo', nextWeek.toISOString().split('T')[0]);

  if (error) {
    console.error('Error counting hutang jatuh tempo:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Get total unpaid debt amount
 */
export async function getTotalNilaiHutang() {
  const hutang = await getHutangBelumLunas();
  return hutang.reduce((total, item) => total + Number(item.jumlah), 0);
}

/**
 * Add new debt
 */
export async function addHutang(hutang: Database['public']['Tables']['hutang']['Insert']) {
  const { data, error } = await supabase
    .from('hutang')
    .insert(hutang as any)
    .select()
    .single();

  if (error) {
    console.error('Error adding hutang:', error);
    throw error;
  }

  return data as Hutang;
}

/**
 * Update debt (e.g., mark as paid)
 */
export async function updateHutang(id: string, updates: Database['public']['Tables']['hutang']['Update']) {
  const { data, error } = await supabase
    .from('hutang')
    .update(updates as any)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating hutang:', error);
    throw error;
  }

  return data as Hutang;
}

// =============================================
// BUDGET BULANAN (Monthly Budget)
// =============================================

/**
 * Get budget for a specific month
 */
export async function getBudgetBulanan(bulan: number, tahun: number) {
  const { data, error } = await supabase
    .from('budget_bulanan')
    .select('*')
    .eq('bulan', bulan)
    .eq('tahun', tahun)
    .single();

  if (error) {
    console.error('Error fetching budget bulanan:', error);
    return null;
  }

  return data as BudgetBulanan;
}

/**
 * Get current month budget
 */
export async function getCurrentMonthBudget() {
  const now = new Date();
  const bulan = now.getMonth() + 1;
  const tahun = now.getFullYear();
  
  return await getBudgetBulanan(bulan, tahun);
}

/**
 * Set or update monthly budget
 */
export async function setBudgetBulanan(budget: Database['public']['Tables']['budget_bulanan']['Insert']) {
  const { data, error } = await supabase
    .from('budget_bulanan')
    .upsert(budget as any, { onConflict: 'bulan,tahun' })
    .select()
    .single();

  if (error) {
    console.error('Error setting budget bulanan:', error);
    throw error;
  }

  return data as BudgetBulanan;
}

// =============================================
// DASHBOARD DATA (Combined)
// =============================================

/**
 * Get all dashboard data for current month
 */
export async function getDashboardData() {
  const now = new Date();
  const bulan = now.getMonth() + 1;
  const tahun = now.getFullYear();

  const [
    budget,
    totalPengeluaran,
    totalPemasukan,
    pengeluaranTerbaru,
    tugasBelumSelesai,
    tugasList,
    totalTugas,
    hutangBelumLunas,
    totalNilaiHutang,
    hutangJatuhTempoMingguIni
  ] = await Promise.all([
    getCurrentMonthBudget(),
    getTotalPengeluaran(bulan, tahun),
    getTotalPemasukan(bulan, tahun),
    getPengeluaranTerbaru(3),
    countTugasBelumSelesai(),
    getTugasBelumSelesai(3),
    supabase.from('tugas').select('*', { count: 'exact', head: true }).then(({ count }) => count || 0),
    getHutangBelumLunas(3),
    getTotalNilaiHutang(),
    countHutangJatuhTempoMingguIni()
  ]);

  return {
    budget: budget || { total_budget: 5000000, target_tabungan: 3000000 },
    totalPengeluaran,
    totalPemasukan,
    pengeluaranTerbaru,
    tugasBelumSelesai,
    tugasList,
    totalTugas,
    hutangBelumLunas,
    totalNilaiHutang,
    hutangJatuhTempoMingguIni
  };
}
