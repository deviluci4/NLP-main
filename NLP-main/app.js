const express = require('express');
const app = express();
const nlp = require("node-nlp");
const cors = require("cors");
const { dockStart } = require('@nlpjs/basic');
const fs = require("fs");


const csvParser = require("csv-parser");
const result1 = [];
const result2 = [];
let ran = [], arr1 = [], arr2 = [];
function commonEle(arr1, arr2) {
    return arr1.some(item => arr2.includes(item))
}
app.use(express.json())
app.use(cors());
let userInput = 'I am from Canada and I love religious place';



fs.createReadStream("./Country1.csv")
    .pipe(csvParser())
    .on("data", (data) => {
        result1.push(data);
    })
    .on("end", () => {

        fs.createReadStream("./Location5.csv")
            .pipe(csvParser())
            .on("data", (data) => {
                result2.push(data);
            })
            .on("end", () => {
                let advc = [], advh = [], advm = [], relc = [], relh = [], relm = [],raf=[],bun=[], sigc = [],ran2=[],sigh = [], sigm = [], his = [], pea = [], fin = [], cco = [], hco = [], mco = [], tre = [],mou=[],lak=[],c = 0;
                for (let i = 0; i <= 124; i++) {
                    ran.push(result2[i].Location);
                    if (result2[i].Attribute.toLowerCase().includes("adventurous") && result2[i].Attribute.toLowerCase().includes("cold")) {
                        advc.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("adventure") && result2[i].Attribute.toLowerCase().includes("hot")) {
                        advh.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("adventurous") && result2[i].Attribute.toLowerCase().includes("moderate")) {
                        advm.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("sightseing") && result2[i].Attribute.toLowerCase().includes("hot")) {
                        sigh.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("sightseeing") && result2[i].Attribute.toLowerCase().includes("cold")) {
                        sigc.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("sightseeing") && result2[i].Attribute.toLowerCase().includes("moderate")) {
                        sigm.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("religion") && result2[i].Attribute.toLowerCase().includes("hot")) {
                        relh.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("religious") && result2[i].Attribute.toLowerCase().includes("cold")) {
                        relc.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("religious") && result2[i].Attribute.toLowerCase().includes("moderate")) {
                        relm.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("historical")) {
                        his.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("peaceful")) {
                        pea.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("trekking")) {
                        tre.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("raft")) {
                        raf.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("bungee")) {
                        bun.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("mountains")) {
                        mou.push(result2[i].Location)
                    }
                    if (result2[i].Attribute.toLowerCase().includes("lakes")) {
                        lak.push(result2[i].Location)
                    }
                }
                ran.sort(() => Math.random() - 0.5);
                for(i=0;i<=8;i++){
                    ran2.push(ran[i]);
                }
                for (let i = 0; i <= 39; i++) {
                    if (result1[i].Weather.toLowerCase().includes('hot')) {
                        hco.push(result1[i].Country);
                    } else if (result1[i].Weather.toLowerCase().includes('cold')) {
                        cco.push(result1[i].Country);
                    } else {
                        mco.push(result1[i].Country);
                    }
                }

                (async () => {
                    const dock = await dockStart({ use: ['Basic'] });
                    const nlp = dock.get('nlp');
                    nlp.addLanguage('en');

                    for (let i = 0; i <= 122; i++) {
                        if (result2[i].Attribute.toLowerCase().includes("sightseeing") && commonEle(userInput.toLowerCase().split(' '), cco)) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'sightseeing cold');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("sightseing")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'sightseing hot');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("sightseeing") && commonEle(userInput.toLowerCase().split(' '), mco)) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'sightseeing moderate');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("adventurous") && commonEle(userInput.toLowerCase().split(' '), mco)) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'adventurous moderate');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("adventure")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'adventure hot');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("adventurous") && commonEle(userInput.toLowerCase().split(' '), cco)) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'adventurous cold');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("religious") && commonEle(userInput.toLowerCase().split(' '), cco)) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'religious cold');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("religion")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'religion hot');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("religious") && commonEle(userInput.toLowerCase().split(' '), mco)) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'religious moderate');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("historical")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'historical');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("peaceful")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'peaceful');

                        }
                        if (result2[i].Attribute.toLowerCase().includes("trekking")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'trekking');
                        }
                        if (result2[i].Attribute.toLowerCase().includes("bungee")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'bungee');
                        }
                        if (result2[i].Attribute.toLowerCase().includes("raft")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'raft');
                        }
                        if (result2[i].Attribute.toLowerCase().includes("mountains")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'mountains');
                        }
                        if (result2[i].Attribute.toLowerCase().includes("lakes")) {
                            nlp.addDocument('en', result2[i].Attribute.toLowerCase(), 'lakes');
                        }
                    }
                  

                    nlp.addAnswer('en', 'adventurous cold', advc);
                    nlp.addAnswer('en', 'adventure hot', advh);
                    nlp.addAnswer('en', 'adventurous moderate', advm);
                    nlp.addAnswer('en', 'religious cold', relc);
                    nlp.addAnswer('en', 'religion hot', relh);
                    nlp.addAnswer('en', 'religious moderate', relm);
                    nlp.addAnswer('en', 'sightseeing cold', sigc);
                    nlp.addAnswer('en', 'sightseing hot', sigh);
                    nlp.addAnswer('en', 'sightseeing moderate', sigm);
                    nlp.addAnswer('en', 'historical', his);
                    nlp.addAnswer('en', 'peaceful', pea);
                    nlp.addAnswer('en', 'trekking', tre);
                    nlp.addAnswer('en', 'raft', raf);
                    nlp.addAnswer('en', 'mountains', mou);
                    nlp.addAnswer('en', 'bungee', bun);
                    nlp.addAnswer('en', 'lakes', lak);
                    await nlp.train();


                    app.post("/compile", async (req, res) => {
                        const { message } = req.body; 
                        if (!message) return res.status(400).send("Error");
                        const compiledData = await nlp.process("en", message);
                        console.log(compiledData);
                        if(compiledData.answer===undefined){
                            compiledData.answer=ran2;
                        }

                        if (!compiledData || !compiledData.answer[0]) return res.status(400).send("Error Compiling");

                        let places = [];

                        for (const item of compiledData.answer) {
                            const locationDetails = result2.find(i => i.Location === item);
                            locationDetails && places.push(locationDetails);
                        }
                        res.status(200).send(places);
                    });
                })();

            });
    });

app.listen(4000, function () {
    console.log("Server running");
});
