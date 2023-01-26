const imageEl = document.querySelector("#image-el");


function pasteImage(id) {
  // return image_id
  readRemoteJSON(id).then((image_id) => {
    
    fetch(`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`)
      .then((response) => response.blob())
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);
        imageEl.src = imageObjectURL;
        // Resource: https://stackoverflow.com/a/50248437
      });
  });
}

function readRemoteJSON(id) {
  return fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id`
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      let image_id = data.data.image_id;
      console.log(image_id);
      return image_id;
    });
}

//https://api.artic.edu/api/v1/artwork-date-qualifiers/1

function setup() {
  pasteImage(24645); //.then((x)=> {return console.log(x)});
}
setup();
