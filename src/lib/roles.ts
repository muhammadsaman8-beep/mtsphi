// Definisi peran & aturan hak akses.

export type Role = 'admin' | 'guru' | 'staf'

export const ROLES: Role[] = ['admin', 'guru', 'staf']

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrator',
  guru: 'Guru',
  staf: 'Staf',
}

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  admin: 'Akses penuh: kelola semua artikel & akun pengguna.',
  guru: 'Menulis, mengubah, dan menghapus artikel miliknya sendiri.',
  staf: 'Menulis dan mengubah artikel miliknya sendiri (tanpa hapus).',
}

export function canManageUsers(role: Role): boolean {
  return role === 'admin'
}

/** Boleh mengubah artikel: admin (semua) atau pemilik artikel. */
export function canEditPost(role: Role, isOwner: boolean): boolean {
  return role === 'admin' || isOwner
}

/** Boleh menghapus: admin (semua) atau guru untuk artikel miliknya. Staf tidak. */
export function canDeletePost(role: Role, isOwner: boolean): boolean {
  return role === 'admin' || (role === 'guru' && isOwner)
}
