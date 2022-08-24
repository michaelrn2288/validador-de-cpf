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

    function calcDigit (cpfPiece, numMultiplier) {
        const cpfOperation = cpfPiece
            .map((value, index) => Number(value) * (numMultiplier - index))
            .reduce((accumulator, value) => accumulator + value, 0)

        const digit = 11 - (cpfOperation % 11)
        return digit < 10 ? digit : 0
    }
}

validateCpf('705.484.450-5')