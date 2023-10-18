let news = [];
let menus = document.querySelectorAll(".menus button");
console.log(menus)
// 클릭한게 어떤 Topic인지 알려주는 용도로 event 넘겨줌 
menus.forEach((menu) =>menu.addEventListener("click",(event)=> getNewsByTopic(event)));
let searchButton = document.getElementById("search_button");
let url // 전역변수로 선언  (getApi 호출시 사용하기위함)

const errorRender = (message) =>{
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">${message}</div>`
    document.getElementById("news-board").innerHTML = errorHTML
}

// 각 함수에서 필요한 url을 만들기
// api호출 함수를 부른다 
const getApi = async() =>{
    try{
        let header = new Headers({'x-api-key': 'd213fbb4de7648fa9d67242f87b3e3ca'});
        // 자바스크립트에서 제공하는 HEADERS클래스 
        // 서버요청은 스택자료구조에서 후순위이기 때문에 await을 해줘야함
        let response = await fetch(url,{ headers: header}) // ajax, http ,fetch => 요청을 보내는방법들
        let data = await response.json(); // 서버통신에서 사용하는  데이터 타입
        if(response.status == 200){
            console.log("받은데이터는:", data);
            if(data.total_hits == 0 ){
                throw new Error("검색된 결과값이 없습니다.");
            }
            news = data.articles;
            console.log("news:",news);
            render();
        }else{
            throw new Error(data.message);
        }
        // await을 사용하려면 async 를 사용해야함 
        // console.log(response);

    }catch(error){
        console.log("잡힌 에러는",error.message);
        errorRender(error.message);
    }

}
const getNews = async()=> {
    //1. 검색 키워드 읽어오기
    //2. url에 검색키워드 붙이기
    //3. 헤더 준비
    //4. url부르기
    //5. data가져오기
    //6. data보여주기
    let keyword = document.getElementById("search_input").value
    let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&int=10&q=${keyword}`);
    console.log("키워드:",keyword);
    getApi();
    
}
// 함수를 const 변수 처럼사용할 경우 호이스팅 개념때문에 항상 먼저 함수(getNews)를 정의한 후에 getNews를 사용해야한다.
searchButton.addEventListener("click",getNews);


const getLatestNews = async() =>{
    url = new URL('https://newsapi.org/v2/top-headlines?country=us&int=10'
    // 자바스크립트에서 제공하는 URL클래스 
    );
    console.log(news);
    getApi();

};
// menu.addEventListener("click",(event)... 를통해서 받은 event는 menu에 관한 모든정보가 들어있음.
const getNewsByTopic = async(event) =>{
    // .textContent : 해당 tag안의 텍스트 내용만을 가져옴
    console.log("클릭됨",event.target.textContent);
    let topic = event.target.textContent.toLowerCase(); // 소문자로 변환 ,api document에서 category는 소문자로 받아야한다 명시함
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${topic}&int=10`);
    console.log("selected_topic:",news);
    getApi();
}

const render =() =>{
    console.log("render함수 동작함");
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

