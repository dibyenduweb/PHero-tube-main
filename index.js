// Global variable to keep track of the sorting order
let shortByView = false;

// // Function to toggle the sorting order and reload content
// const shorting = () => {
//     console.log(shorting);
//     shortByView = !shortByView;
//     loadContent('1000');
// };

// To fetch category function
const tubeCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();

    const tubeCategory = document.getElementById('tube-container');

    const categoryElements = data.data.map((category) => {
        // console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="loadContent('${category.category_id}')" class="btn ml-4 hover:bg-pink-500 hover:text-white">${category.category}</a>
        `;
        return div;
    });

    tubeCategory.append(...categoryElements);
};

const loadContent = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const cardContain = document.getElementById('card-contain');
    cardContain.innerHTML = '';

    // Sort by order 
    if(shortByView){
        let firstSort = allVedios.sort((x,y) => {
            let sortValue = x.others.views.split('K')[0];
            let firstThousand = parseInt(sortValue.split('.')[0]) * 1000 ;
            let firstHundred = parseInt(sortValue.split('.')[1] ) * 100;
            if( !firstHundred ){
                firstHundred = 0;
                }
            let firstTotalViews = firstThousand + firstHundred;



            let sortValue2 = y.others.views.split('K')[0];
            let secondThousand = parseInt(sortValue2.split('.')[0]) * 1000 ;
            let secondHundred = parseInt(sortValue2.split('.')[1] ) * 100;
            if( !secondHundred ){
                secondHundred = 0;
                }
            let secondTotalViews = secondThousand + secondHundred;

            if( firstTotalViews > secondTotalViews ) return 1;
            else return -1;
        })
        allVedios = firstSort.reverse()
         
        sortEnd = false;
    }

    // Drowning card
    const errorCard = document.getElementById('error-card');

    if (data.data.length === 0) {
        errorCard.classList.remove('hidden');
    } else {
        errorCard.classList.add('hidden');
    }

    // Fetch data
    const cardElements = data.data.map((content) => {
        // Time converter
        let seconds = content.others.posted_date;
        const hours = Math.floor(seconds / 3600);
        const m = seconds % 3600;
        const minutes = Math.floor(m / 60);

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <div class="relative">
                    <figure><img class="h-52" src=${content.thumbnail} alt="Shoes" /></figure>
                    <div class="card-body">
                        <div class="avatar items-center">
                            <div class="w-14 rounded-full">
                                <img src=${content.authors[0].profile_picture}/>
                            </div>
                            <h1 class="ml-4">${content.title}</h1>
                        </div>
                        <div class="flex items-center ">
                            <p>${content.authors[0].profile_name}</p>
                            <p class="mr-28">${content.authors[0]?.verified ? '<img src="./img/fi_10629607.svg" alt="icon">' : '' }</p>
                            <p class="absolute bg-gray-600 font-light text-white rounded px-4 bottom-48 right-4">${content.others.posted_date ? `${hours > 12 ? 'A while ago' : `${hours} hours ${minutes} minutes ago`}` : ''}</p>
                        </div>
                        <div class="card-actions">
                            <div class="badge badge-outline">${content.others.views}</div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
        return div;
    });

    // Append all the card elements to cardContain
    cardContain.append(...cardElements);
};

tubeCategory();
loadContent('1000');
