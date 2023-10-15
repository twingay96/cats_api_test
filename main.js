let animals = [];

const getLatestNews = async() =>{
    let url = new URL('https://api.thecatapi.com/v1/images/search?limit=5'
    // 자바스크립트에서 제공하는 URL클래스 
    );
    let header = new Headers({'x-api-key': 'live_1O6qsVatCSeX4YoNv3aCDQGg4CibVWvZg24ln4Y9OYUBIAmKkOaEftpGbIDc8p8V'});
    // 자바스크립트에서 제공하는 HEADERS클래스 
    // 서버요청은 스택자료구조에서 후순위이기 때문에 await을 해줘야함
    let response = await fetch(url,{ headers: header}) // ajax, http ,fetch => 요청을 보내는방법들
    let data = await response.json(); // 서버통신에서 사용하는  데이터 타입
    // await을 사용하려면 async 를 사용해야함 
    // console.log(response);
    animals = data
    console.log(animals);

    render()
};

const render =() =>{
    let newsHTML = ''
    newsHTML = animals.map((animals)=>{
        return `<div class="row news"> 
        <!-- 화면 사이즈가 large이면 이미지에는 4를 할당 -->
        <div class="col-lg-4">
            <img class="news-img-size"src="${animals.url
            }" alt="바키이미지">
        </div>
        <!-- 화면 사이즈가 large이면 뉴스내용에는 8를 할당 -->
        <div class="col-lg-8">
            <h2>바키 넷플릭스 오픈</h2>
            <p>바키 바키 바키 바키 세계최강생물

            </p>
            <div>
                넷플릭스 2020.12.02
            </div>
        </div>
    </div>`
    }).join('');
    // newsHTML = animals.map((animals)=> {return ..})을하게되면 배열속 ','까지 함께 전달되어서 화면에찍힘 없애기위해 .join('')
    // console.log(newsHTML);
    document.getElementById("news-board").innerHTML = newsHTML;
}
getLatestNews();