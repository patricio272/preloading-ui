module.exports = {
	cargar: function(){
		var i;
		for(i=1;i<=70000;i++){
			console.log('i = '+i);
		}
		return parseInt(i-1);
	}
};