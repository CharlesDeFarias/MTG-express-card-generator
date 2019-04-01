let thumbUp = document.getElementsByClassName("fa-thumbs-up"),
thumbDown = document.getElementByClassName('fa-thumbs-down'),
trash = document.getElementsByClassName("fa-trash");
save = document.getElementsByClassName("cardSave");
cardPic = document.getElementById('cardImg'),
name = document.getElementById('name'),
type = document.getElementById('type_line'),
oracle = document.getElementById('oracle'),
flavor = document.getElementById('flavor');

document.getElementById('cardGen').addEventListener('click', card)

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText,
        text = this.parentNode.parentNode.childNodes[3].innerText,
        power = this.parentNode.parentNode.childNodes[5].innerText,
        toughness = this.parentNode.parentNode.childNodes[7].innerText
        thumbUp = parseFloat(this.parentNode.parentNode.childNodes[9].innerText);
        thumbDown = parseFloat(this.parentNode.parentNode.childNodes[11].innerText);
        console.log(name, text, power, toughness, thumbUp, thumbDown)
        fetch('cards', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
        'text': text,
        'power': power,
        'toughness': toughness,
        'thumbUp': thumbUp,
        'thumbDown': thumbDown,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText,
        msg = this.parentNode.parentNode.childNodes[3].innerText,
        thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText);
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbDown':thumbDown
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

function card(){
  fetch(`https://api.scryfall.com/cards/random`)
  .then(res=>res.json())
  .then(response =>{
    console.log(response)
    cardPic.src = response.image_uris.normal;
    name.innerText= response.name;
    type.innerText= response.type_line;
    oracle.innerText= response.oracle_text;
    flavor.innerText= response.flavor_text;
  })
}
