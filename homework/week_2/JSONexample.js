var fileName = "data.json";
var txtFile = new XMLHttpRequest();
txtFile.onreadystatechange = function() {
	if (txtFile.readyState === 4) {
		if (txtFile.status === 200) {
			exampleJSON(txtFile.responseText);
			}
		}
	}	
		
	txtFile.open("GET", fileName , true);
	txtFile.send();
	
	function exampleJSON(input, country) {
		var jsonedInput = JSON.parse(input);
		console.log(jsonedInput.USA);
		console.log(jsonedInput[country]);
	
	