let news = [];
let menus = document.querySelectorAll(".menus button");
console.log(menus)
// 클릭한게 어떤 Topic인지 알려주는 용도로 event 넘겨줌 
menus.forEach((menu) =>menu.addEventListener("click",(event)=> getNewsByTopic(event)));

const getLatestNews = async() =>{
    let url = new URL('https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=d213fbb4de7648fa9d67242f87b3e3ca&int=10'
    // 자바스크립트에서 제공하는 URL클래스 
    );
    let header = new Headers({'x-api-key': 'd213fbb4de7648fa9d67242f87b3e3ca'});
    // 자바스크립트에서 제공하는 HEADERS클래스 
    // 서버요청은 스택자료구조에서 후순위이기 때문에 await을 해줘야함
    let response = await fetch(url,{ headers: header}) // ajax, http ,fetch => 요청을 보내는방법들
    let data = await response.json(); // 서버통신에서 사용하는  데이터 타입
    // await을 사용하려면 async 를 사용해야함 
    // console.log(response);
    news = data.articles;
    console.log(news);

    render()
};
// menu.addEventListener("click",(event)... 를통해서 받은 event는 menu에 관한 모든정보가 들어있음.
const getNewsByTopic = async(event) =>{
    // .textContent : 해당 tag안의 텍스트 내용만을 가져옴
    console.log("클릭됨",event.target.textContent);
    let topic = event.target.textContent.toLowerCase(); // 소문자로 변환 ,api document에서 category는 소문자로 받아야한다 명시함
    let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${topic}&apiKey=d213fbb4de7648fa9d67242f87b3e3ca&int=10`);
    let header = new Headers({'x-api-key': 'd213fbb4de7648fa9d67242f87b3e3ca'});
    // 자바스크립트에서 제공하는 HEADERS클래스 
    // 서버요청은 스택자료구조에서 후순위이기 때문에 await을 해줘야함
    let response = await fetch(url,{ headers: header}) // ajax, http ,fetch => 요청을 보내는방법들
    let data = await response.json(); // 서버통신에서 사용하는  데이터 타입
    // await을 사용하려면 async 를 사용해야함 
    // console.log(response);
    news = data.articles;
    console.log("selected_topic:",news);

    render()
}

const render =() =>{
    let newsHTML = ''
    newsHTML = news.map((nEws)=>{
        return `<div class="row news"> 
        <!-- 화면 사이즈가 large이면 이미지에는 4를 할당 -->
        <div class="col-lg-4">
            <img class="news-img-size"src="${nEws.urlToImage
            }" alt="news_image">
        </div>
        <!-- 화면 사이즈가 large이면 뉴스내용에는 8를 할당 -->
        <div class="col-lg-8">
            <h2>${nEws.title}</h2>
            <p>${nEws.content}

            </p>
            <div>
                작성일: ${nEws.publishedAt}
            </div>
        </div>
    </div>`
    }).join('');
    // newsHTML = news.map((news)=> {return ..})을하게되면 배열속 ','까지 함께 전달되어서 화면에찍힘 없애기위해 .join('')
    // console.log(newsHTML);
    document.getElementById("news-board").innerHTML = newsHTML;
}
getLatestNews();