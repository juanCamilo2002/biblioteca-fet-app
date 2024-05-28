import styles from "./Search.module.css"
import { Bcard } from "../bcard/Bcard";
import { useState, useEffect } from "react";
import { getBooks } from '@api';
const Search = () => {
  const [books, setBooks] = useState([]);

  useEffect(()=>{
      const fetchBooks = async () => {
          const books = await getBooks();
          setBooks(books);
      }

      fetchBooks();
  },[])
  
  return (
    <div className={styles.container}>
         {books.map((book) => (
                <Bcard key={book._id} book={book} />
            ))} 
     </div>
  )
}

export default Search