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

$(window).scroll(function() {

	$('.b-ermolaev-tooltip__tip').each(function(index, item) {
		var offset = $(item).offset().top
		toTop = $(window).scrollTop() + $(window).height()

		if (offset < toTop) {
			$(item).tooltipster('open');
		} else {
			$(item).tooltipster('close');
		}

	})
})
var tooltipster = {

	action: function() {
		var counter = 0
		$('.b-ermolaev-tooltip__tip').each(function(index, item) {
			if (counter == 0) {
				$(item).tooltipster({
					side: 'right'

				});
				counter = 1
			} else {

				$(item).tooltipster({
					side: 'left'
				});
				counter = 0
			}

		})
	}
}



$(document).ready(function() {
	$('.b-mobileMennu__variant').click(function(event) {
		event.preventDefault()
	})
	$('.s-spoiler__title').each(function() {
		if ($(this).siblings('.s-spoiler__container').children().length < 1) {
			$(this).addClass('b-mobileMennu__title--noflag')
		}
	})



	/*********spoiler************/
	$('.s-spoiler__title').click(function(event) {
		if ($(this).siblings('.s-spoiler__container').children().length < 1) {

		} else {
			event.preventDefault();
			if ($(this).siblings('.s-spoiler__container').attr('data-flag') == 'true') {
				$(this).removeClass('b-mobileMennu__title--active')
				$(this).siblings('.s-spoiler__container').hide('blind', 200)
				$(this).siblings('.s-spoiler__container').attr({
					'data-flag': false
				})
			} else if ($(this).siblings('.s-spoiler__container').attr('data-flag') == 'false' || $(this).siblings('.s-spoiler__container').attr('data-flag') == undefined) {

				$('.s-spoiler__container').each(function() {
					if ($(this).attr('data-flag')) {
						$(this).attr({
							'data-flag': false
						})
						$(this).hide('blind', 200)
						$(this).siblings('.s-spoiler__title').removeClass('b-mobileMennu__title--active');
					}
				})
				$(this).siblings('.s-spoiler__container').attr({
					'data-flag': true
				});
				$(this).addClass('b-mobileMennu__title--active');
				$(this).siblings('.s-spoiler__container').show('blind', 200);
			}
		}
	})

	var menu = {

		current: 'none',
		filter: function(filter) {
			switch (this.current) {
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
					setTimeout(function() {
						$('.b-mfilter__button').parents('.b-mfilter__wrapper').addClass('b-mfilter__wrapper--small')
					}, 200)
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
		menu: function(menu) {
			switch (this.current) {
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
		}
	}

	$('.b-mfilter__button').click(function() {
		menu.filter(this)

	})


	$('.b-mobileMennu__button').click(function() {
		menu.menu(this);
	})
	$(window).scroll(function() {

			var offtop = $(window).scrollTop();
			if ($('.b-ermolaev__content').length > 0) {
				var totop = $('.b-ermolaev__content').offset().top;
			}
			if (offtop >= totop) {
				$('.b-mfilter__wrapper').addClass('b-mfilter__wrapper--fixtrans')
				$('.b-mfilter__wrapper').addClass('b-mfilter__wrapper--fixed')

				$('.b-mobileMennu__button').addClass('b-mobileMennu__button--green')
			} else {

				$('.b-mfilter__wrapper').removeClass('b-mfilter__wrapper--fixed')
				setTimeout(function() {
					$('.b-mfilter__wrapper').removeClass('b-mfilter__wrapper--fixtrans')
				}, 100)
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
			
		
			if (totop >= offseta - 30) {
				$('.s-leftblock__nav').find('.b-leftblock__container').addClass('b-leftblock__container--fixed')

			} else {
				$('.s-leftblock__nav').find('.b-leftblock__container').removeClass('b-leftblock__container--fixed')
			}
			if (totop < $('.b-ermolaev__bg').height() - $('.b-leftblock__container').height()) {
				$('.s-leftblock__nav').find('.b-leftblock__container').removeClass('b-leftblock__down')
			} else {
				$('.s-leftblock__nav').find('.b-leftblock__container').addClass('b-leftblock__down')

			}
		}
	})
})
$(document).ready(function() {
	$('.b-brewery-dot').tooltipster({
		animation: 'fade',
		delay: 200,
		theme: 'borderless',
		trigger: 'click'
	});

	$('.b-ermolaev-header a ').on('click', function() {
		event.preventDefault()
	})
	$('.b-menu__link').mouseenter(function() {
		event.preventDefault();
		if ($(this).siblings('.b-secondMenu').is(":visible")) {

		} else {
			//if($(this).find('.b-secondMenu__menu').children().length)	
			if ($(this).siblings('.b-secondMenu').find('.b-secondMenu__menu').children().length == 0) {
				$('.b-secondMenu--active').hide('fade').removeClass('b-secondMenu--active');
			} else {
				$('.b-secondMenu--active').hide('fade').removeClass('b-secondMenu--active');
				$(this).siblings('.b-secondMenu').show('fade').addClass('b-secondMenu--active');
				var $fotoramaDiv = $(this).siblings('.b-secondMenu').find('.b-secondMenu__slider').fotorama({
					arrows: false
				});
				var fotorama__sub = $fotoramaDiv.data('fotorama');
				$('.b-secondMenu__link').hover(function() {
					var item = $(this).parents('.b-secondMenu__element').index()
					fotorama__sub.show(item);
				})
			}
		}

	})
	$('.b-header').mouseleave(function() {

		$('.b-secondMenu--active').hide('fade').removeClass('b-secondMenu--active');
		//fotorama__sub.destroy();

	})
})


//$('body').prepend('<canvas id="b-preloader" width="100%" height="100%" class="b-preload"></canvas>')


//var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
$('html').css({
	opacity: 1
})



$(document).ready(function() {
	var canvas = document.getElementById('b-preloader');
	var ctx = canvas.getContext('2d');
	var AgeConfirm = 0;
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



	var beercup_0 = new Image();
	beercup_0.src = 'data:image/png;base64,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'
	beercup_0.width = 75;
	beercup_0.height = 92;
	var beercup_1 = new Image();
	beercup_1.src = 'data:image/png;base64,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'
	beercup_1.width = 75;
	beercup_1.height = 92;
	var beercup_2 = new Image();
	beercup_2.src = 'data:image/png;base64,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'
	beercup_2.width = 75;
	beercup_2.height = 92;
	var beercup_3 = new Image();
	beercup_3.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABcCAYAAAAmnUjJAAAVBklEQVR42uVcB3xO5xu92hrVUmpvqnZJbTGCas0YsYIQCYooKrYW1aKqqjWK1h5FldKKGWpWI7FnSYhVe+9R+vzPe77b+7v3y5fmy/gy/E9/p2made+5z/u8z3qvJiIJzSJgL3AmuA4MBbeCy8BRYAMwLailNCbkL2sFHhbncA+cDub9fxMrC3hQHODR30/k0q0bcuPeHfkH/0SD/v8vYnmJHXafOiY9F3wtZYf7S+Ye9eVF/xqStnMtyd2nqdT/qq9MDP5Jbt6/I3ZYC774PIvVXEy4eve2VPm8h2j184tWM4todfOKVg///V4eG+vlE+2dHKJ54GvtKsqIlXPFDiFgN3ApuAMMAzeB80GvlCxWNTFh+f4dorV2E61WNtHalBPt3dwQrYCkgUXlCfSSrL0bi9a+smh1conWoKBozUqIVjWDVBrRRa7RypzCI3ASmDUlifUCeEJ0LAzbDGt5XbQmRcBitB6vKcNl85975fq926Lw9NlTOXfjiizeuZHLU6uZVbQWb/FjJl93OXv7upjxj+I/+Hf06J5SxOojOkJPHxfN803RvErSYjL7VpPgY/skJny1YZlojSGuVwlYYS6pNrid7D53Ur5YtUCqjeou+fs2lxy9PKXIwDb0c99u/FnuPLwvdphgd13pwEr6kvUGG4OlwZeSSqzXwduioyyWGJeWZ2HJ7lddLtKSnEMYNoJULctg+b5NseHT6NuwhJW/40eydnabJfpUli/X/Sh2GKsLEsRl6hC83hWgZ2KJVVZ36MbV/rJzg81htylP6wo+uFNii6+D5olWPbNo/h4Qo5KyMgiWV1J1cJfUXd+VVO3V/8tD/6c1KSpalVek2cQhEg+EgYVdJZY/eEMcwOvLPsqqyB6zPpe4otzgtqIV12hFdcb3k5X7fpezNy7L7Qf35NTVi7Js9xapMrKbzcpauVGw1hMGih34vVM3rZA+iyZK97njpP/ib2XGlpVy8sp5cYBBCS1WD4kGR86dEK1labAMd7Ydx/dLXBF59YJ0gtg/wvn/FyZuWMrlScGqvSZjfpljC1nu3JJ3xgWK1vwtPLic2JGzgtn4EQJzI6nwWVc5cPaE2OHbhBIrL/hYdKw5ECJdZn8htb/oJR5je0uu7nVtYrUoLdk+aCiPnjyWxMCnS7+zLX3vsvIKQpQmU4ZJti616dd4Pe/ltll7w0IUCuLRH/Jj3Xwy4OfpYoc+CSFWO9ExY/tq0SqmE63G67wAXmyz4qJ18qCvKjOwtSQauGzbcSdFYEsRIJzaYLhBNIV4c39fI8t2bZHZ21ZJ2+mjlGXxurkK3F+Vhthd7fBWXMXKoe8u34uOL5fPFK2wpkTiE+OTavym7QkW06TR5x9IYmIuRFBWovlWxQOrSWsqEFBPQs8cF0e4ePuGNIBAamlS2MrpZeiP34oJ6+Mi1mhxgL+fPpUPF04Uvxmj5de92yU08qisOxQqQ2HSnWaNkcgrFyTRQH95kjeNjIDpVCG4hLtI2GPC0CVTKDKWK1fE/jPhYkKV2Ig1SlIC6NBvShqVLrln4NLbceKIOIu6owJUGMK4rdW4QIs7dFasbOB9Y9mtXij9YKZ3Hz2Q5Iru88bRJYxaOU9ig42HQlVKxswhQ8eqcuvuLdER7KxYzUTHnO1rRHPT6KN6zPlSkimYNz55+rfEEqyvZUcaxQC3aTEJYWpGHHdWrBGio+Pkj+EIs9OZd/v+M3ke4Ta0o7JKcuWercY+AKZ2RqwfDC833F8lxFzXC3ask+cRJYf4iNboDXIVNiwdF5xJuDUmoTpKDW6nFOe6Dj4cJs8b7qJykTmgnlqC9Fuh4UY1/E9nl6HhJauO6KKsipyH4O45Ax08/VXzUpIeVZLrd27GKtbSuG3q6DD5I+WvGPEGIL153uA3ZZhR+vH42FdMGOesWF6iY2bwUlU/Z40pHSLks9cuyvOCeSryb4S0qG15irXcmrjXdVas7OBDVskeP5KsHaup3IvRcfmB3vIAJeGUjsmbVjCPhBGwYeLxUXsx4UQs0x1jR2T9SM+j6OxfRlGu709TZe3BnSxzHDl/Sg79ddLl3H36mFxGXucAiLGesn518soFfrTn2euX5Qr80XKEBm7D/VmBhUXRANLivo6jLGRCh9iK5WaJ/YPmo8j2KsKIQnSGKIEwpOCTaVeBf9jVZGXDpxJEi5ogNxjf31b77+DOhDoKsTrI+vlJPHgWDTOjIhtx7ZKY8GtcSzQBYsKqA39I9g+b2Mq61TPZmgu+7mx14WYoHMsfLUsnGPn7Wrnxb7AEU+4lCZg63FoRvXSOQsFVUAT8HEMBisuQoCSvjfSvwc+xQli+uYbepgnnwazxqWd9apdYyHpst4GLJ0s2ZPesCXWupW6GJs0LaVYi4ehVihYMwdTfYRmo80xrMeT4hTMU0sYKDC4hGsXhdTUpxqopfp6rIiuKk4f/ihQ7HAJfSYhKqS/4TOywGpaGGIVP8kV/D8Rha+UQyiVbj+1LKLL1v+nPPZI3sJm6UYr1/uyxYkaEsiyfyupBsUwza+sqOYultRc/exjXc/ziWakworO6Vjr1jjOiFFTGJHTDIpOeMxqxQ1jkUbVMeAM1RgeIC8EbZDwUvVgsz7zRv5U4wnAULFmcfCcn63AO4qkMepGzMJg+vmJFcfw7wg9yqeAiWIt3JTrN/Dwmsdi8eBOhjSOMCZpv1ODbWwsC18EnDsafVuv1+OzxEauc2MB2PBwob6Ae69guA60hZrHySeEBjuv/Y1cvVBsTQ4bmyEpiiTnga3ERq7LYQEePHYg34PnNwGQt1oT1SyiU1rosx51+QAVlD+K2jUd2GQw+HCqbju7B7/tLHOABWCm2YlU3Qon9O9SWTdP2mjQkWYs15bflXKZsaHiX5c6NVUGnb7CxPsjiXU7y9WshAxF4X7t3S+zwXmzEqm2MFe3eqrZpiuU9ZXhyFkt1oikWA1O/Gkoc/j6KZjCfMRag7os1/bYVZFHYJku/BizmrFj1RMePoRtVDMQdpv13nyZrseaiPM5Ojl91xl/5MR9WZVR3Ne5ksCLKUaWG+koafw9WWhASKeHY7Z5hLU/tdFYsT7GB655PwrYdJ2uxFoYE03pw8wwvnv3HrNcDFA8mItFO16YcLQyi0So3YEMzwRfUnJ0ZVR1eY9Sx65yxyVqsn0I3qVVAwWqOca4JfOrmVQzWVVW+jZtDKUT+Jqx3Rizjar7b/IsaB6JYH8wfn6zF+mXPNmUlXAmVPu0iJuzQ46nR4DB9IO6y6PhN7fiehY3RgOUhwWbfVS0msXyMmtCGZcasQ5+FE5O1WKv3/6FGDGhdbw/ziynVSQMapQ3PcYHKIjmFEzB9pJjQy5n5LGL82sVUW6udQwb8OCXR0p1udv3LE5f/UjkhxXpjgON0J/hQmAoLKFYpa6FvQky+eXHIBvxcAf5+D4wqmfBVTGIZ3/3F6gXKqljb+njZ9+JK+CNFsdXKczH1MePYRVYdWKcqjNlTR9gC54zUjPW4ooPaiAlTo7nPPCBLwtvDD6hyD5dwaavQM2MSy/COI3+dq8SiZX2CRNUEDpR1hQX448YC5n0VW/Jn2077RI5eOC0KA+ETMY/A3azMxx2sMdTmX1GfeoNLpdJHPuII248fYNUCdSz7ZHt6NPeZ89+ccUfEIVY0KJb1b89wejJ56M8zVNhAjl45L8okIOe3qmbk0okt+RCKajIJCbDCql2bKRaqnhSsPhL3NXC+Q5ZNZ0SOOhbjof7RdKBCTx5VtTeKmi/QYn1zornPXHTiFIsFA1pumaG+FqFjEmuAMYT50zQKhZtjomoC61p6BZVRcxzIndZzHJ8N4Y4lwNK2Xw1lIVz+FNansnrqTL3Cbd0nzo0+No0d7T19XAWj3BFzfdiEY1M6fnClWB+LjsBFk5RY9CXfIFE1Y5/t4pguxFksn0rcwYKw7Ss8wM2X+6STTbC6eRD/FFeicXovDcrbm7DUADY3LAPA/H98eGx9ZevZiIGnjiUuFMsYGkFs9TXFQsDGIf6oZl+ajjfOYnXy4O6VE3XzW48eyr+YhJCl5JD2kgVBYsH+LeV9BMTXccrsX1RDaFC0l6e19MxNoAKtL1NAPU4+61juSrGMvAZbuBKLqcD3CFDN+D38IJ0irSOuYlGwmvz9hXHzEWhpxYSWEwZzLLzWmJ5iRiSWJcILipWh27s8wqcjyJVijTO285mjVZzFXWjWtlX2WzWXCf0JbzxegqkLpb/xwe4agbjKjHsYshsNn/kyvhcbA1MwD7vK7Zlrl1QnimKl61Lb3H9c60qxvhEdPqg0UKyo40icuGF9qH2VeIplLEn6HDh1dmpyIZ4qD/9VeFBbecG3KkViDufvQT9WdWR3MePCzWvqnCPFegnfcx55n46NrhTLCNVbTxlGseBXWK4hTHPynCPoQLESjn7V6Xt0584Hwo3E9jV+RHjAcosJ7EbDopRYDD9Oc9cktrpSLGPKvunEwcZA/s9o8ZvAKWbeTAd33kAikg+pHOpTJtBHvdr1XYoF38UUSccOV4o1V3Q0HN9PiUVfEoTzNWYs3bWZFpcEYlGQ0rwp+6G1+uprDGeOoTGrY5crxTKiz5pjeqqdiiWMdXYnwBaFbKAvSwKxuDRLDPGJUtDL2rMRrxU1dgbNOva7UqylYgO7vCxdNC7K7ogJPALCr/kmulhMh4pY+4eM2BG5qyXKUYA9HC4hDrtSrBWWwVWeby7OVrvlt7BBwCMiiS0Wd8VCCFbtwNOwcP4MlneePGIULVwplhFQFejXQv1xZvN/IDM3Y6qt9ZQUYvHh5Q30Ejuw2qA15MgUqxA6TrhSrPW6WTPHosNsWYZzDybwXQ1Ig5JCLI5C5erdJEpTotigtkosivnbkd2i47QrxWIT7SEc5us9uLswztlnPSQk49YsYoKdNGKV5IO0P3FRyuY2uEyDUd7R8Rf4oqvE2g4iEb2PHOs9ioUz0VHmnT4Pms+ANXGFItUy45tJ7j9+KCYw9sIOzd0yCN10HZfBtK4SayfI9zOkf/8dllBQWWDcYsaIFbOZgiSBWByDyohBu9t2rzKoMboH80bsiOym67gGpo+uUhpfsbjYL+ElFak71eRTQkpjf0ibNXnmcYkvFne7V7rWYdnGBL4PAgVFLsUlob+ZX1uQ0cF95gafxreszPMa5zD9m6pjdZtYHaty0s6MQUumJqFYZVQeyHzQBI4a6fMNSPzXiw5lfq87uM8Slvp9U1vDogwbFs6L9aftNQAXGJ1DLJXNM6snjCrqxKRbhq3c7CsLRIfvRyo/ypBmNs5563gczcBaN9Ex//e1SmD+XB3rhOPYmMSKECD80lm97FtEzTuxm2OC6lBDrCRx8NydU/lVp/Wb0W3ul6oTxZBmOjpCOp5xyUUd2DPqzrVHdVdLlydN+lgbIt1jEusMyIMC2AUp1stw9Dfv3xUT2Mpikp0UYnmXZZoVaT0IwHd40dqjlsFXKwPSmxebQSNAWwHfhuWnDINLeO2ebeblWz4msejJ95+J4BOEWNx57j584KjdnjRitSnHmwtHW9+MvosnGz2Dr/EOm5iwBaXx1Er4FqVoke7WfPPnmAZDUoO07V2Rf6otmmJl+aCBPHjySMxoN2U4LypJxGpbgYIdRkeHMLXuYO30P6jympNsRR4d/vvZM/rjQGxQtCivEqrtz3hynzWWbBKTWOk53QuERBxW2ynFytG7cZRoucM3A7nGeaIhccVSVsWbPGp3bGXY8hmq/W/4tazo8uTt68VqBMhZ+8y9PNUGwY2AnSk69nyyApVfE9Y4M8yWUY9LWGXAdkrF8/ZpFuVFYLPUW0XKv0Tr0uc1DfJzK5mCWFncxmakg5MXJR2S1l4pnRR6v45YwHGDOXQNbNL6ujM4hRh03gZ5areo2vn4prjXkKWEWkW/ZJ5cjuktkQyLNxzZpX4pi2mF+rWUqOBIEssiBfq24EvC3hzgDbZWY0GsABQCC+JnQfU9/N58gV4kHgCZ+8OmZM7eTUi8cIxE7kfiaAmZpUcDyYRKaNoutdhLDDlxOOos/KoFFAvdIloPrI9WaBykYge9grzUuSZmuN5HMWApT+eboD5xc3YANyf4WG9I0EpQUuagfgK+coB89s8zRfiQpySWOYmWPPnoiY0PnzxWZCX03qOH9J3RYfy6xbR0WKp6cNzRI6+eN47oHTgXIUfPn+Yb3xxAmVc2J0e7rWM4v+zdrsyY9awSQ9pJ8odRY2P40BmvgXESd8Gh4AuONHGq/v5T2Caub5DJZfKHYVkUizNeVpwFT4F3wBBwGtjCWpFwXqzFYgJGjNQuQbHKDveTeIKts4F4kc6ooHkyOoH51bpF/JjTttPxmt3xZjcrmMa9nBCnwgaYXoHJATWtGZ0jdxB3vHEjPgjGERCtRmbOVyFodAFzcLbLOBvpV507bUFsHAetsdiC+IpV0HzWsOU3A0Qr+wJ3Di7DIpp4f00tHYHOGWkGX9Zae0wvttynYcacMB9rqZCGp2N5Yy6gIVxt/XPvtxkHZvKpKOetp1nrxUesT4zse2sQLQDBGmOh8hjtGbR0GrP76DBLDekW0ow5Lq3Sy5KqVjYc8LaWdGZvW02n23fxJOm3eLKryDpbT0xWv9axqlqSLCO5D7ZsUEviI9bvRuvrwyZq2dFJBtBBxowtEQcZuDJyblRIWQ+HZJ9J0mLjwZ1MYxBX8SFuOhBiKTPHQSz+0BUmziePGEd8MSvA2XNncfj8KVYm8ZoAlnM57pMMUBO1Kb5NAJb+GV60aELJuIiV+9+i/a9hPM6hAlFG4M8B+No9WBX9WBfrQS2PuIhlFO1Xwyr0vInpCHPBlA11KsR4/XBX60Gt6nEQi1ErZ3MiUJ7gHDlzqpKyDYl0SkfhQC+V+nAZTuAIuYE34urg1xtrfKivehLMB6ugy/F3yrUuvmqTbTFvWwh04HS4pZ0fV7F6GSekju5m8cxWTi4qGVEXckPcVGpIew6JpAS6IdzJH+hFd4KNioGwnb+aEB+xXgONQKqfqiBWSEtnzz/4Hl8/nlLIsMe49vKppWLUvLZ0fNOdZvanQnMg5qL/agm2Lpty2Irvy0HdqzZfTGtXrxoR/9ww6kte1YQKB/HDUIvfezo8xXB35DHZeyac4+B2mJvQrzjvIs8nRrrq5flZwEH6SPRJMBI8kYIYqdet/tBPseYHtbjyf0kYKybNyXewAAAAAElFTkSuQmCC'
	beercup_3.width = 75;
	beercup_3.height = 92;
	var beercup_4 = new Image();
	beercup_4.src = 'data:image/png;base64,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';
	beercup_4.width = 75;
	beercup_4.height = 93;
	var logo = new Image();
	var click = 0;
	logo.src = "images/logo.png";

	logo.onload = function() {
		ctx.drawImage(logo, center_x - 190 / 2, center_y - 393 / 2, 195, 75);
	}
	beercup_0.onload = function() {
		ctx.drawImage(beercup_0, center_x - 75 / 2, center_y - 93 / 2, 75, 93)

	}
var beer = {
		index1: 0,
		count: 0,
		clicker:0,
		svg: function() {
			GlobalDraw = requestAnimationFrame(beer.svg);
			beer.clicker= ++beer.clicker
		
			if (beer.clicker <= 100 && beer.clicker > 0) {
	
					ctx.drawImage(beercup_1, center_x - 75 / 2, center_y - 93 / 2, 75, 93);
					this.count = this.index1
					this.index1 = 1
				
			}
			if (beer.clicker <= 200 && beer.clicker > 100) {
				this.count = 1;
			

					ctx.drawImage(beercup_2, center_x - 75 / 2, center_y - 93 / 2, 75, 93);
					this.count = this.index1
					this.index1 = 2
				
			}
			if (beer.clicker <= 300 && beer.clicker > 200) {
				this.count = 2;
				
					//	console.log(this.index)
					ctx.drawImage(beercup_3, center_x - 75 / 2, center_y - 93 / 2, 75, 93);
					this.count = this.index1
					this.index1 = 3;
				
			}
			if (beer.clicker >= 300 ) {
				this.count = 3
				if (this.index1 < 3) {
					this.index1 = 3;
				}
			
					ctx.drawImage(beercup_4, center_x - 75 / 2, center_y - 93 / 2, 75, 93);
					this.count = this.index1
					this.index1 = ++this.index1
						///console.log(GlobalDraw)
					window.cancelAnimationFrame(GlobalDraw);
					GlobalExit = requestAnimationFrame(circle.exit);


				
			}


		}
	}


	var circle = {
		radius: 75,
		circle: function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			
			ctx.arc(center_x, center_y, circle.radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		},
		draw: function() {
			beer.clicker = 0;
			beer.index1 = 0;
			beer.count = 0;
			//circle.radius = 75;
			center_x = canvas.width / 2
			center_y = canvas.height / 2
	
			ctx.beginPath();
			ctx.arc(center_x, center_y, circle.radius, 0, Math.PI * 2);
			ctx.fillStyle = '#005f3b';
			ctx.closePath();
			ctx.fill();
			beercup_0.onload = function() {
				circle.cup();
			}

			GlobalDraw = requestAnimationFrame(beer.svg);
			//	beer.svg();
		},
		exit: function() {
			GlobalExit = requestAnimationFrame(circle.exit);
			
				$('.b-disclamer__wrapper').addClass('b-disclamer__wrapper--flex')
				setTimeout(function() {
					$('.b-disclamer__wrapper').addClass('b-disclamer__wrapper--show')
				}, 200)
			

			circle.radius = circle.radius + 15;
			circle.circle();

			circle.bigger();
			ctx.drawImage(beercup_4, center_x - 75 / 2, center_y - 93 / 2, 75, 93);
			if (AgeConfirm == 1) {
				//Globalenter = requestAnimationFrame(circle.enter);

			}


		},
		reexit: function() {
			GlobalreExit = requestAnimationFrame(circle.reexit);
			if (AgeConfirm == 0) {
				$('.b-disclamer__wrapper').removeClass('b-disclamer__wrapper--flex')
				setTimeout(function() {
					$('.b-disclamer__wrapper').removeClass('b-disclamer__wrapper--show')
				}, 200)
			}	
			//console.log(circle.radius)
			circle.radius = circle.radius - 15;
			circle.circle();
			circle.smaller();
			ctx.drawImage(beercup_4, center_x - 75 / 2, center_y - 93 / 2, 75, 93);
			if (AgeConfirm == 1) {
		//		Globalreenter = requestAnimationFrame(circle.reenter);

			}


		},
		bigger: function() {

			delta = center_x - center_y;

			if (delta < 0) {
				if (circle.radius > 700) {

					window.cancelAnimationFrame(GlobalExit);
					window.cancelAnimationFrame(GlobalDraw);
				}
			}
			if (delta > 0) {

				if (circle.radius > 300) {
					window.cancelAnimationFrame(GlobalExit);
					window.cancelAnimationFrame(GlobalDraw);

				}

			}
		},
		smaller: function() {

			delta = center_x - center_y;

			if (delta < 0) {
				if (circle.radius < 100) {

					window.cancelAnimationFrame(GlobalreExit);
					window.cancelAnimationFrame(GlobalDraw);
					circle.draw()
				}
			}
			if (delta > 0) {

				if (circle.radius < 100) {

					window.cancelAnimationFrame(GlobalreExit);
					window.cancelAnimationFrame(GlobalDraw);
					circle.draw()
				}

			}
		},
		enter: function() {
			Globalenter = requestAnimationFrame(circle.enter);
			circle.radius = circle.radius + 15;
			circle.circle();

			window.cancelAnimationFrame(GlobalExit);


			//$('#b-preloader').hide('fade', 500);
			setTimeout(function() {
				window.cancelAnimationFrame(Globalenter)

			}, 2000)

		},
		reenter: function() {
			Globalreenter = requestAnimationFrame(circle.reenter);
			//circle.radius = circle.radius - 15;
			//circle.circle();

			window.cancelAnimationFrame(GlobalreExit);


			//$('#b-preloader').hide('fade', 500);
			setTimeout(function() {
				window.cancelAnimationFrame(Globalreenter)

			}, 2000)

		},
		cup: function() {
			ctx.drawImage(beercup_0, center_x - 75 / 2, center_y - 93 / 2, 75, 93)
		}


	}







	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;
	
	circle.draw()
	$('.b-disclamer__button--yea').click(function() {
		AgeConfirm = 1;
		//Globalenter = requestAnimationFrame(circle.enter);
		$('.b-disclamer__wrapper').removeClass('b-disclamer__wrapper--show')
		//$('.b-disclamer__wrapper').show('fade', 100);
		//circle.draw()
	GlobalreExit = requestAnimationFrame(circle.reexit);

	})

	
});
$(window).resize(function() {
//	canvas.width = window.innerWidth;
//	canvas.height = window.innerHeight;
	center_x = canvas.width / 2;
	center_y = canvas.height / 2;
	ctx.beginPath();
	ctx.arc(center_x, center_y, circle.radius, 0, Math.PI * 2);
	ctx.fillStyle = '#005f3b';
	ctx.closePath();
	ctx.fill();
	ctx.drawImage(logo, center_x - 190 / 2, center_y - 393 / 2, 195, 75);
	if (beer.count == 1) {
		ctx.drawImage(beercup_1, center_x - 75 / 2, center_y - 93 / 2, 75, 93)
	}
	if (beer.count == 2) {
		ctx.drawImage(beercup_2, center_x - 75 / 2, center_y - 93 / 2, 75, 93)
	}
	if (beer.count == 3) {
		ctx.drawImage(beercup_3, center_x - 75 / 2, center_y - 93 / 2, 75, 93)
	}
	if (beer.count == 4) {
		ctx.drawImage(beercup_4, center_x - 75 / 2, center_y - 93 / 2, 75, 93)
	}

});