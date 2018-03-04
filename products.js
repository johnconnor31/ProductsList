console.log($);
console.log('trying to get data');
var body =JSON.stringify(eval({
	"newFilters": [], 
	"sort_by": ["relevance"]
	}));
var imageDiv;
// $.post(`https://www.wooplr.com/rest/v2/advancedlookup/productsnew/top?pageNumber=1&count=15&fromCache=true`,body,function(err,data){
// 	console.log('query posted',err,data);
// });
function gridChange(){
	// console.log('trigger on change to' ,$('#gridSize').val());
	if($('#gridSize').val() == 3)
	document.styleSheets[0].cssRules[1].style.setProperty('width','33%');
	else
	document.styleSheets[0].cssRules[1].style.setProperty('width','20%');
	}
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
				renderProducts(data)
			},
			'data': body
		}
		);
}

function renderProducts(data){
	imageDiv = $('.product')[0];
	$('#imgGrid')[0].innerHTML=null;
	// console.log('image div',imageDiv);
	// console.log(data[0].ecommerceProductJAXB);
	var listOfProducts = data.slice(0,15);
	// console.log(listOfProducts);
	listOfProducts.map(function(val,i){
		console.log(val,i);
		var currentImgDiv = $.extend(true,{},imageDiv);
		console.log('current image div',currentImgDiv);
		var product = val.ecommerceProductJAXB;
		console.log('the values in product',product.name,product.size,product.color,product.image_pid);
		currentImgDiv.childNodes[1].src = 'https://res.wooplr.com/image/upload/f_auto,q_auto,fl_lossy,w_200,c_fill,ar_3:4/'+product.image_pid[0];
		currentImgDiv.childNodes[1].alt = 'https://res.wooplr.com/image/upload/f_auto,q_auto,fl_lossy,w_200,c_fill,ar_3:4/'+product.image_pid[2];
		// console.log('the image src',currentImgDiv.childNodes[1].attributes.src);
		// console.log('the current div',currentImgDiv.toString());
		currentImgDiv.childNodes[3].childNodes[3].innerText = product.name;
		currentImgDiv.childNodes[3].childNodes[7].innerText = 'sizes available :'+product.size;
		currentImgDiv.childNodes[3].childNodes[9].innerText = 'color :' +product.color;
		$('#imgGrid').append(imageDiv.outerHTML);

	});

	$('#imgGrid img').hover(sourceSwap,sourceSwap);
}

var currentPage=1;
$(document).ready(function(){
	$('.pagination a').on('click',function(){
		console.log('page number cick',$(this));
		var nextPage = parseInt($(this)[0].innerText);
		getListOfProducts(nextPage);
		$('.pagination a')[currentPage].className='';
		$('.pagination a')[nextPage].className='active';
		currentPage = nextPage;
	});
	getListOfProducts(1);
});

function sourceSwap() {
    var $this = $(this)[0];
    // console.log('hovering',$(this));

    var newSource = $this.alt;
    $this.alt = $this.src;
    $this.src = newSource;
}