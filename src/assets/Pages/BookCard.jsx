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
        <div className="container mx-auto py-25 px-10 bg-gray-300">

            <div className="bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-5xl font-bold font-seri">{volumeInfo.title}</h1>
                <p className="text-gray-600 font-serif text-3xl pt-2">{volumeInfo.authors?.join(', ')}</p>
                <p className="text-gray-500 text-xl ">{volumeInfo.publishedDate}</p>

                {/* Book Image */}
                <img
                    src={volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/300x400"}
                    alt={volumeInfo.title}
                    className="w-full h-100 mb-10 object-contain mt-4"
                />

                {/* Book Description */}
                <div className="mt-4 pb-4 text-xl sm:text-2xl font-sans" dangerouslySetInnerHTML={{ __html: volumeInfo.description || 'No description available' }} />

                {/* Additional Book Details */}
                <div className="mt-6">
                    <h2 className="text-3xl font-semibold">Additional Details</h2>
                    <ul className="list-disc pl-6 space-y-1.5 mt-4">
                        <li className='text-xl'><strong>Publisher :</strong> {volumeInfo.publisher || 'N/A'}</li>
                        <li className='text-xl'><strong>Page Count :</strong> {volumeInfo.pageCount || 'N/A'}</li>
                        <li className='text-xl'><strong>Categories :</strong> {volumeInfo.categories ? volumeInfo.categories.join(', ') : 'N/A'}</li>
                        <li className='text-xl'><strong>Language :</strong> {volumeInfo.language || 'N/A'}</li>
                        <li className='text-xl'><strong>Average Rating :</strong> {volumeInfo.averageRating ? `${volumeInfo.averageRating} / 5` : 'No rating available'}</li>
                        <li className='text-xl'><strong>Ratings Count :</strong> {volumeInfo.ratingsCount || 'No rating available'}</li>
                        <li className='text-xl'><strong>Dimensions:</strong> {volumeInfo.dimensions ? `${volumeInfo.dimensions.height} x ${volumeInfo.dimensions.width} x ${volumeInfo.dimensions.thickness}` : 'N/A'}</li>

                    </ul>
                </div>

                {/* Preview Link */}
                {volumeInfo.previewLink && (
                    <div className="mt-6 ml-5">
                        <a
                            href={volumeInfo.previewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline text-xl"
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
