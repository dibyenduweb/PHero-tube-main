let sortEnd = false;
let allVedios;

// ক্যাটাগোরি ডেটা পেতে
const categoryData = async () => {
    const respoons = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await respoons.json();
    const fullData = data.data;
    handleCategory(fullData)
}

// ক্যাটাগোরি কন্টেন্ট ব্যবহার করে
const handleCategory = (categoryItem) => {
    const categoryContainer = document.getElementById('tab-container')
    
    categoryItem.map((categoryAll) => {
        const {category_id, category} = categoryAll;
       
        const div = document.createElement('div')
        div.innerHTML = `
        <a onclick="cardDataFetch('${category_id}')"  class="tab rounded font-semibold text-black active:tab-active active:bg-rose-500 active:text-white  bg-gray-200">${category}</a> 
        `
        categoryContainer.appendChild(div)
    })
}
 
// কার্ড ডেটা পেতে
const cardDataFetch = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const allData = data.data;
    allVedios = allData;
    cardHandelar();
}

const cardHandelar = () => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''

    const emptyCard = document.getElementById('empty-card')
    if(allVedios.length === 0){
        emptyCard.classList.remove('hidden')
    }else{
        emptyCard.classList.add('hidden')
    }
    
    if(sortEnd){
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

    allVedios.map(mainData => {
        const {thumbnail, title, authors, others} = mainData;
        
        // সেকেন্ড এর মিনিট সহ ঘন্টা কনভার্ট করা
        let seconds = others.posted_date;
        const hours = Math.floor(seconds / 3600)
        const m = seconds % 3600
        const minutes= Math.floor(m / 60)

        const div = document.createElement('div')
        div.innerHTML = `
        <div class=" card-compact border-b-4 rounded-b-lg border-green-50">
       <div class="relative">
       <figure><img class="rounded-md w-[360px] h-[180px]"  src="${thumbnail}" alt="Shoes" /></figure>
       <p class="absolute bg-gray-800 font-light text-white rounded px-3 bottom-3 right-3">${others.posted_date ? `${hours > 12 ? 'একটু আগে':  `${hours} ঘণ্টা ${minutes} মিনিট আগে`}` : ''}</p>
       </div>
        
        <div class="p-3">
         <div class="flex gap-4">
         <img class="w-12 h-12 rounded-full" src="${authors[0].profile_picture}" alt="" />
          <h2 class="card-title text-xl font-semibold">${title}</h2>
         </div>
           <div>
            <div class="flex gap-3 items-center ml-16 ">
            <p class="text-[16px] ">${authors[0].profile_name}</p>
            <p>${authors[0].verified ? '<img src="./img/verified.svg" alt=""></img>' : ''}</p>
            </div>
           <p class="ml-16 mt-2">${others.views}  দেখা হয়েছে</p>
           </div>
           
        </div>
      </div>
        `
        cardContainer.appendChild(div)
    })
}

const sortHandler =  () =>{
    sortEnd = true;
    cardHandelar()
}

cardDataFetch('1000')
categoryData()
