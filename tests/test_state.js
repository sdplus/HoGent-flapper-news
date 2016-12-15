describe('Flapper News App', function () {
    describe('Home', function () {
        var settings = {
            url: '/'
        };

        beforeEach(function () {
            browser.get(settings.url);
        });

        it('should redirect to index to /#/home', function () {
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toBe('/home');
            });
        });


        it('Footer should contain the correct label', function () {
            expect(element(by.css('.footer')).getText()).toEqueal('Thinkster Tutorial - Flapper News');
        });

        it('h1 should contain the correct title', function () {
            expect(element(by.css('.title')).getText()).toEqual('Flapper News');
        });
    });

});