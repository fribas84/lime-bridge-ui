import React from 'react'
import Alert from 'react-bootstrap/Alert';

type ErrorHandlerProps ={
    showErrorHandler:boolean;
    errorMsg: string;
    handleCleanErrors: ()=>void   
}

function ErrorHandler({showErrorHandler,errorMsg, handleCleanErrors} :ErrorHandlerProps ) {
    
    const handleClose = () =>{
        handleCleanErrors();
    }

    if(showErrorHandler) {
        return (
            <Alert variant="danger" onClose={handleClose} dismissible>
                <Alert.Heading>You got an error!</Alert.Heading>
                <p>
                  {errorMsg}
                </p>
            </Alert>
              
            );
    }
    else
        return(<></>)
  
}

export default ErrorHandler;