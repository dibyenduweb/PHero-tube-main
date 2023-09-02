

const tubeCategory = async() =>{
const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
            const data = await response.json();

            const tubeCategory = document.getElementById('tube-container');

            data.data.forEach((category) => {
                //console.log(category);
            const div =document.createElement('div');
            div.innerHTML=`
            <a onclick="loadContent('${category.category_id}')" class="btn ml-4 hover:bg-pink-500 hover:text-white">${category.category}</a>
            `;
            tubeCategory.appendChild(div);
                
            });
        };

        const loadContent = async (categoryId) => {
        const  response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data = await response.json();
            const cardContain =document.getElementById('card-contain');
            cardContain.innerHTML = '';
            //drowning card
const errorCard = document.getElementById('error-card')

if(data.data.length === 0){
    errorCard.classList.remove('hidden')
}else{
    errorCard.classList.add('hidden')
}


        data.data.forEach((content) =>{
            //console.log(content);

            //time converter 
            let seconds = content.others.posted_date;
            const hours = Math.floor(seconds / 3600)
            const m =seconds % 3600
            const minutes = Math.floor(m / 60);

                const div=document.createElement('div');
                div.innerHTML=`
                <div  class="card bg-base-100 shadow-xl">
                <div class="relative">
                <figure><img class="h-48" src=${content.thumbnail} alt="Shoes" /></figure>
                <div class="card-body">

                <div class="avatar items-center">
                <div class="w-14 rounded-full ">
                <img src=${content.authors[0].profile_picture}/>
                </div>
                <h1 class="ml-4">${content.title}</h1>
            </div>
            
                
                <div>
                <p class="flex">${content.authors[0].profile_name}</p>
                ${content.authors[0]?.verified ? `<img src="./img/fi_10629607.svg" alt="icon">` : '' }
                <p class="absolute bg-gray-600 font-light text-white rounded px-4 bottom-48 right-3">${content.others.posted_date ? `${content.hours > 12 ? 'A while ago': `${content.hours} hours ${content.minutes} minutes ago`}` : ''}</p>
                </div>
                
                <div class="card-actions">
                <div class="badge badge-outline">${content.others.views}</div> 
                </div>
                </div>
                </div>
            </div>
                `;     
            cardContain.appendChild(div)
            });

        };

tubeCategory();
loadContent(1000);
