function validateCpf(cpf) {
    const cpfCleaned = cpf.replace(/\D+/g, '')
    const cpfArray = Array.from(cpfCleaned)
    const cpfWithoutDigit = cpfArray.splice(0, 9)

    const cpfFirstDigit = () => {
        const cpfFirstOperation = cpfWithoutDigit
            .map((value, index) => Number(value) * (10 - index))
            .reduce((accumulator, value) => accumulator + value, 0)

        const firstDigitCalc = 11 - (cpfFirstOperation % 11)
        return firstDigitCalc < 10 ? firstDigitCalc : 0
    }

    const cpfSecondDigit = () => {
        const cpfSecondOperation = [...cpfWithoutDigit, cpfFirstDigit()]
            .map((value, index) => value * (11 - index))
            .reduce((accumulator, value) => accumulator + value, 0)

        const secondDigitCalc = 11 - (cpfSecondOperation % 11)
        return secondDigitCalc < 10 ? secondDigitCalc : 0
    }

    const cpfFound = [...cpfWithoutDigit, cpfFirstDigit(), cpfSecondDigit()].join('')

    cpfFound === cpfCleaned ? console.log('valid cpf number') : console.log('invalid cpf number')
}

validateCpf('705.484.450-52')