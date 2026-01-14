//this accessingg data from the event images whixh are saved as 1.jpg,2.jpg likethi 
const imageCount = 10; 

const photos = Array.from({ length: imageCount }, (_, i) => 
  `/gallery/${i + 1}.jpg`
);


console.log('Total photos to load:', imageCount);
console.log('All photo paths:', photos);

export const galleryData = {
  photos: photos
};

export const getGalleryPhotos = () => galleryData.photos;
export const getFeaturedInstagram = () => galleryData.featuredInstagram;