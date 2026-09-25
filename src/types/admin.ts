export type PerfilUsuarioAdmin = 'ADMIN' | 'MARKETING';

export interface UsuarioAdmin {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuarioAdmin;
  ativo: boolean;
  ultimoLoginEm?: string | null;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface SessaoAdmin {
  token: string;
  usuario: UsuarioAdmin;
  expiraEmSegundos: number;
}

export interface ConteudoEditavel {
  id: string;
  chave: string;
  pagina: string;
  rotulo: string;
  titulo?: string | null;
  texto?: string | null;
  imagemUrl?: string | null;
  ativo: boolean;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface LogAuditoria {
  id: string;
  usuarioId?: string | null;
  usuarioEmail?: string | null;
  perfil?: PerfilUsuarioAdmin | null;
  acao: string;
  entidade: string;
  entidadeId?: string | null;
  descricao?: string | null;
  dadosAntes?: unknown;
  dadosDepois?: unknown;
  ip?: string | null;
  userAgent?: string | null;
  criadoEm: string;
  usuario?: Pick<UsuarioAdmin, 'id' | 'nome' | 'email' | 'perfil'> | null;
}

export interface RespostaPaginadaAuditoria {
  pagina: number;
  limite: number;
  total: number;
  logs: LogAuditoria[];
}
