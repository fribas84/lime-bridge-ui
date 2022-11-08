import React from 'react'


type BorrowedProps = {
    borrowed:number;
}
const Borrowed = ({borrowed}:BorrowedProps) => {
  if(borrowed!=0){
    return (
        <p>
            <strong>You borrowed: </strong> {borrowed}
        </p>
    );
    }
    else{
    return(<p><strong>You did not borrowed any book.</strong></p>);
    }
}

export default Borrowed