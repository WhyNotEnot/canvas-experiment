function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function findDifference(current: number[][], previous: number[][]) {
    const difference: number[][] = current.filter(x => !previous.includes(x));
    return difference;
}

function drawLine(coordsY: number[], context: CanvasRenderingContext2D, width: number) {
	const stepLength: number = Math.ceil(width / 10)
    context.beginPath();
    context.moveTo(0, coordsY[0]);
    for (let i = 1; i < coordsY.length; i++) {
        context.lineTo(i * stepLength, coordsY[i]);
    }
    context.strokeStyle = `rgb(${getRandomInt(50, 200)},${getRandomInt(50, 200)},${getRandomInt(50, 200)})`;
    context.stroke();
}

export function renderCurves(current: number[][], previous: number[][], target: any) {
    const context: CanvasRenderingContext2D = target.current.getContext('2d') !;
    const canvasWidth: number = target.current.width;
    const canvasHeight: number = target.current.height;
    if (current.length < previous.length) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        current.forEach(e => drawLine(e, context, canvasWidth));
    } else if (current.length > previous.length) {
        const newToDraw: number[][] = findDifference(current, previous);
        newToDraw.forEach(e => drawLine(e, context, canvasWidth));
    }
}

export function generateCurve() {
    const stepQty: number = 11;
    let randArray: number[] = [];
    for (let i = 0; i < stepQty; i++) {
        randArray.push(getRandomInt(0, 150));
    }
    return randArray;
}

export function searchClosestCurve(clickLocation: any, canvasCurves: number[][]) {
    const closestTime = Math.round(clickLocation.x / 50);
    const goal = clickLocation.y;
    const closestCurve: number[] = canvasCurves.reduce((prev: number[], curr: number[]) => {
        return (Math.abs(curr[closestTime] - goal) < Math.abs(prev[closestTime] - goal) ? curr : prev)
    });
    return closestCurve;
}

export function removeCurve(victimCurve: number[], parentArray: number[][]): number[][] {
    let newArray: number[][] = [];
    parentArray.forEach((arg) => {
        if (!arg.every(e => victimCurve.includes(e))) {
            newArray.push(arg);
        }
    })
    return newArray
}