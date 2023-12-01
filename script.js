const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesloaded = 0;
let totalimages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'rVo5go2dLnbhHweQklTFTHLyBnzq7BKJlTetel83dmE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imagesloaded++;
    if(imagesloaded === totalimages){
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


function displayPhotos(){
    loader.hidden = true;
    imagesloaded = 0;
    totalimages = photosArray.length;

    photosArray.forEach((photo) =>{
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target:'_blank',

        });

        const img = document.createElement('img'); 
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener('load',imageLoaded);

        item.appendChild(img)
        imageContainer.appendChild(item)
    });
}


async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        loader.hidden= false;
        const error_message = document.createElement('p');
        error_message.textContent = "The API is limited to 50 requests an hour, the limit has been exceeded";
        error_message.classList.add("error");
        document.body.appendChild(error_message);
        
    }
}


window.addEventListener('scroll', () =>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});


getPhotos();