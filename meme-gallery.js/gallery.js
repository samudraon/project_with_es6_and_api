// console.log('connected')

const loadMeme = () => {
    const URL = "https://meme-api.com/gimme/20";
    fetch(URL)
        .then(res => res.json())
        .then(data => showMeme(data.memes));
}

const showMeme = (memes) => {
    // console.log(memes);
    memes.slice(0, 10).forEach(meme => {
        // console.log(meme);
        const memeContainer = document.getElementById('section');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-full shadow-2xl glass">
            <figure><img class="w-full h-70" src="${meme.url}" alt="car!"/></figure>
        </div>
        `
        memeContainer.appendChild(div);
    });
}

loadMeme();

