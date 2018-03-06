$(document).ready(function(){
    		// console.log('session storage',sessionStorage.getItem('currentProduct'));
    		var currentProduct = JSON.parse(sessionStorage.getItem('currentProduct')).ecommerceProductJAXB;
    		console.log('current product',currentProduct);
    		$('.header')[0].innerText = currentProduct.name;
    		$('.description')[0].innerText = 'Description : ' + currentProduct.description;
    		$('.size')[0].innerText = 'Sizes Available : ' + currentProduct.size;
    		$('.stock')[0].innerText = 'Stock : ' + currentProduct.stock;
    		$('.color')[0].innerText = 'color : ' + currentProduct.color;
            console.log('checking web link','<a href="https://www.wooplr.com/"'+currentProduct.webLink+'>Click here  </a>to go the Product');
    		$('.weblink')[0].innerHTML = '<a href="https://www.wooplr.com'+currentProduct.webLink+'">Click here  </a>to go the Product' ;
    		$('.tag')[0].innerText = 'tag : ' + currentProduct.gender;
    		$('.categories')[0].innerText = 'The product is under : ' + currentProduct.category+' , ' + currentProduct.subCategory;
    		$('.price')[0].innerText = 'Price : ' + currentProduct.salesPrice + '/- ( '+Math.floor((1-currentProduct.salesPrice/currentProduct.retailPrice)*100)+ '% Off! )';
    		var baseUrl = 'https://res.wooplr.com/image/upload/f_auto,q_auto,fl_lossy,w_400,c_fill,ar_3:4/';
    		currentProduct.image_pid.map(function(val){
    			var image = $('<img class="mySlides"></img>');
                image.attr('src',baseUrl + val);
    			console.log('the resultant image is ',image);
    			$('.w3-content,.w3-display-container,.img')[0].append(image[0]);
    		});

    })

