import React from 'react'

function MuiCustomStylesForDataGrid() {
    return (
        <style>
                {`
            .MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
            .MuiDataGrid-root .MuiDataGrid-cell:focus {
                outline: none !important;                      
                border: none !important
                
                }
                .MuiDataGrid-root {
                    outline: none !important;                      
                    border: none !important;                
                }
            .MuiDataGrid-row {
                    border-radius : 0px !important;
            }

            .MuiDataGrid-row--lastVisible  {
                    border-radius : 0px !important;
            }
            
            .MuiDataGrid-columnHeaderRow {
        
                color:"red",
            }    
            .MuiDataGrid-row .MuiDataGrid-checkboxInput {
                visibility: hidden;
            }
            .css-13edya7-MuiDataGrid-root .MuiDataGrid-virtualScrollerContent .MuiDataGrid-row.Mui-selected {
                background: rgba(24, 233, 208, 0.2) !important;
            }
            .MuiDataGrid-row:hover .MuiDataGrid-checkboxInput,
            .MuiDataGrid-row .MuiDataGrid-checkboxInput.Mui-checked {
                visibility: visible;
            }
            .MuiDataGrid-columnHeaders .MuiDataGrid-checkboxInput {
                visibility: visible !important;
            }
            .name-cell {
                display: flex;
                align-items: center;
                width: 100%;
            }
            .hover-icons {
                display: none;
                margin-left: auto;
            }
            .Mui-selected .name-cell p{
                color:rgb(24, 233, 208);
            }
            .name-cell:hover  p{
                width:20%;
                white-space:nowrap;
                overflow:hidden !important;
                text-overflow:ellipsis !important;
                color:rgb(24, 233, 208);
            }
            .name-cell:hover .hover-icons {
                width:80%;
                display: flex;
            }
            .icon-link {
                margin-left: 8px;
                color: #666;
                transition: color 0.3s;
                display : flex;
                justify-content : "center",
                align-items : "center"
            }
            .icon-link:hover {
                color: #000;
            }
        
            .icon {
                font-size: 1.2rem;
            }  

                .MuiDataGrid-root .MuiDataGrid-cell {
                    overflow: visible !important;
                }
                .MuiDataGrid-root .MuiDataGrid-row {
                    z-index: 1;
                    cursor: pointer
                }
                .MuiDataGrid-root .MuiDataGrid-row:hover {
                    z-index: 2;
                }
                .MuiDataGrid-main.css-3eek4p-MuiDataGrid-main {
                max-width:83vw;
                }
                .MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal.css-1rtad1::-webkit-scrollbar {
                    width: 5px;
                    height: 5px;
                }

                /* Track */
                .MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal.css-1rtad1::-webkit-scrollbar-track {
                    border-radius: 5px;
                    background: #1D1D1D; 
                }
                
                /* Handle */
                .MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal.css-1rtad1::-webkit-scrollbar-thumb {
                    background: #c1c1c1; 
                    border-radius: 100px;
                }

                /* Handle on hover */
                .MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal.css-1rtad1::-webkit-scrollbar-thumb:hover {
                    background: #fff; 
                }
                .css-1oudwrl::after {
                    display: none;
                }
                .css-tgsonj {
                border-top:none;
                }

            `}
      </style>
  )
}

export default MuiCustomStylesForDataGrid
