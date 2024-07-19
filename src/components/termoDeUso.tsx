'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';

const TermoDeUso = () => {
const router = useRouter();
  return (
    <>
        <div className="max-w-[1200px]">
        <ul>
            <li><strong>Aceitação dos Termos: </strong> Bem-vindo ao nosso site de turismo. Ao acessar ou usar este site, você concorda em cumprir e ficar vinculado aos seguintes termos e condições.</li>
        </ul>
        <br />
        <ol className='list-decimal mb-12'>
            <li><strong>Propriedade Intelectual: </strong> Todo o conteúdo presente neste site, incluindo textos, imagens, gráficos, logotipos, vídeos e outros materiais, são protegidos por direitos autorais e outras leis de propriedade intelectual. Você concorda em não reproduzir, distribuir, modificar ou criar obras derivadas a partir desse conteúdo sem autorização prévia por escrito;</li>
            <li><strong>Conteúdo do Usuário: </strong> Se você enviar conteúdo, como avaliações, comentários ou fotos, para o site, concede-nos o direito de usar, modificar, exibir e distribuir esse conteúdo em qualquer meio. No entanto, você é responsável pelo conteúdo que envia e concorda em não enviar material difamatório, obsceno, ilegal ou prejudicial;</li>
            <li> <strong> Descrição do Serviço: </strong> O nosso site fornece informações detalhadas e roteiros de viagem para diversos destinos turísticos. É importante ressaltar que não realizamos nenhum tipo de transação financeira, como pagamentos ou reservas de serviços;</li>
            <li> <strong> Links para Terceiros:</strong> Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo, precisão ou segurança desses sites. A inclusão de links não implica em nosso endosso ou apoio a qualquer conteúdo presente nesses sites;</li>
            <li> <strong> Limitação de Responsabilidade:</strong> O uso deste site é por sua própria conta e risco. Não nos responsabilizamos por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso deste site ou de informações nele contidas;</li>
            <li> <strong> Alterações nos Termos de Uso:</strong> Reservamo-nos o direito de modificar estes termos a qualquer momento, sem aviso prévio. As alterações entrarão em vigor assim que forem publicadas no site. Recomendamos que você verifique os termos regularmente para estar ciente de quaisquer atualizações;</li>
            <li> <strong> Uso do Site:</strong> Ao acessar e utilizar nosso site, os usuários concordam em cumprir estes termos de uso e todas as leis e regulamentos aplicáveis. O acesso ao site é permitido apenas para aqueles que tenham idade legal para fazê-lo;</li>
            <li> <strong> Responsabilidades do Usuário:</strong> Os usuários são responsáveis por garantir a precisão das informações fornecidas ao utilizar o site. Eles concordam em não enviar conteúdo ilegal, difamatório, obsceno ou prejudicial, nem realizar atividades que possam danificar, sobrecarregar ou comprometer a segurança do site;</li>
            <li> <strong> Lei Aplicável e Jurisdição:</strong> Estes termos de uso são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais competentes da cidade de São Paulo, Estado de São Paulo;</li>
            <li> <strong> Política de Privacidade:</strong> É fundamental que os usuários revisem nossa política de privacidade para compreender como as informações pessoais são coletadas, utilizadas e protegidas pelo site. Esta política detalha os procedimentos adotados para garantir a segurança e a privacidade dos dados dos usuários. Ao utilizar o site, os usuários concordam com os termos estabelecidos em nossa política de privacidade;</li>
            <li><strong> Contato: </strong> Se os usuários tiverem dúvidas ou preocupações sobre estes termos de uso, estamos à disposição para ajudar. Por favor, entrem em contato conosco através do seguinte endereço de e-mail: brazurista@gmail.com. Estamos comprometidos em fornecer suporte e esclarecimentos sempre que necessário.</li>
        </ol>
        <div className='flex justify-start items-center gap-4'>
        <Input type="checkbox" className='w-6' id="checkbox1" name="checkbox1" value="checkbox_value" />
        <label>Eu li e concordo</label>
        </div>
    </div>
    <Button className="mb-12" onClick={() => router.push('/')} type="button">Voltar a Tela Inicial</Button>
    </>
  )
}

export default TermoDeUso