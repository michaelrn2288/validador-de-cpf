function validateCpf(cpf) {
    const cpfCleaned = cpf.replace(/\D+/g, '')

    if (cpfCleaned.length !== 11) return console.log('cpf must have 11 digits')

    const cpfArray = Array.from(cpfCleaned)
    const cpfWithoutDigit = cpfArray.splice(0, 9)
    const cpfFirstDigit = calcDigit(cpfWithoutDigit, 10)
    const cpfWithOneDigit = [...cpfWithoutDigit, cpfFirstDigit]
    const cpfSecondDigit = calcDigit(cpfWithOneDigit, 11)
    const cpfValidated = [...cpfWithOneDigit, cpfSecondDigit].join('')

    cpfValidated === cpfCleaned ? console.log('valid cpf number') : console.log('invalid cpf number')

    function calcDigit(cpfPiece, numMultiplier) {
        const cpfOperation = cpfPiece
            .map((value, index) => Number(value) * (numMultiplier - index))
            .reduce((accumulator, value) => accumulator + value, 0)

        const digit = 11 - (cpfOperation % 11)
        return digit < 10 ? digit : 0
    }
}

validateCpf('705.484.450-5')

chooseActionOption()

function chooseActionOption() {
    const chosenOptionContainer = document.querySelector('#chosen-option-container')
    const actionOption = document.querySelector('#cpf-option')

    document.addEventListener('load', () => optionValidateCpf())

    actionOption.addEventListener('input', () => {
        switch (actionOption.value) {
            case 'validate-cpf':
                optionValidateCpf()
            break;

            case 'generate-random-cpf':
                optionGenerateRandomCpf()
            break;
            
            case 'create-manual-cpf':
                optionCreateManualCpf()
                
        }

        function optionValidateCpf() {
            chosenOptionContainer.innerHTML = ''
            const orientationText1 = createElementWithText('h3', 'insira o CPF a ser validado')
            const cpfInput1 = document.createElement('input')
            cpfInput1.setAttribute('type', 'text')
            cpfInput1.setAttribute('maxlength', '11')
            const resultButton1 = createElementWithText('button', 'validar CPF')
            appendElements(chosenOptionContainer, orientationText1, cpfInput1, resultButton1)
            console.log('test')
        }

        function optionGenerateRandomCpf () {
            chosenOptionContainer.innerHTML = ''
                const resultButton2 = createElementWithText('button', 'gerar CPF')
                chosenOptionContainer.appendChild(resultButton2)
        }

        function optionCreateManualCpf () {
            chosenOptionContainer.innerHTML = ''
                const orientationText2 = createElementWithText('h3',
                    'insira os primeiros nove números do CPF para ele ser completado com dígitos válidos')
                const cpfInput2 = document.createElement('input')
                cpfInput2.setAttribute('type', 'text')
                cpfInput2.setAttribute('maxlength', '9')
                const resultButton3 = createElementWithText('button', 'criar CPF')
                appendElements(chosenOptionContainer, orientationText2, cpfInput2, resultButton3)
                console.log('test')
        }
    })

    function appendElements(parent, child1, child2) {
        for (let element of arguments) {
            console.log(element)
            if (element !== parent) {
                parent.appendChild(element)
            }
        }
    }

    function createElementWithText(tag, text) {
        const element = document.createElement(tag)
        const elementText = document.createTextNode(text)
        element.appendChild(elementText)
        return element
    }
}