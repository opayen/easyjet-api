var routes = function(app) {
  app.get("/max-bookable-date", function(req, res) {
    var request = require("request");

    console.log("Received GET: " + JSON.stringify(req.query));

    if (!req.query.dest) {
      return res.send({
        "status": "error",
        "message": "missing 'dest' parameter"
      });
    } else if (!req.query.origin) {
      return res.send({
        "status": "error",
        "message": "missing origin' parameter"
      });
    }

    var d = new Date();
    var todayStr = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);

    var options = {
      method: 'GET',
      url: 'https://www.easyjet.com/ejcms/nocache/api/lowestfares/get/',
      qs: {
        destinationIata: req.query.dest,
        displayCurrencyId: '0',
        languageCode: 'en-US',
        originIata: req.query.origin,
        startDate: todayStr
      },
      headers: {
        'cache-control': 'no-cache',
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, sdch, br'
      }
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);

      var json = JSON.parse(body);

      var farthestDate = new Date();

      for (var i = 0; i < json.months.length; i++) {
        var month = json.months[i];
        for (var j = 0; j < month.days.length; j++) {
          var dayObj = month.days[j];
          var date = new Date(json.months[i].year, json.months[i].month - 1, dayObj.day);
          if (dayObj.flightStatus > 0 && date > farthestDate) {
            farthestDate = date;
          }
        }
      }

      res.send(farthestDate);
    });

  });
};

module.exports = routes;