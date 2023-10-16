let news = [];
let menus = document.querySelectorAll(".menus button");
console.log(menus)
// 클릭한게 어떤 Topic인지 알려주는 용도로 event 넘겨줌 
menus.forEach((menu) =>menu.addEventListener("click",(event)=> getNewsByTopic(event)));
let searchButton = document.getElementById("search_button");


const getNews = async()=> {
    //1. 검색 키워드 읽어오기
    //2. url에 검색키워드 붙이기
    //3. 헤더 준비
    //4. url부르기
    //5. data가져오기
    //6. data보여주기
    let keyword = document.getElementById("search_input").value
    console.log("키워드:",keyword);
    let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=d213fbb4de7648fa9d67242f87b3e3ca&int=10&q=${keyword}`);
    let header = new Headers({'x-api-key': 'd213fbb4de7648fa9d67242f87b3e3ca'});
    let response = await fetch(url,{ headers: header})
    let data = await response.json();
    news = data.articles;
    render()
}
// 함수를 const 변수 처럼사용할 경우 호이스팅 개념때문에 항상 먼저 함수(getNews)를 정의한 후에 getNews를 사용해야한다.
searchButton.addEventListener("click",getNews);


const getLatestNews = async() =>{
    let url = new URL('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d213fbb4de7648fa9d67242f87b3e3ca&int=10'
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
    let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=d213fbb4de7648fa9d67242f87b3e3ca&int=10`);
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

