	//Notice that .closest(), prev(), next(), method in jQuery.
	//It's more convenient to do something in traverse a table
	
		$(".open_detial, .close_detial").click(function(event){
			//open the next tr
			event.stopPropagation();
			event.preventDefault();
			var that=$(this);
			
			if(that.hasClass("open_detial")){
				//Shows the next <tr>
				that.closest("tr").next().show();
				that.addClass("close_detial").removeClass("open_detial");
				that.find("a").html("Close View");
			}else{
				//Hide the next <tr>
				that.closest("tr").next().hide();
				that.addClass("open_detial").removeClass("close_detial");
				that.find("a").html("Open View");
				that.css("open_detial");
			}
		});
