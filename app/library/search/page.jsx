"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Para capturar los parámetros de consulta de la URL
import { getBooks } from '@api'; // Asegúrate de tener importado el API que devuelve la lista de libros
import BookCard from '@/app/components/library/bookCard/BookCard'; // Importa el componente BookCard
import styles from './search.module.css'; // Importa el archivo de estilos

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query'); // Obtén el término de búsqueda desde los parámetros de la URL
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            if (query) {
                const allBooks = await getBooks(); // Obtiene todos los libros usando tu API
                // Filtra los libros por el término de búsqueda
                const filtered = allBooks.filter((book) =>
                    book.title.toLowerCase().includes(query.toLowerCase()) ||
                    (book.author.name && book.author.name.toLowerCase().includes(query.toLowerCase()))
                );
                setFilteredBooks(filtered);
                setLoading(false);
            }
        };
        fetchBooks();
    }, [query]);

    return (
        <div className={styles.bookCardContainer}>
            {loading ? (
                <p>Cargando...</p>
            ) : filteredBooks.length > 0 ? (
                filteredBooks.map((book) => <BookCard key={book._id} book={book} />)
            ) : (
                <p>No se encontraron libros con el término: {query}</p>
            )}
        </div>
    );
}

export default SearchPage;