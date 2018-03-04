console.log($);
console.log('trying to get data');
var body =JSON.stringify(eval({
	"newFilters": [], 
	"sort_by": ["relevance"]
	}));
// $.post(`https://www.wooplr.com/rest/v2/advancedlookup/productsnew/top?pageNumber=1&count=15&fromCache=true`,body,function(err,data){
// 	console.log('query posted',err,data);
// });

$.ajax(
{
	'url':`https://www.wooplr.com/rest/v2/advancedlookup/productsnew/top?pageNumber=1&count=15&fromCache=true`,
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

function renderProducts(data){
	var imageDiv = $('.product')[0];
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
		currentImgDiv.childNodes[1].attributes[1].value = 'https://res.wooplr.com/image/upload/f_auto,q_auto,fl_lossy,w_200,c_fill,ar_3:4/'+product.image_pid[0];
		// console.log('the image src',currentImgDiv.childNodes[1].attributes.src);
		// console.log('the current div',currentImgDiv.toString());
		currentImgDiv.childNodes[3].childNodes[1].innerText = product.name;
		currentImgDiv.childNodes[3].childNodes[3].innerText = product.size;
		currentImgDiv.childNodes[3].childNodes[5].innerText = product.color;
		$('#imgGrid').append(imageDiv.outerHTML);

	});

}