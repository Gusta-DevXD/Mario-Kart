const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};
const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

//Função assincrona para simular o lançamento de um dado
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

//Função assincrona para sortear um bloco da corrida
async function randomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case (random < 0.33):
            result = "RETA";
            break;
        case (random < 0.66):
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRoll(characterName, dado, bloco, atributo) {
    console.log(`${characterName} 🎲 rolou um dado de ${bloco} ${dado} + ${atributo} = ${dado + atributo}`);
}

async function raceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        // Lógica da corrida
        console.log(`🏁 Rodada ${round} 🏁`);

        //Sorteio dos blocos
        let bloco = await randomBlock();
        console.log(`Bloco sorteado: ${bloco}`);

        //Dados
        let dado1 = await rollDice();
        let dado2 = await rollDice();

        //Teste de Habilidade
        let hab1 = 0;
        let hab2 = 0;

        if (bloco === "RETA") {
            hab1 = character1.velocidade + dado1;
            hab2 = character2.velocidade + dado2;

            await logRoll(character1.nome, dado1, "velocidade", character1.velocidade);
            await logRoll(character2.nome, dado2, "velocidade", character2.velocidade);
        }

        if (bloco === "CURVA") {
            hab1 = character1.manobrabilidade + dado1;
            hab2 = character2.manobrabilidade + dado2;
            await logRoll(character1.nome, dado1, "manobrabilidade", character1.manobrabilidade);
            await logRoll(character2.nome, dado2, "manobrabilidade", character2.manobrabilidade);
        }

        if (bloco === "CONFRONTO") {
            let powerResult1 = character1.poder + dado1;
            let powerResult2 = character2.poder + dado2;
            
            console.log(`🥊${character1.nome} vs ${character2.nome}🥊`);
            await logRoll(character1.nome, dado1, "poder", character1.poder);
            await logRoll(character2.nome, dado2, "poder", character2.poder);

            if(powerResult1 > powerResult2 && character2.pontos > 0) {
                console.log(`${character1.nome} venceu o confronto e ${character2.nome} perdeu um ponto!`);
                character2.pontos--;
            }
            if(powerResult2 > powerResult1 && character1.pontos > 0) {
                console.log(`${character2.nome} venceu o confronto e ${character1.nome} perdeu um ponto!`);
                character1.pontos--;
            }

            console.log(powerResult1 === powerResult2 ? `🤝 O confronto empatou!` : "");
        }

        //Resultado da rodada
        if(hab1 > hab2){
            console.log(`🏆 ${character1.nome} marcou um ponto!`);
            character1.pontos++;
        }else if (hab2 > hab1) {
            console.log(`🏆 ${character2.nome} marcou um ponto!`);
            character2.pontos++;
        } 
        console.log("-------------------------------\n");
    }

}

async function declareWinner(character1, character2) {
    console.log(`🏁 Resultado Final 🏁`);
    console.log(`${character1.nome}: ${character1.pontos} pontos`);
    console.log(`${character2.nome}: ${character2.pontos} pontos`);

    if (character1.pontos > character2.pontos) {
        console.log(`\n🏆 ${character1.nome} venceu a corrida!`);
    } else if (character2.pontos > character1.pontos) {
        console.log(`\n🏆 ${character2.nome} venceu a corrida!`);
    } else {
        console.log(`\n🤝 A corrida terminou empatada!`);
    }
}

//Função auto invocada
(async function main() {
    console.log(`🏁 🏎️  Corrida entre ${player1.nome} e ${player2.nome}!\n`);

    await raceEngine(player1, player2);
    await declareWinner(player1, player2);
})();