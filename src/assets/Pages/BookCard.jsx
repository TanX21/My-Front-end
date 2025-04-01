import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Component/Navbar';

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBJ_lsJaj7MJS9Lgyic6OJcTczDjiVJnlQ
`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setError("Failed to fetch book details.");
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    const volumeInfo = book.volumeInfo;

    return (
        <div className="container mx-auto py-20 p-20 bg-gray-300">
        
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold">{volumeInfo.title}</h1>
                <p className="text-gray-600 text-3xl">{volumeInfo.authors?.join(', ')}</p>
                <p className="text-gray-500 text-2xl">{volumeInfo.publishedDate}</p>
                
                {/* Book Image */}
                <img
                    src={volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/300x400"}
                    alt={volumeInfo.title}
                    className="w-full h-100 mb-25 object-contain mt-4"
                />
                
                {/* Book Description */}
                <div className="mt-4 text-2xl" dangerouslySetInnerHTML={{ __html: volumeInfo.description || 'No description available' }} />

                {/* Additional Book Details */}
                <div className="mt-6">
                    <h2 className="text-3xl font-semibold">Additional Details</h2>
                    <ul className="list-disc pl-5 mt-2">
                        <li><strong>Publisher:</strong> {volumeInfo.publisher || 'N/A'}</li>
                        <li><strong>Page Count:</strong> {volumeInfo.pageCount || 'N/A'}</li>
                        <li><strong>Categories:</strong> {volumeInfo.categories ? volumeInfo.categories.join(', ') : 'N/A'}</li>
                        <li><strong>Language:</strong> {volumeInfo.language || 'N/A'}</li>
                        <li><strong>Average Rating:</strong> {volumeInfo.averageRating ? `${volumeInfo.averageRating} / 5` : 'N/A'}</li>
                        <li><strong>Ratings Count:</strong> {volumeInfo.ratingsCount || 'N/A'}</li>
                    </ul>
                </div>

                {/* Preview Link */}
                {volumeInfo.previewLink && (
                    <div className="mt-6">
                        <a 
                            href={volumeInfo.previewLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 underline"
                        >
                            Preview this book
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetails;
