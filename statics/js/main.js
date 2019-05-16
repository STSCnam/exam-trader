'use strict'

window.onload = async () => {
    let box1 = document.querySelector('.box-1');

    box1.innerHTML = '';

    let traders = await fetch('/service/bourse/trader/find/all').then(res => res.json());

    for (let trader of traders) {
        let row = document.createElement('div');

        row.classList.add('table-row');

        row.innerHTML = `
            <p class="table-field">${trader.idTrader}</p>
            <p class="table-field">${trader.nomTrader}</p>
        `;

        row.onclick = e => showActions(row, trader.idTrader);

        box1.appendChild(row);
    }
};

async function showActions(targeted, idTrader) {
    let box2 = document.querySelector('.box-2');

    updateSelected(targeted);
    box2.innerHTML = '';

    let actions = await fetch(`/service/bourse/action/find?idTrader=${idTrader}`).then(res => res.json());

    for (let action of actions) {
        let row = document.createElement('div');

        row.classList.add('table-row');

        row.innerHTML = `
            <p class="table-field">${action.nomAction}</p>
            <p class="table-field">${action.montantAchat}</p>
            <p class="table-field">${action.quantite}</p>
        `;

        row.onclick = e => showCloture(row, action.nomAction, action.montantAchat, action.quantite);

        box2.appendChild(row);
    }
}

async function showCloture(targeted, nomAction, montantAchat, quantite) {
    let box3 = document.querySelector('.box-3');

    updateSelected(targeted);

    let cloture = await fetch(`https://api.iextrading.com/1.0/stock/${nomAction}/quote`).then(res => res.json());

    box3.innerHTML = `
        <div class="table-row">
            <p class="table-field">Prix de clôture</p>
            <p class="table-field">${cloture.close}</p>
        </div>

        <div class="table-row">
            <p class="table-field">Montant achat</p>
            <p class="table-field">${quantite * montantAchat}</p>
        </div>

        <div class="table-row">
            <p class="table-field">Montant vente</p>
            <p class="table-field">${quantite * cloture.close}</p>
        </div>

        <div class="table-row">
            <p class="table-field">Gain ou Perte sur l'Action</p>
            <p class="table-field">${quantite * cloture.close - montantAchat}</p>
        </div>
    `;
}

function updateSelected(target) {
    let rows = document.querySelectorAll('.table-row');

    for (let row of rows)
        row.classList.remove('selected');

    target.classList.add('selected');
}