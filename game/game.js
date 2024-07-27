let cont = 0;
const legenda = document.getElementById('legenda');
let img = document.getElementById('img2');
let divEscolhas = document.getElementById('escolhas');
let divAlt = document.getElementById("divAlt"); //div que será manipulada (divAlteração)
let textoAlt = document.getElementById("divTexto");
const chuva = document.getElementById("rain-audio");
const musica = document.getElementById("caixa-audio");

chuva.volume = 0.1; // a chuva é "desmutada" no javascript para que "chuva.volume = 0.1" carregue junto com audio


function exibirLegenda(text, delay) {
    let i = 0;

    function exibirCaracteres() {
        if (i < text.length) {
            legenda.innerHTML += text.charAt(i);
            i++;
            setTimeout(exibirCaracteres, delay);
        } else {
            exibirDivEscolhas(); // Exibe a divEscolhas após a legenda ser completamente exibida
        }
    }

    exibirCaracteres();
}

function novaLegenda(text, delay) {
    divEscolhas.style.display = "none";
    divEscolhas.style.opacity = 0;
    legenda.innerHTML = ''; // Limpa o texto anterior
    exibirLegenda(text, delay);
}

function exibirDivAlt() {
    divAlt.style.display = "flex";
    divAlt.style.opacity = 1;

}

function exibirDivEscolhas() {
    setTimeout(function() {
        divEscolhas.style.display = "flex";
        setTimeout(function() {
            divEscolhas.style.opacity = 1;
        }, 50);
    }, 100); 
}

function imagemOpac(n) {

    img.style.transition = "opacity 1s 0.5s";

    if (n != 1 && n != 0) {
        img.style.transition = "opacity 4s 0.5s";
    }

    if (n != 0) {
        n = 1;
    }
    img.style.opacity = n;
}

function transicao() {
    divAlt.style.opacity = 0;
    imagemOpac(0);
}

function continuar() {

    novaLegenda("Quem é esse? [Você recebeu uma mensagem de um desconhecido]", 40);
    divEscolhas.innerHTML = `
        <button onclick="escolher(1)">Ver Mensagem</button>
        <button onclick="escolher(2)">Ignorar Mensagem</button>
    `;
};


function estiloDivAlt(n){
    divAlt.className = ''; //remove todos os estilos
    
    if(n && n !== 0){
        divAlt.classList.add(`divAlt${n}`);
    }
}

function fimDeJogo(){
    divAlt.style.opacity = 1;
    estiloDivAlt(4);
    divAlt.innerHTML = '<h2>FIM DE JOGO</h2>'
    divEscolhas.innerHTML = '<a href="game.html"> <button>Jogar Novamente</button> </a>' +
            '<a href="../avaliacao/avaliacao.html"><button>Avaliar o Jogo</button></a>' +
            '<a href="../index.html"><button>Home Page</button></a>';
}

imagemOpac();

setTimeout(
    function(){
        exibirDivAlt();
        document.getElementById('img1').style.opacity = 0;
        document.getElementById('img1').style.display = "none";
    }, 4500);
novaLegenda("Uma noite chuvosa lá fora, eu dentro do apartamento, mais um dia comum.", 45);

function ramificacao(opc) {

    transicao();

    switch (opc) {
        case 1: //PEGAR PACOTE

            novaLegenda('[Mesmo descrente, você espera, mas o mal pressentimento é inevitável]', 40);
            divEscolhas.innerHTML = '<button onclick="ramificacao(2)">Continuar</button>';
            break;

        case 2: //ATENDER OU NÃO A PORTA
            
            divAlt.style.display = "none"
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/campainha.mp3" type="audio/mp3"></audio>';

            setTimeout(function(){divAlt.style.display = "block"}, 1000)
            

            novaLegenda('[01:00 Hora e a campainha toca]', 40);

            if (cont != 1) {
                divEscolhas.innerHTML = '<button onclick="ramificacao(3)">Continuar</button>';
            } else {
                divEscolhas.innerHTML = '<button onclick="ramificacao(3)">Atender</button>' +
                    '<button onclick="escolher(14)">Não atender</button>';
            }
            break;

        case 3: //PEGAR PACOTE OU NÃO PACOTE

            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/abrir-porta.mp3" type="audio/mp3"></audio>'
            novaLegenda('[Você abre a porta, sente um frio na espinha, e lá está um pacote, bem na frente da sua porta]', 40);

            if (cont != 1) {
                divEscolhas.innerHTML = '<button onclick="ramificacao(4)">Continuar</button>';
            } else {
                divEscolhas.innerHTML = '<button onclick="ramificacao(4)">Pegar o Pacote</button>' +
                    '<button onclick="ramificacao(6)">Não Pegar o Pacote</button>';
            }
            break;

        case 4: //PEGAR PACOTE
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/fechar-porta.mp3" type="audio/mp3"></audio>'
            novaLegenda('[Você pega o pacote e volta pro pc]', 40);
            divEscolhas.innerHTML = '<button onclick="escolher(7)">Continuar</button>';
            break;

        case 5: //RECUSAR LIGAÇÃO

            novaLegenda('É melhor não atender uma chamada de um desconhecido.', 40);
            divEscolhas.innerHTML = '<button onclick="ramificacao(2)">Continuar</button>';
            break;

        case 6: //NÃO PEGAR PACOTE
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/fechar-porta.mp3" type="audio/mp3"></audio>'
            novaLegenda('[Você não pega o pacote e volta pro pc]', 40);
            divEscolhas.innerHTML = '<button onclick="escolher(14)">Continuar</button>';

            break;


        case 7: // MORTE PELA ABERTURA DA CAIXA (FIM DE JOGO)
            transicao();
            novaLegenda('ເຈົ້າໄດ້ຖືກເຕືອນແລ້ວ, ດຽວນີ້ຈິດວິນຍານຂອງເຈົ້າເປັນຂອງຂ້ອຍ', 40);
            divEscolhas.innerHTML = '<button onclick="ramificacao(8)">Continuar</button>';
            break;

        case 8: // MORTE PELA ABERTURA DA CAIXA (FIM DE JOGO)

            imagemOpac(0);
            divAlt.style.opacity = 1;
            fimDeJogo()

            novaLegenda('[Você sente cada osso do seu corpo se quebrando e a vida se esvai de seu corpo]', 40);
            divEscolhas.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/ossos-quebrando.mp3" type="audio/mp3"></audio>' +
                '<a href="game.html"> <button>Jogar Novamente</button> </a>' +
                '<a href="../avaliacao/avaliacao.html"><button>Avaliar o Jogo</button></a>';
            break;

        case 9: //RECEBER CAIXA E IR DORMIR
        novaLegenda('Enfim, já está tarde, amanhã eu preciso acordar cedo para trabalhar.', 40);
        divEscolhas.innerHTML = '<button onclick="ramificacao(10)">Continuar</button>';
        break;

        case 10: //ACORDAR 1/2
            chuva.muted = true;
            novaLegenda('[Você acorda e tudo parece perfeitamente normal]', 40);
            divEscolhas.innerHTML = '<button onclick="ramificacao(11)">Continuar</button>';
            break;
            
        case 11: //ACORDAR 2/2
            imagemOpac(1);
            img.src = '../img/manha.png';
            novaLegenda('[Você olha pra caixa e se pergunta novamente se deveria abri-la]', 40);
            divEscolhas.innerHTML = '<button onclick="ramificacao(12)">Abrir</button>' + 
            '<button onclick="ramificacao(13)">Ir Trabalhar</button>';
            break;

        case 12: //ABRIR A CAIXA DE MANHÃ (FIM DE JOGO)
            fimDeJogo();
            novaLegenda('[A Caixa está vazia e você se sente muito desconfortável após saber disso] Como isso estava tão pesado?', 45);
            break;

        case 13: //TRABALHAR SEM ABRIR A CAIXA (FIM DE JOGO)
            fimDeJogo();
            novaLegenda('Isso não importa agora, melhor eu ir andando para não me atrasar.', 40);
            break;

        case 14: //ESPERAR A CHUVA PASSAR COM A CAIXA
            imagemOpac(0);
            novaLegenda('A chuva passou, e agora?', 40);
            chuva.volume = 0;
            divEscolhas.innerHTML = '<button onclick="ramificacao(16)">Abrir</button>' + 
            '<button onclick="ramificacao(15)">Não Abrir</button>';
            break;

        case 15: //ESPEROU A CHUVA PASSAR E NÃO ABRIU A CAIXA (FIM DE JOGO)
            fimDeJogo();
            img.src = '../img/manha.png';
            novaLegenda('Isso já passou dos limites, eu preciso dormir o resto da noite e ir trabalhar.', 40);
            break;

        case 16://ABRIR A CAIXA DE MANHÃ (FIM DE JOGO)
            imagemOpac(1)
            fimDeJogo();
            novaLegenda('[A Caixa está vazia e você se sente muito desconfortável após saber disso] Como isso estava tão pesado?', 40);
            break;
            
    }
}

function escolher(option) {

    switch (option) {
        case 1: //VER MENSAGEM

            novaLegenda('[Você abre a mensagem e lê]', 40);

            estiloDivAlt(2);

            divAlt.style.opacity = 1;

            textoAlt.textContent = 'Anjo da Morte\n\n' +
                'Você receberá um pacote na sua casa hoje, as uma\nhora da manhã, ' +
                'se você pegá-la tudo ficará bem,caso\ncontrário eu não poderei garantir a sua segurança.';

            divEscolhas.innerHTML = '<button onclick="escolher(3)">Aceitar e pegar a entrega</button>' +
                '<button onclick="escolher(4)">Bloquear e não pegar</button>';
            break;

        case 2: //IGNORAR MENSAGEM

            novaLegenda('Que estranho, será que eu deveria atender?', 40);

            estiloDivAlt(3);

            // textoAlt.textContent = 'CHAMADA RECEBIDA\nANJO DA MORTE'

            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/receber-ligacao.mp3" type="audio/mp3"></audio>' +
                '<p id="divTexto">CHAMADA RECEBIDA\nANJO DA MORTE</p>' +
                '<img src="../img/chamada.png" alt="chamada">';


            divEscolhas.innerHTML = '<button onclick="escolher(5)">Atender</button>' +
                '<button onclick="escolher(6)">Recusar</button>';
            break;


        case 3: //ACEITAR E PEGAR A ENTREGA

            ramificacao(1);
            break;

        case 4: //BLOQUEAR E NÃO PEGAR
            cont = 1;
            ramificacao(2);
            break;

        case 5: //ATENDER LIGAÇÃO

            novaLegenda('[Você ouve ruídos estranhos] Alo? Será que eu deveria ler a mensagem?', 40);

            estiloDivAlt(3);

            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/ruidos.mp3" type="audio/mp3"></audio>' +
                '<img src="../img/angel-of-death.png" alt="chamada">' +
                '<p id="divTexto">ANJO DA MORTE\nchamada em andamento</p>';

            divEscolhas.innerHTML = '<button onclick="escolher(8)">Ver Mensagem</button>' +
                '<button onclick="escolher(4)">Ignorar e Bloquear</button>';

            break;

        case 6: //RECUSAR LIGAÇÃO

            cont = 1;
            ramificacao(5);
            break;


        case 7: //CONTINUAÇÃO DO RAMIFICACAO(4)
            img.src = '../img/black-box-zoom.png';
            imagemOpac(1);
            estiloDivAlt(2);
            novaLegenda('Que p@@ra é essa?', 40);

            divEscolhas.innerHTML = '<button onclick="escolher(9)">Continuar</button>';
            break;

        case 8: //VER MENSAGEM DEPOIS DE IGNORAR

            novaLegenda('[Você abre a mensagem e lê]', 40);

            estiloDivAlt(2)

            // divAlt.style.opacity = 1;

            divAlt.innerHTML = '<p id="divTexto">Anjo da Morte\n\n' +
                'Você receberá uma entrega na sua casa hoje, as uma\nhora da manhã,' +
                'se você pegá-la tudo ficará bem,caso\ncontrário eu não poderei garantir a sua segurança.</p>';

            divEscolhas.innerHTML = '<button onclick="escolher(3)">Aceitar e pegar a entrega</button>' +
                '<button onclick="escolher(4)">Bloquear e não pegar</button>';
            break;

        case 9: //CONTINUAÇÃO DO 7

            novaLegenda('Eu deveria abrir isso?', 40);

            divAlt.style.opacity = 1;

            divAlt.innerHTML = '<p id="divTexto">Anjo da Morte\n\nNão abra até que não seja mais possível ouvir o choro.</p>';
            divEscolhas.innerHTML = '<button onclick="escolher(10);">Abrir</button>' +
                '<button onclick="escolher(12)">Não Abrir</button>';

            break;


        case 10: //ABRIR CAIXA E MORRER (FIM DE JOGO)

            transicao();
            novaLegenda('Eu não ouço ninguém chorando, vou abrir isso e talvez eu chame a polícia depois.', 40);
            divEscolhas.innerHTML = '<button onclick="escolher(11);">Continuar</button>';

            break;

        case 11: //CONTINUAÇÃO DA ABERTURA (FIM DE JOGO)
            imagemOpac(1);
            musica.play();
            musica.volume = 0.12;
            novaLegenda('[Você tenta abrir a caixa mas a sua mão queima ao tocar] M@RDA, A CAIXA TA SANGRANDO?!', 40);

            img.src = '../img/bloody-box-zoom.png';

            divEscolhas.innerHTML = '<button onclick="ramificacao(7);">Continuar</button>';

            break;

        case 12: 

            novaLegenda('Já está tarde, mas eu realmente queria saber o que tem aí dentro.', 40);
            divAlt.style.opacity = 0;
            divEscolhas.innerHTML =  '<button onclick="ramificacao(9)">Ir Dormir</button>' + 
            '<button onclick="ramificacao(14)">Esperar a Chuva Passar</button>';
            break;
            

        case 14: // NÃO PEGAR O PACOTE

            estiloDivAlt(2);
            imagemOpac(1);
            novaLegenda('Eu deveria chamar a polícia, ou talvez só dormir.', 40);
            divEscolhas.innerHTML = '<button onclick="escolher(15);">Ligar Para 190</button>' +
                '<button onclick="escolher(15)">Ir Dormir</button>';
            break;

        case 15: // AVISO POR NÃO PEGAR O PACOTE

            divAlt.style.opacity = 1;
            novaLegenda('Eu não tinha bloqueado ele?', 40);
            divAlt.innerHTML = '<p id="divTexto">Anjo da Morte\n\nNão durma, não chame a polícia e nem tente ' +
                'pegar o\npacote agora, aquilo é muito mais rápido que você,\nporém o único sentido daquilo é a audição.\nA sua uníca chance é ficar imóvel até ' +
                'que não\nseja possível escutar mais o choro.</p>'
            divEscolhas.innerHTML = '<button onclick="escolher(16);">Ir Dormir</button>' +
                '<button onclick="escolher(17)">Ligar Para 190</button>' +
                '<button onclick="escolher(19)">Ficar Imóvel</button>';
            break;


        case 16: // IR DORMIR OU SE MOVER (FIM DE JOGO)

            transicao();
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/abrir-porta.mp3" type="audio/mp3"></audio>';
            novaLegenda('[Você fica paralisado ao ouvir a porta do seu apartamento se abrindo enquanto começa a se levantar]', 40);
            divEscolhas.innerHTML = '<button onclick="escolher(18);">Continuar</button>';

            break;


        case 17: //LIGANDO 190 (FIM DE JOGO)

            transicao();

            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/abrir-porta.mp3" type="audio/mp3"></audio>' +
                '<audio autoplay hidden><source src="../audio/ligando190.mp3" type="audio/mp3"></audio>';

            novaLegenda('[Você fica paralisado ao ouvir a porta do seu apartamento se abrindo enquanto seu telefone toca]', 40);

            divEscolhas.innerHTML = '<button onclick="escolher(18);">Continuar</button>';

            break;


        case 18:// MORTE POR ATAQUE(FIM DE JOGO)

            transicao();
            divAlt.style.opacity = 1;
            fimDeJogo();
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/morte.mp3" type="audio/mp3"></audio>' +
                '<h2>FIM DE JOGO</h2>';

            novaLegenda('[Inevitavelmente é o seu fim...]', 40);

            divEscolhas.innerHTML = '<a href="game.html"> <button>Jogar Novamente</button> </a>' +
                '<a href="../avaliacao/avaliacao.html"><button>Avaliar o Jogo</button></a>';
            break;

        case 19: //PRIMEIRA VEZ IMÓVEL

            divAlt.style.opacity = 0;
            img.style.opacity = 0.8;

            novaLegenda('[Você está na mesma posição a cerca de uma hora e a luz do apartamento parece fraca]', 40);

            divEscolhas.innerHTML = '<button onclick="escolher(20);">Continuar Imóvel</button>' +
                '<button onclick="escolher(16)">Se Mover</button>';

            break;

        case 20: //SEGUNDA VEZ IMÓVEL

            img.style.opacity = 0.6;

            novaLegenda('[Você está na mesma posição a cerca de duas horas e a luz do apartamento está mais fraca]', 40);

            divEscolhas.innerHTML = '<button onclick="escolher(21);">Continuar Imóvel</button>' +
                '<button onclick="escolher(16)">Se Mover</button>';

            break;

        case 21: //TERCEIRA VEZ IMÓVEL

            img.style.opacity = 0.4;

            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/abrir-porta.mp3" type="audio/mp3"></audio>'

            novaLegenda('[Você está na mesma posição a cerca de três horas, quase não há luz no apartamento e a porta se abriu]', 40);

            divEscolhas.innerHTML = '<button onclick="escolher(22);">Continuar Imóvel</button>' +
                '<button onclick="escolher(18)">Se Mover</button>';

            break;

        case 22:

            chuva.volume = 0;
            fimDeJogo();
            img.src = '../img/4&15.png';
            imagemOpac(1);
            divAlt.style.opacity = 1;
            novaLegenda('[Agora são 4:15 da manhã, a chuva parou, a luz voltou, tudo parece normal]', 40);
            divEscolhas.innerHTML = '<a href="game.html"> <button>Jogar Novamente</button> </a>' +
                '<a href="../avaliacao/avaliacao.html"><button>Avaliar o Jogo</button></a>';

    }
}



const iconeVolume = document.getElementById("volume");

iconeVolume.addEventListener("click", function(){

    if(iconeVolume.textContent === "volume_up"){
        iconeVolume.innerText = "volume_off";
        chuva.muted = true;
    }else{
        iconeVolume.innerText = "volume_up";
        chuva.muted = false;
    }

})
