//This component will contain a button to add a book to the user's library.

import React from 'react'
import { IoIosAddCircleOutline, IoIosAddCircle } from "react-icons/io";


//Ionicons 4

const iconStyle = {
    float: "right",
    marginTop: "6px",
    marginRight: "6px"
}

export default function AddBookButton({ onBookAdd, fill }) {
    //This will keep track of whether or not a book is added to someones library
    // const [bookAdded, setBookAdded] = useState(false)

    console.log(fill)
    const onClickHandler = () => {
        //sends Book whether or not to add the book to an array.
        // onBookAdd(bookAdded)
        onBookAdd()
        //sets book added to the opposite boolean value as it was before
        // bookAdded ? setBookAdded(false) : setBookAdded(true)

        //sends Book whether or not to add the book to an array.

    }

    return (
        <div>
            {fill ?
                <IoIosAddCircle style={iconStyle}
                    size="25"
                    fill="#7c8c79"
                    onClick={onClickHandler} /> :
                <IoIosAddCircleOutline
                    style={iconStyle}
                    size="25" fill="#7c8c79"
                    onClick={onClickHandler} />
            }
        </div>
    )
}
