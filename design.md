# VF Vertex Digital — direção visual
## Restaurar estética aprovada dos CTAs
Não simplificar: restaurar trilho violeta vibrante, gradiente pérola/violeta na seta e halo original. Manter wrapper separado e correções de clique/deslize. Texto desaparece antes de ser atravessado pelo círculo; nenhuma mudança de layout das seções.
## Refinamento dos botões deslizantes
Separar âncora de entrada (wrapper estável) do link interativo: re-render do arraste não remove is-visible. Trilho escuro, borda violeta discreta, círculo perfeitamente redondo e texto com recorte progressivo conforme o círculo avança, sem sobreposição ou camadas de brilho. Preservar clique, teclado e deslize.
## CTAs com clique ou deslize
Todos os CTAs com seta aceitam clique normal/Enter e arraste do círculo para a direita. Completar 80% do trilho e soltar abre o mesmo link em nova aba uma única vez; arraste incompleto/cancelado retorna sem navegação. Pointer capture no círculo, touch-action pan-y no trilho para preservar rolagem. Texto “Clique ou deslize” indica a interação. Sem mudanças de layout nas seções.
## Estabilidade das animações
Corrigir especificidade do flip alternado: todo card visível termina em transform:none, scale:1, mesma largura e altura. Sem rotateZ residual. Remover flutuação das capturas enquanto interativas; sliders recebem arraste com pointer capture. CTAs mantêm entrada lateral e círculo desliza no hover/foco, sem impedir cliques.
## Correção de ritmo e composição
Cards completos entram com flip 3D, texto interno estático. Portfólio entra como conjunto com o mesmo flip; observar âncora sem transformação para evitar disparos instáveis. Títulos mantêm cascata de letras; subtítulos revelam palavras com fade/desfoque leve, 180ms depois, acionados pelo mesmo grupo. Repetir em ambos os sentidos. CTAs deslizam lateralmente: um logo abaixo do portfólio, outro abaixo de Quem Somos. WhatsApp flutuante pulsa com anéis suaves; reduced-motion elimina movimentos.
## Tipografia cinética — referência FG Sites
Títulos e subtítulos entram letra por letra: translateY(100%) para zero, opacity de zero a um, duração 1s, cubic-bezier(.22,1,.36,1), passo 50ms e base -300ms conforme a referência inspecionada. Textos longos usam passo 20ms para manter leitura ágil. Repetir em ambas as direções ao reentrar no viewport; hero e legenda também respeitam visibilidade real na jornada sticky. Preservar palavras inteiras, quebras responsivas, gradientes, conteúdo acessível e prefers-reduced-motion. Apenas frontend; sem API ou banco novo.
Página única web responsiva, imersiva e luxuosa. Vídeo fornecido pelo usuário, convertido em sequência WebP sincronizada ao scroll, com avanço e recuo reais.
Paleta: preto #060608, pérola #f4f0ea, violeta #c4a0f4, champagne #d4c3a0. Preservar vermelho da logo original.
Tipografia: Poppins leve em grandes títulos, Georgia italic como contraste editorial. Espaços generosos, linhas finas, cards transparentes assimétricos.
Header com logo, navegação interna e CTA WhatsApp. Abertura: Sites de outro universo. Palco sticky de 460svh; cards de WhatsApp e Instagram surgem após travessia. Mobile: 380svh e cards empilhados. Links: https://wa.me/5583998352470 e https://instagram.com/vfsites.
Acessibilidade: contraste, focus visible, menu com aria-expanded, prefers-reduced-motion, links sempre acessíveis. Sem login ou banco de dados.
Arquivos: pages/index.tsx apenas composição; pages/vertex.tsx, components/cosmic-scene.tsx, styles.css, index.html para SEO. Assets exclusivamente public/.

Logo em PNG com fundo transparente; badge Made with Runable removido a pedido do usuário.

## Bio após a travessia
Layout da referência fgsites.com.br/bio aprovado: coluna central estreita inclusive desktop, fundo #101010 com linhas de grade tênues, cards escuros com bordas arredondadas e ícones violeta tridimensionais sobrepostos à esquerda, CTA com gradiente pérola/violeta. Logo VF transparente, WhatsApp/Sobre Nós/Instagram (substituição de depoimentos aprovada). Portfólio com apenas dois screenshots reais capturados: ALA Turismo e Bora com Luisinho; cada imagem abre o site correspondente. Não inventar avaliações, horários ou CNPJ. Rodapé com dados VF confirmados. Bio entra no final do vídeo e continua com scroll normal; volta à animação ao subir.

Movimento refinado: bio revela com scroll progressivo e reversível, cards flutuam/pulsam em fases alternadas, rótulos têm gradiente brilhante em movimento, fundo com linhas brancas finas e rastros luminosos. Respeitar reduced motion.

Cards com entrada lateral alternada e rotação 3D sincronizada ao scroll; progress calculado pela posição de layout não transformada para evitar feedback. Mantém flutuação interna e brilho.

Portfólio com carrossel de dois projetos, screenshot de página completa em viewport recortado com range 0–100% para percorrer verticalmente, título, descrição factual, link Ver ao vivo. Botão WhatsApp flutuante violeta/pérola no canto inferior direito, disponível na jornada e bio.

## Refinamento aprovado — hero e portfólio
Hero inspirado na referência FG Sites fornecida: chamada em gradiente “Transforme visitantes em clientes com um”, título “Site de outro Universo” em Poppins, descrição própria da VF com João Pessoa e atendimento nacional, CTA violeta/pérola para WhatsApp. Preservar logo VF e jornada cósmica reversível; não importar a marca FG.
Portfólio expandido para duas colunas no desktop, faixa horizontal nativa com prévia do segundo card no celular, sem controles de troca. Cards escuros flutuantes com halos violeta e pérola, título em gradiente. Cada projeto mantém barra independente para explorar a captura real; cursor demonstrativo e instrução desaparecem após interação. Respeitar reduced motion e teclado. Alterações somente em packages/web; sem API ou banco novo.

## Enquadramento e imersão — ajuste solicitado
Na abertura, deslocar a cena cósmica para baixo, mantendo a região do título escura e o portal próximo à borda inferior como na imagem de referência. O deslocamento desaparece progressivamente ao rolar; preservar avanço e recuo da sequência. Remover “Explore nosso universo”. Manter o CTA textual do hero; exibir o botão flutuante com símbolo WhatsApp somente ao final da jornada (progress >= 0.99), ocultando-o novamente ao voltar à animação.

## Agência, fundador e ritmo de entrada
VF é uma agência de marketing em João Pessoa: sites e landing pages de alta conversão, experiências únicas e imersivas, credibilidade e confiança no mercado digital. Resultados apresentados como objetivos, não garantias.
Revelações por IntersectionObserver com duração de 850 ms e pequenos atrasos de 80–180 ms: títulos, descrições, cards e CTAs individualmente. Preservar flutuação em elementos internos e a sequência de vídeo sincronizada ao scroll. Reduced motion mostra tudo sem animação.
Seção Quem somos imediatamente após portfólio: foto original de Victor Ferreira em moldura editorial com halo violeta, texto ao lado no desktop/acima do texto no mobile. Fundador e CEO, 21 anos, mais de 5 anos no marketing digital. Sem números de resultados inventados. Novo founder-section.tsx e hook use-scroll-reveal.ts; apenas web, sem API ou banco.
