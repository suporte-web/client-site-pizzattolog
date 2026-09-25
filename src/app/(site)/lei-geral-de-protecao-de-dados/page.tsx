import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/legal';
import { getPaginaPublicadaSite } from '@/services/site.service';
import { getContentString } from '@/utils/site-content';

export const metadata: Metadata = {
  title: 'Lei Geral de Proteção de Dados | Pizzattolog',
  description: 'Informações sobre tratamento de dados pessoais e direitos dos titulares na Pizzattolog.',
};

const secoes = [
  {
    titulo: 'Compromisso com a proteção de dados',
    paragrafos: [
      'A Pizzattolog trata dados pessoais com responsabilidade, transparência e segurança, observando a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) e demais normas aplicáveis.',
      'Esta página reúne informações sobre como os dados podem ser coletados, utilizados, armazenados e protegidos durante a navegação no site e nos canais digitais da empresa.',
    ],
  },
  {
    titulo: 'Dados que podem ser tratados',
    paragrafos: [
      'Podemos tratar dados fornecidos voluntariamente em formulários, solicitações de cotação, contatos comerciais, cadastro de agregados, candidaturas de trabalho, newsletter, canais de atendimento e áreas restritas.',
      'Esses dados podem incluir nome, e-mail, telefone, empresa, cargo, cidade, informações profissionais, dados necessários à análise de solicitações e demais informações pertinentes à finalidade informada no momento da coleta.',
    ],
  },
  {
    titulo: 'Finalidades do tratamento',
    paragrafos: [
      'Os dados são utilizados para atendimento de solicitações, envio de comunicações, análise de oportunidades comerciais, gestão de candidaturas, cadastro de parceiros, execução de contratos, cumprimento de obrigações legais e melhoria da experiência nos canais digitais.',
      'O tratamento é realizado com base em hipóteses legais aplicáveis, como consentimento, execução de contrato, procedimentos preliminares, cumprimento de obrigação legal ou regulatória, legítimo interesse e exercício regular de direitos.',
    ],
  },
  {
    titulo: 'Direitos do titular',
    paragrafos: [
      'Nos termos da LGPD, o titular pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento, revisão de decisões automatizadas, revogação do consentimento e demais direitos previstos em lei.',
      'As solicitações relacionadas a dados pessoais podem ser encaminhadas pelos canais oficiais de contato da Pizzattolog. A empresa poderá solicitar informações adicionais para confirmar a identidade do titular e proteger seus dados.',
    ],
  },
  {
    titulo: 'Segurança e retenção',
    paragrafos: [
      'A Pizzattolog adota medidas técnicas e administrativas para proteger dados pessoais contra acessos não autorizados, perda, alteração, divulgação indevida ou qualquer forma de tratamento inadequado.',
      'Os dados são mantidos pelo tempo necessário ao cumprimento das finalidades informadas, obrigações legais, regulatórias, contratuais e defesa de direitos, sendo eliminados ou anonimizados quando aplicável.',
    ],
  },
];

export default async function LeiGeralDeProtecaoDeDadosPage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('lei-geral-de-protecao-de-dados');
  const conteudo =
    pagina?.conteudo ?? null;

  return (
    <LegalPage
      tipo="lgpd"
      titulo={getContentString(conteudo, 'titulo', 'Lei Geral de Proteção de Dados')}
      resumo={getContentString(conteudo, 'resumo', 'Entenda como a Pizzattolog trata dados pessoais e quais direitos podem ser exercidos pelos titulares.')}
      secoes={secoes.map((secao, index) => ({
        titulo: getContentString(conteudo, `secoes.${index}.titulo`, secao.titulo),
        paragrafos: secao.paragrafos.map((paragrafo, paragraphIndex) =>
          getContentString(conteudo, `secoes.${index}.paragrafos.${paragraphIndex}`, paragrafo),
        ),
      }))}
    />
  );
}
