import React from 'react'


const TranslateDoc = ({url}) => {
   
    return (
        <div>
          <header>
           
            <h1>Yokogawa</h1>
          </header>
          <iframe title='TranslateDoc' src={url} width="100%" height="90%" />
          {/* <p>I need on click of sidebar submenu Translate you doc i need to open react modal but it is not opening
                here is my code
            </p> */}
        </div>
      );

}


export default TranslateDoc;