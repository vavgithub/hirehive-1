export const GridRow = ({ label, value ,colCount = 2 ,gap = 2 ,extraStyles,customLabelStyles,customValueStyles }) => {
    let valueSteps = {
      0 : "0",
      1 : "2",
      2 : "4",
      3 : "6",
      4 : "8"
    }
  
    const styles = `
    grid 
    ${colCount?.toString() ? `grid-cols-${colCount}` :"grid-cols-2"} 
    ${gap?.toString() ? `gap-${valueSteps[gap]}` : "gap-4"} 
    `
  
    return(
    <div className={styles + " " + extraStyles}> 
      <span className={customLabelStyles ? customLabelStyles :" text-font-gray typography-body"}>{label}</span>
      <span className={customValueStyles ? customValueStyles : " typography-body"}>{value}</span>
    </div>
  )};