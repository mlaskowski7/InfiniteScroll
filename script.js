
const count = 10;
const apiKey = 'rVo5go2dLnbhHweQklTFTHLyBnzq7BKJlTetel83dmE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        
    }
}


getPhotos();