const request = require("request");
const cheerio = require("cheerio");

const args = process.argv.slice(2);
const code = args[0];

request.post(
    {
        url: "https://www.trackandtrace.lu/homepage.htm?locale=en_GB",
        form: {
            numero: code,
        },
    },
    function (err, httpResponse, body) {
        if (err) {
            console.log("Something went wrong...");
            return;
        }
        const $ = cheerio.load(body);
        const container = $(`#tr${code}`);
        const containerChildren = container.children();
        const short = $(containerChildren[0]);
        const details = $(containerChildren[1]);

        const events = short
            .children()
            .map(function (index, element) {
                const spl = $(element).text().split(":");
                return {
                    [spl[0].trim()]: spl[1].trim(),
                };
            })
            .toArray();

        const detailedEvents = details
            .children()
            .map(function (index, element) {
                if (index != 0) {
                    const detailsChildren = $(element).children();
                    return {
                        date: $(detailsChildren[0]).text().trim(),
                        hour: $(detailsChildren[1]).text().trim(),
                        place: $(detailsChildren[2]).text().trim(),
                        stage: $(detailsChildren[3]).text().trim(),
                    };
                }
            })
            .filter((e) => e)
            .toArray();

        console.log(events);
        console.log(detailedEvents);
    }
);
