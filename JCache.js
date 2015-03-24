
if (typeof (JCache) == 'undefined') {
	JCache = {};
}

( function() {
   var pool={};
   JCache.get = function(element) {
		if(element==null || element.length==0) {
			return null;
		}
		var result = pool[element];
		if(!result) {
			result = $(element);
			pool[element] = result;
		}
		return result;
	};
})();


if (typeof (ElementPool) == 'undefined') {
	ElementPool = {};
}

( function() {
	ElementPool.getTotalTable = function() {
		return JCache.get("#total_list");
	};
})();
