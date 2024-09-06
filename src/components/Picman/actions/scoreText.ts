export function scoreText(score: number) {
    if (score > 10 && score < 20) return 'очков'
    if (score % 10 === 1) return 'очко'
    if (score % 10 === 2 || score % 10 === 3 || score % 10 === 4) return 'очка'
    return 'очков'
}