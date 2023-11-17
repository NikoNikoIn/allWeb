import { useState, useRef, useEffect } from 'react'


const MoneyGraphTrend = () => {

    const svgHeight = '300px'

    const [svgWidth, setSvgWidth] = useState(100)
    const graphAxisRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (graphAxisRef.current) {
            setSvgWidth(graphAxisRef.current.offsetWidth + 300)
        }
    }, [])

    return (
        <div>
            <h2>Graph of Spending</h2>
            <div className='graph-axis' ref={graphAxisRef} style={{height:svgHeight}}>
                <div style={{ overflowX:'auto', overflowY:'hidden'}}>
                    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                        <line x1='0' y1='0' x2={svgWidth} y2='25vh' strokeWidth='2' stroke='blue'></line>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default MoneyGraphTrend
