import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BrowseBooksPage = () => {
  const [genres] = useState([
    { name: "Fiction", color: "#4A90E2", image: "https://images.csmonitor.com/csm/2020/12/1112756_1_1209-best-2020-fiction_standard.jpg?alias=standard_900x600" },
    { name: "Fantasy", color: "#E94E77", image: "https://media.istockphoto.com/id/873507500/photo/image-of-open-antique-book-on-wooden-table-with-glitter-overlay.jpg?s=612x612&w=0&k=20&c=clB-tJl5j44IqVLlCELHVP6G-kJjeNt_nNmQi48aEKo=" },
    { name: "Science Fiction", color: "#F5A623", image: "https://www.saturdayeveningpost.com/wp-content/uploads/satevepost/2020-04-17-science-fiction-shutterstock.jpg" },
    { name: "Romance", color: "#7ED321", image: "https://media.istockphoto.com/id/2156315347/vector/romantic-couple-travel-poster.jpg?s=612x612&w=0&k=20&c=bmdZriAzMWffRwJ9E-G44LM-NqP-PMmL1TQbIqvCqxs=" },
    { name: "Mystery", color: "#9013FE", image: "https://humanitiesscholars.com/wp-content/uploads/2022/08/pexels-photo-3109168.jpeg?w=1088" },
    { name: "Biography", color: "#50E3C2", image: "https://assets.weforum.org/article/image/responsive_large_-ytU8aFc7NXOVyhZ2HjKvs2CDIRFPYxBqgtKIJd9V-s.png" },
    { name: "History", color: "#B8E986", image: "https://galaxy.firstonlineuniversity.org/info/images/courses/American%20History.jpg" },
    { name: "Technology", color: "#F8E71C", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfOcYP2JM5nfHtZJai-LkaFynJpfx57yn2iA&s" },
    { name: "Religion", color: "#D0021B", image: "https://assets.editorial.aetnd.com/uploads/2017/10/hinduism-gettyimages-526751138.jpg" }
  ]);
  
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8 mt-8">Browse Books by Genre</h1>

        {/* Genre Boxes */}
        <div className="grid grid-cols-auto md:grid-cols-3 lg:grid-cols-3 gap-8 p-8">
          {genres.map(({ name, color, image }) => (
            <Link 
              key={name} 
              to={`/genre/${name.toLowerCase().replace(/\s+/g, '-')}`} 
              className="flex items-center justify-center p-25 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-109"
              style={{
                backgroundColor: color,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px', // Optional: Add a fixed height to make sure the box is of equal size
                color: 'white', // Text color
              }}
            >
              <span className="text-3xl font-semibold">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseBooksPage;
