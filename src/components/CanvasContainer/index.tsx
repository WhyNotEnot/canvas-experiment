import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'react-redux';
import { updateFirstCanvas, updateSecondCanvas } from '../../actions/actions';
import { generateCurve, renderCurves, searchClosestCurve, removeCurve } from './curveHandler';

function CanvasContainer() {

	const store: any = useStore();

	const initialFirst = store.getState().firstCanvas;
	const initialSecond = store.getState().secondCanvas;

	const [firstCanvas, setFirstCanvas] = useState(initialFirst);
	const [secondCanvas, setSecondCanvas] = useState(initialSecond);
	const [draggedElement, setDraggedElement] = useState();

	const prevFirstCanvas = usePrevious(firstCanvas);
	const prevSecondCanvas = usePrevious(secondCanvas);

	const firstCanvasRef = useRef < HTMLCanvasElement > (null);
	const secondCanvasRef = useRef < HTMLCanvasElement > (null);

	function handleMouseDown(e: any) {

	    const targetOffset = e.target.getBoundingClientRect();
	    const x = e.pageX;
	    const y = e.pageY;
	    const id = e.target.id;

	    const clickLocation = {
	        'x': x - targetOffset.x,
	        'y': y - targetOffset.y,
	        'canvas': e.target.id,
	    }
	    const canvasCurves = id === "first_canvas" ? firstCanvas : secondCanvas;

	    if (!canvasCurves[0]) {
	        return
	    }

	    const closestCurve = searchClosestCurve(clickLocation, canvasCurves);

	    setDraggedElement({
	        curve: closestCurve,
	        element: id
	    });

	}


	function handleMouseUp(e: any) {
	    if (draggedElement) {
	        if (draggedElement.element !== e.target.id) {
	        	switch(e.target.id) {
				   case 'first_canvas': {
				      	const receivingArray = firstCanvas;
		                const givingArray = secondCanvas;
		                receivingArray.push(draggedElement.curve);
		                setFirstCanvas([...receivingArray]);
		                setSecondCanvas(removeCurve(draggedElement.curve, givingArray));
				      	break;
				   }
				   case 'second_canvas': {
				      	const receivingArray = secondCanvas;
		                const givingArray = firstCanvas;
		                receivingArray.push(draggedElement.curve);
		                setSecondCanvas([...receivingArray]);
		                setFirstCanvas(removeCurve(draggedElement.curve, givingArray));
				      	break;
				   }
				   default: {
				      break;
				   }
				}
	        }
	    }

	}


	function addCurve(target: string) {
	    let newCurve: number[] = generateCurve();

	    if(target === 'first') {
		    let recipientArray: number[][] = firstCanvas;
		    recipientArray.push(newCurve);
		    setFirstCanvas([...recipientArray]);
		} else {
			let recipientArray: number[][] = secondCanvas;
		    recipientArray.push(newCurve);
		    setSecondCanvas([...recipientArray]);
		}
	}

	useEffect(() => {
	    if (firstCanvasRef.current) {
	        renderCurves(firstCanvas, prevFirstCanvas ? prevFirstCanvas : [], firstCanvasRef);
	    }
	    store.dispatch(updateFirstCanvas(firstCanvas));
	    localStorage.setItem('canvasAppFirst', JSON.stringify(firstCanvas));
	}, [firstCanvas, prevFirstCanvas, store]);

	useEffect(() => {
	    if (secondCanvasRef.current) {
	        renderCurves(secondCanvas, prevSecondCanvas ? prevSecondCanvas : [], secondCanvasRef);
	    }
	    store.dispatch(updateSecondCanvas(secondCanvas));
	    localStorage.setItem('canvasAppSecond', JSON.stringify(secondCanvas));
	}, [secondCanvas, prevSecondCanvas, store]);

  return (
    <>
    	<div className="controls-container">
        	<button className="add-curve-button" onClick={() => addCurve("first")}>Нарисовать сверху</button>
        	<button className="add-curve-button" onClick={() => addCurve("second")}>Нарисовать снизу</button>
        	<div className="hint">При необходимости кривые можно перетаскивать между канвасами</div>
        </div>
        <canvas id="first_canvas" onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} ref={firstCanvasRef}>
          Похоже, браузер не поддерживает канвасы. Это прискорбно, но здесь мог бы быть плейсхолдер
        </canvas>
        <div className="delimiter">
        </div>
        <canvas id="second_canvas" onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} ref={secondCanvasRef}>
          Здесь тоже
        </canvas>
    </>
  );
}

function usePrevious(value: number[][]) {
  const ref: any = useRef();
  useEffect(() => {
    ref.current = [...value];
  }, [value]);
  return ref.current;
}

export default CanvasContainer;
