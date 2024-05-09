"use client"
import { useEffect, useState } from 'react';
import styles from './bookcontainer.module.css';
import { getBooks } from '@api';
import BookCard from '../bookCard/BookCard';


const BookContainer = () => {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchBooks = async () => {
            const books = await getBooks();
            setBooks(books);
        }

        fetchBooks();
    },[])
    console.log(books)
    return (
        <div className={styles.bookCardContainer}>
            {books.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    )
}

export default BookContainer;
