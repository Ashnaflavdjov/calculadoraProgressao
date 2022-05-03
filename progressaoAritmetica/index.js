const sequenceForm = document.forms["seq"];
const termForm = document.forms["TG"];
const results = document.getElementById("resultado");

const plus = document.getElementById("addInput");
const minus = document.getElementById("subtractInput");

plus.onclick = () => {

    let lastSeqNum = parseInt(sequenceForm.elements[sequenceForm.elements.length - 1].value);

    if(lastSeqNum){

        let result = GetSequence();
        let numInput = document.createElement("input");

        numInput.type = "number";
        numInput.value = lastSeqNum + result.razao;

        sequenceForm.appendChild(numInput);
    }
};

minus.onclick = () => {

    if(sequenceForm.elements.length > 2){

        sequenceForm.elements[sequenceForm.elements.length - 1].remove();
    }
}

termForm.elements["fazerTudo"].onclick = () => {

    let numero = termForm.elements["termo"].value;
    let all = GetAll(GetSequence(), numero);

    if(!all) return;

    results.innerHTML =
    `<div>
        <h4>razão:</h4>
        <p id="razao">${all.razao}</p>
    </div>
    <div>
        <h4>termo na posição ${numero}:</h4>
        <p id="nthTerm">${all.nthTerm}</p>
    </div>
    <div>
        <h4>soma dos termos até a posição ${numero}:</h4>
        <p id="termsSum">${all.sum}</p>
    </div>`;
}

function GetSequence(){

    let lmnts = sequenceForm.elements;

    let sequence = [];

    for(let i = 0; i < lmnts.length; i++){

        if(lmnts[i].value){
            
            sequence.push(parseInt(lmnts[i].value));
        }
    }
    
    let razao = sequence[1] - sequence[0];

    for(let i = 2; i < sequence.length; i++){

        if(sequence[i] - sequence[i - 1] != razao){
            
            console.log("fracasso");
            return;
        } 
    }

    console.log("sucesso");
    return {sequence, razao};
}

function GetNthTerm(result, numero){

    if(!result || !numero) return;

    return result.sequence[0] + (numero - 1) * result.razao;
}

function SumTerms(result, numero){

    if(!result || !numero) return;

    let nthTerm = GetNthTerm(result, numero);

    return ((result.sequence[0] + nthTerm) * numero) / 2;
}

function GetAll(result, numero){

    if(!result || !numero) {console.log("erro"); return;};

    let razao = result.razao;
    let nthTerm = GetNthTerm(result, numero);
    let sum = SumTerms(result, numero);

    return {razao, nthTerm, sum}
}