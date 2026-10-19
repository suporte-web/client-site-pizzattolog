/** Exibe um aviso nativo após uma ação do usuário, sem depender da renderização. */
export function avisarRegistro(mensagem: string) {
  window.alert(`Aviso de registro\n\n${mensagem}`);
}
