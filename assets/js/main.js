cpfValidator()

function cpfValidator() {
    const result = document.querySelector('#result')
    let cpfValidated = []

    inputResponse()

    function validateCpf(cpf) {
        const cpfCleaned = cpf.replace(/\D+/g, '')

        if (cpfCleaned.length !== 11) return result.innerText = 'o CPF deve ter 11 dígitos'

        const cpfArray = Array.from(cpfCleaned)
        const cpfWithoutDigit = cpfArray.splice(0, 9)

        buildValidCpf(cpfWithoutDigit)

        cpfValidated === cpfCleaned ? result.innerText = 'CPF válido' : result.innerText = 'CPF inválido'
    }

    function generateRandomCpf() {
        const cpfWithoutDigit = []
        for (let i = 0; i < 9; i++) {
            cpfWithoutDigit[i] = Math.floor(Math.random() * 10)
        }
        buildValidCpf(cpfWithoutDigit)
        result.textContent = cpfValidated
    }

    function createManualCpf(cpf) {
        const cpfCleaned = cpf.replace(/\D+/g, '')

        if (cpfCleaned.length !== 9) return result.innerText = 'você deve inserir 9 dígitos'

        const cpfArray = Array.from(cpfCleaned)
        const cpfWithoutDigit = cpfArray.splice(0, 9)

        buildValidCpf(cpfWithoutDigit)
        result.textContent = cpfValidated
    }

    function buildValidCpf(cpfWithoutDigit) {
        const cpfFirstDigit = calcDigit(cpfWithoutDigit, 10)
        const cpfWithOneDigit = [...cpfWithoutDigit, cpfFirstDigit]
        const cpfSecondDigit = calcDigit(cpfWithOneDigit, 11)
        cpfValidated = [...cpfWithOneDigit, cpfSecondDigit].join('')

        function calcDigit(cpfPiece, numMultiplier) {
            const cpfOperation = cpfPiece
                .map((value, index) => Number(value) * (numMultiplier - index))
                .reduce((accumulator, value) => accumulator + value, 0)

            const digit = 11 - (cpfOperation % 11)
            return digit < 10 ? digit : 0
        }
    }

    function inputResponse() {
        const chosenOptionContainer = document.querySelector('#chosen-option-container')
        const actionOption = document.querySelector('#cpf-option')
        const textOrientation = chosenOptionContainer.querySelector('#text-orientation')
        const cpfInput = chosenOptionContainer.querySelector('#cpf-input')
        const resultButton = chosenOptionContainer.querySelector('#result-button')

        actionOption.addEventListener('input', () => {
            switch (actionOption.value) {
                case 'validate-cpf':
                    optionValidateCpf()
                    break

                case 'generate-random-cpf':
                    optionGenerateRandomCpf()
                    break

                case 'create-manual-cpf':
                    optionCreateManualCpf()
            }
        })

        resultButton.addEventListener('click', () => {
            switch (resultButton.value) {
                case 'btn-validate-cpf':
                    validateCpf(cpfInput.value)
                    break

                case 'btn-generate-cpf':
                    generateRandomCpf()
                    break

                case 'btn-create-cpf':
                    createManualCpf(cpfInput.value)
            }
        })

        function optionValidateCpf() {
            textOrientation.innerText = 'insira o CPF a ser validado'
            cpfInput.removeAttribute('hidden')
            cpfInput.removeAttribute('maxlength')
            cpfInput.setAttribute('maxlength', 11)
            resultButton.innerText = 'validar CPF'
            resultButton.removeAttribute('value')
            resultButton.setAttribute('value', 'btn-validate-cpf')
            result.innerText = ''
        }

        function optionGenerateRandomCpf() {
            textOrientation.innerText = ''
            cpfInput.setAttribute('hidden', 'hidden')
            resultButton.innerText = 'gerar CPF'
            resultButton.removeAttribute('value')
            resultButton.setAttribute('value', 'btn-generate-cpf')
            result.innerText = ''
        }

        function optionCreateManualCpf() {
            textOrientation.innerText =
                'insira os primeiros nove números do CPF para ele ser completado com dígitos válidos'
            cpfInput.removeAttribute('hidden')
            cpfInput.removeAttribute('maxlength')
            cpfInput.setAttribute('maxlength', 9)
            resultButton.innerText = 'criar CPF'
            resultButton.removeAttribute('value')
            resultButton.setAttribute('value', 'btn-create-cpf')
            result.innerText = ''
        }
    }
}