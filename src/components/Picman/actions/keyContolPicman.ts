function confInterval(
    interval: number,
    x: number,
    y: number,
    deg: number,
    setPositionPicman: React.Dispatch<React.SetStateAction<{ x: number; y: number; deg: number; }>>,
    moveInterval: React.MutableRefObject<NodeJS.Timeout | undefined>) {

    moveInterval.current = setInterval(() => { setPositionPicman((s) => ({ x: s.x + x, y: s.y + y, deg: deg })) }, interval)
}

export function keydown(
    isDown: boolean,
    moveInterval: React.MutableRefObject<NodeJS.Timeout | undefined>,
    setIsDown: React.Dispatch<React.SetStateAction<boolean>>,
    setPositionPicman: React.Dispatch<React.SetStateAction<{ x: number; y: number; deg: number; }>>,
    picmanInRamka: boolean
) {
    return (e: React.KeyboardEvent) => {
        if (isDown || !picmanInRamka) return
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault()
            clearInterval(moveInterval.current)
            moveInterval.current = undefined
            setIsDown(true)
            switch (e.key) {
                case 'ArrowUp': confInterval(10, 0, -3, 270, setPositionPicman, moveInterval)
                    break
                case 'ArrowDown': confInterval(10, 0, 3, 90, setPositionPicman, moveInterval)
                    break
                case 'ArrowRight': confInterval(10, 3, 0, 0, setPositionPicman, moveInterval)
                    break
                case 'ArrowLeft': confInterval(10, -3, 0, 180, setPositionPicman, moveInterval)
                    break
                default:
            }
        }
    }
}

export function keyup(setIsDown: React.Dispatch<React.SetStateAction<boolean>>,) {

    return (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault()
            setIsDown(false)
        }
    }
}