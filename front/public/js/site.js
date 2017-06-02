var notebook = {
	init: function() {
		notebook.bookScreen = document.getElementById("notescreen");
		notebook.ctx = notebook.bookScreen.getContext('2d');
		notebook.img = new Image();
		notebook.img.src = '../images/ermolaev-general.png';
		notebook.img.onload = function() {
			notebook.render()
		}
	},
	render: function() {

		notebook.ctx.drawImage(notebook.img, 0, 0, $(notebook.bookScreen).width(), 1400);
		notebook.scroll()
	},
	scroll: function() {
		(function() {
			var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			window.requestAnimationFrame = requestAnimationFrame;
			var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
		})();
		var i = 1,
			top = 1;

		function scrollWay(y) {


			notebook.ctx.drawImage(notebook.img, 0, --top, $(notebook.bookScreen).width(), 1400);

			render = requestAnimationFrame(scrollWay)
			top < -885 ? cancelAnimationFrame(render) : ''

		}

		var render = requestAnimationFrame(scrollWay)

	}

}
$(document).ready(function() {
	notebook.init()
	tooltipster.action()
	

})

$(window).scroll(function(){

	$('.b-ermolaev-tooltip__tip').each(function(index,item){
		var offset = $(item).offset().top
		toTop = $(window).scrollTop() + $(window).height()
		
		if( offset < toTop){
			$(item).tooltipster('open');
		}else{
			$(item).tooltipster('close');
		}

	})
})
var tooltipster = {

	action:function(){
		var counter = 0
			$('.b-ermolaev-tooltip__tip').each(function(index,item){
					if(counter == 0){
						$(item).tooltipster({
						side:'right'
						
						});
						counter = 1
					}else{
					
						$(item).tooltipster({
						side:'left'
						});
						counter = 0
					}
					
	})
	}
}





$(document).ready(function() {
	$('.b-mobileMennu__variant').click(function(event){
		event.preventDefault()
	})
		$('.s-spoiler__title').each(function(){
			if($(this).siblings('.s-spoiler__container').children().length<1){
				$(this).addClass('b-mobileMennu__title--noflag')
			}
		})



			/*********spoiler************/
			$('.s-spoiler__title').click(function(event) {
			if($(this).siblings('.s-spoiler__container').children().length<1){

			}else{
				event.preventDefault();
				if ($(this).siblings('.s-spoiler__container').attr('data-flag') == 'true'){
					$(this).removeClass('b-mobileMennu__title--active')
					$(this).siblings('.s-spoiler__container').hide('blind', 200)
					$(this).siblings('.s-spoiler__container').attr({'data-flag':false})
				} else if( $(this).siblings('.s-spoiler__container').attr('data-flag')== 'false' || $(this).siblings('.s-spoiler__container').attr('data-flag') == undefined) {

					$('.s-spoiler__container').each(function(){
					if($(this).attr('data-flag')){
					$(this).attr({'data-flag':false})
					$(this).hide('blind', 200)
					$(this).siblings('.s-spoiler__title').removeClass('b-mobileMennu__title--active');
					}
				})
				$(this).siblings('.s-spoiler__container').attr({'data-flag':true});
				$(this).addClass('b-mobileMennu__title--active');
				$(this).siblings('.s-spoiler__container').show('blind', 200);
				}
			}
			})

			var menu = {

				current: 'none',
				filter:function(filter){
					switch (this.current){
						case 'none':
							$('body').addClass("overflow");
							$('.b-mfilter__button').parents('.b-mfilter__wrapper').removeClass('b-mfilter__wrapper--small')
							$('.b-mfilter__button').siblings('.b-mfilter').addClass('b-mfilter--open')
							$('.b-mfilter__button').parents('.b-mfilter__wrapper').addClass('b-mfilter--show')
							this.current = 'filter';
							break;
						case 'filter':
							this.current = 'none';
							$('body').removeClass("overflow");
							$('.b-mfilter__button').siblings('.b-mfilter').removeClass('b-mfilter--open');
							$('.b-mfilter__button').parents('.b-mfilter__wrapper').removeClass('b-mfilter--show')
							setTimeout(function () {
								$('.b-mfilter__button').parents('.b-mfilter__wrapper').addClass('b-mfilter__wrapper--small')
							},200)
							break;
						case 'menu':
							$('body').removeClass("overflow");
							$('.b-mobileMennu__button').removeClass('b-mobileMennu__button--active')
							$('.b-mobileMennu__button').parents('.b-mobileMennu').removeClass('b-mobileMennu--open')
							this.current = 'none';
							this.filter();
							break;
					}

				},
				menu:function(menu){
					switch (this.current){
						case 'none':
							$('body').addClass("overflow");
							$('.b-mobileMennu__button').addClass('b-mobileMennu__button--active')
							$('.b-mobileMennu__button').parents('.b-mobileMennu').addClass('b-mobileMennu--open')
							this.current = 'menu';
							break;
						case 'menu':
							$('body').removeClass("overflow");
							$('.b-mobileMennu__button').removeClass('b-mobileMennu__button--active')
							$('.b-mobileMennu__button').parents('.b-mobileMennu').removeClass('b-mobileMennu--open')

							this.current = 'none';
							break;
						case 'filter':
							$('body').removeClass("overflow");
							$('.b-mfilter__button').siblings('.b-mfilter').removeClass('b-mfilter--open');
							$('.b-mfilter__button').parents('.b-mfilter__wrapper').removeClass('b-mfilter--show')
							this.current = 'none';
							this.menu();

				}
			}}

		$('.b-mfilter__button').click(function () {
			menu.filter(this)

		})


			$('.b-mobileMennu__button').click(function() {
				menu.menu(this);
			})
			$(window).scroll(function () {

				var offtop =  $(window).scrollTop();
					if($('.b-ermolaev__content').length>0) {
						var totop = $('.b-ermolaev__content').offset().top;
					}
				if(offtop >= totop){
					$('.b-mfilter__wrapper').addClass('b-mfilter__wrapper--fixtrans')
					$('.b-mfilter__wrapper').addClass('b-mfilter__wrapper--fixed')

					$('.b-mobileMennu__button').addClass('b-mobileMennu__button--green')
				}
				else{

					$('.b-mfilter__wrapper').removeClass('b-mfilter__wrapper--fixed')
					setTimeout(function () {
						$('.b-mfilter__wrapper').removeClass('b-mfilter__wrapper--fixtrans')
					},100)
					$('.b-mobileMennu__button').removeClass('b-mobileMennu__button--green')
				}
			})
			/*****Fixed menu**********/
			$(window).scroll(function() {
				if ($('.s-leftblock__nav').length != 0) {
					var totop = $(window).scrollTop();
					var offseta = $('.s-leftblock__nav').offset().top;
					var foottotop = $('.b-footer').offset().top;
						//console.log(foottotop )
						console.log(totop)
						console.log( foottotop  - $('.b-leftblock__container').height())
					if (totop >= offseta - 30) {
						$('.s-leftblock__nav').find('.b-leftblock__container').addClass('b-leftblock__container--fixed')

					} else {
						$('.s-leftblock__nav').find('.b-leftblock__container').removeClass('b-leftblock__container--fixed')
					}
					if(totop < $('.b-ermolaev__bg').height()  - $('.b-leftblock__container').height()){
						$('.s-leftblock__nav').find('.b-leftblock__container').removeClass('b-leftblock__down')
					}else{
						$('.s-leftblock__nav').find('.b-leftblock__container').addClass('b-leftblock__down')
						
					}
				}
			})
		})
$(document).ready(function () {

	$('.b-menu__link'). mouseenter(function () {
		event.preventDefault();
		if($(this).siblings('.b-secondMenu').is(":visible")){

		}else{
			//if($(this).find('.b-secondMenu__menu').children().length)	
				if($(this).siblings('.b-secondMenu').find('.b-secondMenu__menu').children().length==0){$('.b-secondMenu--active').hide('fade').removeClass('b-secondMenu--active');}else{
			$('.b-secondMenu--active').hide('fade').removeClass('b-secondMenu--active');
			$(this).siblings('.b-secondMenu').show('fade').addClass('b-secondMenu--active');
			var $fotoramaDiv = $(this).siblings('.b-secondMenu').find('.b-secondMenu__slider').fotorama({arrows:false});
			var fotorama__sub = $fotoramaDiv.data('fotorama');
			$('.b-secondMenu__link').hover(function() {
				var item = $(this).parents('.b-secondMenu__element').index()
				 fotorama__sub.show(item);
			})
		}}

		})
	$('.b-header').mouseleave(function () {

			$('.b-secondMenu--active').hide('fade').removeClass('b-secondMenu--active');
		//fotorama__sub.destroy();

	})
})
