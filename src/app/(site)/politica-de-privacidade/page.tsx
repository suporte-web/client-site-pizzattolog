import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/legal';
import { getPaginaPublicadaSite } from '@/services/site.service';
import { getContentString } from '@/utils/site-content';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Pizzattolog',
  description: 'Política de privacidade do site e canais digitais da Pizzattolog.',
};

const secoes = [
  {
    titulo: 'Objetivo da política',
    paragrafos: [
      'Esta Política de Privacidade explica como a Pizzattolog coleta, utiliza, compartilha, armazena e protege informações pessoais em seus canais digitais, formulários, processos de atendimento e relacionamento.',
      'A política se aplica a visitantes do site, clientes, candidatos, agregados, fornecedores, parceiros e demais pessoas que interajam com a empresa por meios digitais.',
    ],
  },
  {
    titulo: 'Coleta de informações',
    paragrafos: [
      'As informações podem ser coletadas quando o usuário preenche formulários, solicita cotações, entra em contato, participa de processos seletivos, cadastra-se para comunicações, acessa conteúdos ou utiliza funcionalidades do site.',
      'Também podem ser coletadas informações técnicas de navegação, como endereço IP, identificadores de dispositivo, páginas acessadas, data e horário de acesso, origem de tráfego e cookies necessários ao funcionamento e melhoria da experiência.',
    ],
  },
  {
    titulo: 'Uso das informações',
    paragrafos: [
      'Os dados podem ser utilizados para responder solicitações, prestar atendimento, enviar comunicações autorizadas, avaliar oportunidades comerciais, analisar candidaturas, gerir cadastros, cumprir obrigações legais e aprimorar segurança e desempenho do site.',
      'A Pizzattolog trata as informações de acordo com finalidades legítimas e bases legais adequadas, respeitando princípios de necessidade, transparência, segurança, prevenção e responsabilização.',
    ],
  },
  {
    titulo: 'Compartilhamento',
    paragrafos: [
      'Informações pessoais podem ser compartilhadas com prestadores de serviços, parceiros operacionais, fornecedores de tecnologia, autoridades públicas ou terceiros quando necessário para executar finalidades informadas, cumprir obrigações legais ou proteger direitos.',
      'Quando houver compartilhamento, são adotadas medidas para limitar o acesso ao necessário e preservar a confidencialidade e segurança dos dados.',
    ],
  },
  {
    titulo: 'Cookies e preferências',
    paragrafos: [
      'O site pode utilizar cookies e tecnologias similares para funcionamento, segurança, análise de navegação e melhoria de experiência. O usuário pode configurar seu navegador para bloquear ou excluir cookies, observando que algumas funcionalidades podem ser afetadas.',
      'Cookies essenciais são necessários para disponibilizar recursos básicos do site, enquanto cookies analíticos e de desempenho ajudam a compreender o uso das páginas e aprimorar conteúdos.',
    ],
  },
  {
    titulo: 'Direitos e contato',
    paragrafos: [
      'O titular pode solicitar informações sobre tratamento, acesso, correção, exclusão, revogação de consentimento e demais direitos previstos na LGPD pelos canais oficiais de atendimento da Pizzattolog.',
      'A empresa poderá atualizar esta política periodicamente. Recomenda-se consultar esta página para acompanhar a versão mais recente.',
    ],
  },
];

export default async function PoliticaDePrivacidadePage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('politica-de-privacidade');
  const conteudo =
    pagina?.conteudo ?? null;

  return (
    <LegalPage
      tipo="privacidade"
      titulo={getContentString(conteudo, 'titulo', 'Política de Privacidade')}
      resumo={getContentString(conteudo, 'resumo', 'Saiba como a Pizzattolog coleta, utiliza e protege informações pessoais nos seus canais digitais.')}
      secoes={secoes.map((secao, index) => ({
        titulo: getContentString(conteudo, `secoes.${index}.titulo`, secao.titulo),
        paragrafos: secao.paragrafos.map((paragrafo, paragraphIndex) =>
          getContentString(conteudo, `secoes.${index}.paragrafos.${paragraphIndex}`, paragrafo),
        ),
      }))}
    />
  );
}
