import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/legal';
import { getPaginaPublicadaSite } from '@/services/site.service';
import { getContentString } from '@/utils/site-content';

export const metadata: Metadata = {
  title: 'Termos de Uso | Pizzattolog',
  description: 'Termos e condições de uso do site e canais digitais da Pizzattolog.',
};

const secoes = [
  {
    titulo: 'Apresentação e aceitação',
    paragrafos: [
      'Estes Termos de Uso regulam o acesso e a utilização do site e dos canais digitais da Pizzattolog por usuários, clientes, candidatos, agregados, parceiros e demais visitantes.',
      'Ao navegar, preencher formulários, solicitar informações ou utilizar funcionalidades disponíveis, o usuário declara ter lido e aceitado estes termos, comprometendo-se a utilizá-los de forma ética, responsável e em conformidade com a legislação aplicável.',
    ],
  },
  {
    titulo: 'Uso da plataforma',
    paragrafos: [
      'O site disponibiliza informações institucionais, conteúdos sobre logística, soluções, canais de contato, solicitações comerciais, formulários, oportunidades de trabalho e demais funcionalidades relacionadas às atividades da Pizzattolog.',
      'O usuário é responsável pela veracidade, atualização e legalidade das informações fornecidas, bem como pelo uso adequado dos canais de atendimento e comunicação.',
    ],
  },
  {
    titulo: 'Condutas vedadas',
    paragrafos: [
      'É proibido utilizar o site para fins ilícitos, fraudulentos, ofensivos, discriminatórios, abusivos, para violar direitos de terceiros ou para comprometer a segurança, disponibilidade e integridade dos sistemas.',
      'Também é vedada a tentativa de acesso não autorizado, engenharia reversa, envio de vírus, sobrecarga da infraestrutura, reprodução indevida de conteúdos e qualquer prática que viole propriedade intelectual ou normas aplicáveis.',
    ],
  },
  {
    titulo: 'Propriedade intelectual',
    paragrafos: [
      'Marcas, logotipos, textos, imagens, layouts, conteúdos, materiais e demais elementos disponíveis no site pertencem à Pizzattolog ou a terceiros licenciantes, sendo protegidos pela legislação de propriedade intelectual.',
      'O acesso ao site não concede licença para reprodução, distribuição, alteração, exploração comercial ou uso de marcas e conteúdos sem autorização prévia e expressa.',
    ],
  },
  {
    titulo: 'Responsabilidades e alterações',
    paragrafos: [
      'A Pizzattolog busca manter informações atualizadas e canais digitais disponíveis, mas pode realizar alterações, suspensões, correções e melhorias a qualquer momento.',
      'Estes Termos podem ser atualizados periodicamente para refletir mudanças legais, operacionais ou tecnológicas. A continuidade de uso após a atualização implica ciência e aceitação da nova versão.',
    ],
  },
];

export default async function TermosDeUsoPage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('termos-de-uso');
  const conteudo =
    pagina?.conteudo ?? null;

  return (
    <LegalPage
      tipo="termos"
      titulo={getContentString(conteudo, 'titulo', 'Termos de Uso')}
      resumo={getContentString(conteudo, 'resumo', 'Regras para acesso e utilização do site, formulários, conteúdos e canais digitais da Pizzattolog.')}
      secoes={secoes.map((secao, index) => ({
        titulo: getContentString(conteudo, `secoes.${index}.titulo`, secao.titulo),
        paragrafos: secao.paragrafos.map((paragrafo, paragraphIndex) =>
          getContentString(conteudo, `secoes.${index}.paragrafos.${paragraphIndex}`, paragrafo),
        ),
      }))}
    />
  );
}
