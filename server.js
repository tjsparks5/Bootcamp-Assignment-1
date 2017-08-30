var http = require('http'), 
	fs = require('fs'), 
	url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
	var parsedUrl = url.parse(request.url);
	var method = request.method;	// Store the method of the request

	if(method == 'GET' && parsedUrl.pathname == '/listings') {		// Check if method was GET and path was /listings
		response.writeHead(200, {'Content-Type': 'text/plain'});	// Sending status code 200 and setting content-type to text
		response.write(listingData);	// Outputting the listing data
		response.end();					// End of reponse
	}
	else {
		response.writeHead(404);			// Sending 404 if other pathname or method
		response.end('Bad gateway error');	// Displaying the message for incorrect path or method
	}
};

fs.readFile('listings.json', 'utf8', function(err, data) {
	if(err) throw err;	// Error handling
	listingData = data;	// Set listingData equal to data in the JSON file
   
	server = http.createServer(requestHandler);	// Create the server
	server.listen(port, function() {			// Start the server
		console.log('Server listening on: http://localhost:' + port);	//  and display message in console that server is listening
	});
});
