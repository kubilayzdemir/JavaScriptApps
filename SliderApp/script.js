var models = [
    {
        name  : 'Yıldız Technical University',
        image : 'img/ytu.jpg',
        link  : 'https://www.yildiz.edu.tr/en'
    },
    {
        name  : 'Istanbul Technical University',
        image : 'img/itu.png',
        link  : 'http://global.itu.edu.tr/'
    },
    {
        name  : 'Middle East Technical University',
        image : 'img/metu.png',
        link  : 'https://www.metu.edu.tr/'
    }
];

var slideCount = models.length;
let index = 0;

var settings = {
    duration : '5000', // 5 seconds
    random   : false  // or true
};

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseenter',function(){
        clearInterval(interval);
    });
})

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseleave',function(){
        init(settings);
    })
})

function init(settings){
    var control;
    interval = setInterval(function(){
        control = index;
        if (settings.random) { // random slide
            do{
            index = Math.floor(Math.random() * slideCount);
            }while(index == control)
            
        }else{ // slide++
            if (index>=slideCount-1) {
                index = -1;
            }
            index++;
            showSlide(index)
            console.log(index)
             
        }
    },settings.duration)

};

showSlide(0);
init(settings);

document.querySelector('.fa-arrow-alt-circle-left').addEventListener('click',function(){
    index--;
    if (index<0) {
        index=slideCount-1;
    }
    console.log(index);
    showSlide(index);
});

document.querySelector('.fa-arrow-circle-right').addEventListener('click',function(){
    index++;
    if (index>slideCount-1) {
        index=0;
    }
    console.log(index);   
    showSlide(index); 
})

function showSlide (index){
    document.querySelector('.card-title').textContent= models[index].name
    document.querySelector('.card-img-top').setAttribute('src',models[index].image);
    document.querySelector('.btn-primary').setAttribute('href',models[index].link)
}

