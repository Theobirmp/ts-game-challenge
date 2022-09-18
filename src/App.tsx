import { PropsWithChildren, useEffect, useState } from 'react'
import './App.css'
const GridRow:React.FC<PropsWithChildren>=({children})=>{
  return <div className='grid-row'>{children}</div>
}
type gridCellTypes={
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  clicked:boolean;
};
type gridProps={
  grid:boolean[][];
};

const GridCell:React.FC<gridCellTypes>=({onClick,clicked})=>{
  return <div className={`grid-cell clickable ${clicked?'clicked':''}`} onClick={onClick}></div>
}
const EmptyGridCell:React.FC=()=>{
  return <div className='grid-cell-empty disabled'></div>
}

const GridContainer:React.FC<gridProps>=({grid}:gridProps)=>{
  let gridLength=0
  grid.forEach(item=>{
    item.forEach(it=>{
      if (it) gridLength++
    })
  })
  const reverseGrid=()=>{
    let newGrid=[...gridQueue]
    const interval=setInterval(()=>{
      const item=newGrid.pop()
      setGridQueue([...newGrid])
      if(newGrid.length===0) clearInterval(interval)
    },500)
  }
  
  const [gridQueue,setGridQueue]=useState<point[]>([])
  const handleClick=(e:React.MouseEvent<HTMLElement>,row:number,col:number)=>{
    setGridQueue([...gridQueue,{row,col}])
  }
  useEffect(()=>{
    if(gridQueue.length===gridLength) reverseGrid()
  },[gridQueue])
  const handleIncludes=(row:number,col:number,gridQueue:point[]):boolean=>{
    return gridQueue.some(item=>item.row===row && item.col === col) 
  }
  return <div className='grid-container'>
    {grid.map((item:boolean[],row:number)=>{
      return <GridRow key={row} >
                  {item.map((it:boolean,col:number)=>it?(<GridCell clicked={handleIncludes(row,col,gridQueue)} onClick={(e)=>handleClick(e,row,col)} key={col} />):(<EmptyGridCell key={col}/>))}
              </GridRow>
    })}
  </div>
}
type point={
  row:number;
  col:number;
};

function App() {
  
  const grid:boolean[][]=[
    [ true, true, true ],
    [ true, false, false ],
    [ true, true, true ]
  ];
  
  return (
    <div className="App">
      <GridContainer grid={grid}/>
    </div>
  )
}

export default App
