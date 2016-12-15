var request = require('request');
var base_url = "http://localhost:3000/";

describe("flapper news router", function() {
  it ("returns 200", function(done) {
    request.get(base_url, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("check posts.javascripts", function(done) {
    request.get(base_url + "posts", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        console.log(body);
        done();
    });
  });
});
