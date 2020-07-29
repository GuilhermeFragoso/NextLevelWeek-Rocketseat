// fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(function (res) {
//         return res.json()
// }).then(function (data) {
//         console.log(data)
// })

function populateUfs() {
        const ufSelect = document.querySelector('select[name=uf')

        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
                .then((res) => res.json())
                .then(states => {

                        for (state of states) {
                                ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
                        }

                })
}

populateUfs()

function getCities(event) {
        const citySelect = document.querySelector('select[name=city')
        const stateInput = document.querySelector('input[name=state')

        const ufValue = event.target.value

        const indexOfSelectState = event.target.selectedIndex
        stateInput.value = event.target.options[indexOfSelectState]

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = ""

        citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
        citySelect.disabled = true

        fetch(url)
                .then((res) => res.json())
                .then(cities => {

                        for (const city of cities) {
                                citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
                        }

                        citySelect.disabled = false

                })
}

document
        .querySelector('select[name=uf]')
        .addEventListener('change', getCities)

//Itens de Coleta
const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
        item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items')

let selectedItems = []

function handleSelectedItem(event) {

        const itemLi = event.target

        //Adicionar ou remover uma classe
        itemLi.classList.toggle('selected')

        const itemId = itemLi.dataset.id

        console.log('ITEM ID:  ', itemId)

        //Verificar se existem itens selecionados. Se sim,pegar os itens selecionados
        const alreadySelected = selectedItems.findIndex(item => {
                const itemFound = item == itemId //isso será true or false
                return itemFound
        })

        //Se já estiver selecionado, tirar da seleção
        if (alreadySelected >= 0) {
                //tirar da seleção
                const filteredItems = selectedItems.filter(item => {
                        const itemIsDiferrent = item != itemId //false
                        return itemIsDifferent
                })

                selectedItems = filteredItems
        } else {
                //Se não estiver selecionado, adicionar a seleção, adicionar a seleção
                selectedItems.push(itemId)
        }

        console.log('selectedItems: ', selecteditems)

        //Atualizar o campo escondido com os itens selecionados
        collectedItems.value = selectedItems

}