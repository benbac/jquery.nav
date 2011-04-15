$.fn.nav = function(options){
	var container = this;

	var settings = $.extend({
		columnWidth: 140,
		columnHeight: 130
	}, options);

	container.find("> ul")
		.each(function(i,ul){
			$(ul)
				.addClass("l1")
				.find("> li")
				.each(function(j,val){
					$(val)
						.hover(
							function(){
								$(val).find("> a").addClass("hover");
								$(val).find("> ul").show();
							},
							function(){
								$(val).find("> a").removeClass("hover");
								$(val).find("> ul").hide();
							}
						)
						.addClass("l1")
						.attr("id","l1_"+j)
						.find("> a")
							.addClass("l1")
							.find("> span")
								.addClass("l1");
				});
		
				$(ul)
					.find("> li")
					.each(function(j,val){
						var startPos = $(val).position().left;
						var menuWidth = $(val).find("> ul").length * settings.columnWidth;
						var rightSide = startPos + menuWidth;

						while(rightSide > container.width()){
							startPos-=settings.columnWidth;
							rightSide = startPos + menuWidth;
						}


						if(((startPos + menuWidth) <= $(val).position().left) || (j > 0 && ($.browser.mozilla || $.browser.opera) && $(val).position().left==0)){
							startPos = container.width() - menuWidth;
						}
						var navHeight = container.find("> ul.l1 > li.l1 > a.l1").height();
						//$(".foo").append(navHeight+":"+$(val).position().top + " | ");

						$(val).find("> ul:first").addClass("first");
						$(val).find("> ul:last").addClass("last");
						
						if($(val).find("> ul").length==1){
							$(val).find("> ul").addClass("solo");
						}

						$(val)
							.find("> ul")
							.hide()
							.each(function(k,val2){
								var leftPos = startPos + (k * settings.columnWidth);
								
								$(val2)
									.addClass("l2_" + k)
									.css("position","absolute")
									.css("z-index","100")
									.css("left",leftPos)
									.css("width", settings.columnWidth)
									.css("height", settings.columnHeight)
									//.css("top",container.height()+$(val).position().top)
									.css("top",navHeight)
									.addClass("l2")
									.find("> li")
									.each(function(l,val3){
										$(val3)
											.addClass("l2")
											.attr("id","l2_"+k+"_"+l)
											.find("> a")
												.addClass("l2")
												.find("> span")
													.addClass("l2");
									});
							});
					});
		});

   return container;
};