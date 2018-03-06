console.log($);
console.log('trying to get data');
var body =JSON.stringify(eval({
	"newFilters": [], 
	"sort_by": ["relevance"]
	}));
var currentPage=sessionStorage.getItem('currentPage')?sessionStorage.getItem('currentPage'):1;
var imageDiv;
var listOfProducts;
// $.post(`https://www.wooplr.com/rest/v2/advancedlookup/productsnew/top?pageNumber=1&count=15&fromCache=true`,body,function(err,data){
// 	console.log('query posted',err,data);
// });
$(document).ready(function(){
	getListOfProducts(currentPage);
	$('.pagination a')[currentPage].className='active';
});

function getListOfProducts(pageNumber){
	console.log('getting page number',pageNumber);
		$.ajax(
		{
			'url':`https://www.wooplr.com/rest/v2/advancedlookup/productsnew/top?pageNumber=${pageNumber}&count=15&fromCache=true`,
			'headers': { 
		        'Content-Type': 'application/json' 
		    },
			'type':'post',
			'success':function(data){
				console.log(data);
				renderProducts(data);
			},
			'data': body
		}
		);
}

function renderProducts(data){
	imageDiv = $('.product')[0];
	$('#imgGrid')[0].innerHTML=null;
	console.log('cleared image grid',$('#imgGrid')[0],$('.product')[0]);
	// console.log('image div',imageDiv);
	// console.log(data[0].ecommerceProductJAXB);
	listOfProducts = data.slice(0,15);
	// console.log(listOfProducts);
	listOfProducts.map(function(val,i){
		console.log(val,i);
		var currentImgDiv = $.extend(true,{},imageDiv);
		// console.log('current image div',currentImgDiv);
		var product = val.ecommerceProductJAXB;
		// console.log('the values in product',product.name,product.size,product.color,product.image_pid);
		// currentImgDiv.id = i;
		console.log('current div',currentImgDiv);
		currentImgDiv.childNodes[1].src = 'https://res.wooplr.com/image/upload/f_auto,q_auto,fl_lossy,w_200,c_fill,ar_3:4/'+product.image_pid[0];
		currentImgDiv.childNodes[1].alt = 'https://res.wooplr.com/image/upload/f_auto,q_auto,fl_lossy,w_200,c_fill,ar_3:4/'+product.image_pid[2];
		currentImgDiv.childNodes[1].id = i;
		// console.log('the image src',currentImgDiv.childNodes[1].attributes.src);
		// console.log('the current div',currentImgDiv.toString());
		currentImgDiv.childNodes[3].childNodes[3].innerText = product.name;
		currentImgDiv.childNodes[3].childNodes[7].innerText = 'sizes available :'+product.size;
		currentImgDiv.childNodes[3].childNodes[9].innerText = 'color :' +product.color;
		console.log('the outer html is',imageDiv);
		$('#imgGrid').append(imageDiv.outerHTML);

	});
	$('.pagination a').on('click',function(){
		console.log('page number cick',$(this));
		var nextPage = parseInt($(this)[0].innerText);
		getListOfProducts(nextPage);
		$('.pagination a')[currentPage].className='';
		$('.pagination a')[nextPage].className='active';
		currentPage = nextPage;
	});
	$('#imgGrid img').hover(sourceSwap,sourceSwap);
	$('.product .image').on('click',function(){
		// console.log('clicked on image',$(this)[0].id);
		sessionStorage.setItem('currentProduct',JSON.stringify(listOfProducts[$(this)[0].id]));
		sessionStorage.setItem('currentPage',currentPage);
		window.location.href = 'product.html';
	});
	$('#gridSize').on('change',function(){
		gridChange();
	});
}
function sourceSwap() {
    var $this = $(this)[0];
    // console.log('hovering',$(this));

    var newSource = $this.alt;
    $this.alt = $this.src;
    $this.src = newSource;
}

function gridChange(){
	// console.log('trigger on change to' ,$('#gridSize').val());
	if($('#gridSize').val() == 3)
	$('.product').css('width','33%')
	else
	$('.product').css('width','20%')
	}