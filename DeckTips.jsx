//-------------------------------------- Rarity ----------------------------------------//

var common = ' 26000000 26000001 26000002 26000005 26000008 26000010 26000013 26000019 26000022 26000024 26000030 26000031 26000041 26000043 26000047 26000049 26000053 26000056 26000064 27000000 27000002 27000006 28000001 28000008 28000017 28000018 26000080 26000084 '
var rare = ' 26000003 26000011 26000014 26000017 26000018 26000021 26000028 26000036 26000038 26000039 26000040 26000052 26000057 26000059 26000067 26000068 27000001 27000003 27000004 27000005 27000007 27000009 27000010 27000012 28000000 28000003 28000014 28000016 '
var epic = ' 26000004 26000006 26000007 26000009 26000012 26000015 26000016 26000020 26000025 26000027 26000034 26000044 26000045 26000054 26000058 26000060 26000063 27000008 28000002 28000004 28000005 28000006 28000007 28000009 28000009 28000012 28000013 28000015 26000085 '
var legendary = ' 26000023 26000026 26000029 26000032 26000033 26000035 26000037 26000042 26000046 26000048 26000050 26000051 26000055 26000061 26000062 28000010 28000011 26000083 '

//-------------------------------------- Elixir ----------------------------------------//

var one = ' 26000010 26000030 28000006 28000016 26000084 '
var two = ' 26000002 26000019 26000031 26000038 26000049 26000058 28000002 28000008 28000011 28000015 28000017 '
var three = ' 26000000 26000001 26000005 26000012 26000013 26000023 26000025 26000026 26000032 26000039 26000040 26000041 26000046 26000050 26000056 26000061 26000064 26000067 27000000 27000009 28000001 28000004 28000012 28000013 28000014 28000018 '
var four = ' 26000011 26000014 26000015 26000018 26000021 26000027 26000035 26000036 26000037 26000042 26000044 26000048 26000052 26000057 26000062 26000068 27000002 27000004 27000006 27000010 27000012 28000000 28000005 28000009 26000080 26000083 '
var five = ' 26000003 26000006 26000007 26000008 26000016 26000017 26000022 26000034 26000045 26000051 26000053 26000054 26000059 26000063 27000001 27000003 28000010 '
var six = ' 26000020 26000024 26000033 26000043 26000060 27000007 27000008 28000003 28000007 '
var seven = ' 26000004 26000029 26000047 27000005 26000055 '
var eight = ' 26000009 26000085 '
var nine = ' 26000028 '

//------------------------------------ User Inputs -------------------------------------//

const numDecks = prompt('Number of Decks:','');
var fileName = "dat";

var deckLink = new Array();
var style = new Array();

for (j = 0; j < numDecks; j++) {
    deckLink.push(prompt('Deck Link:','')); 
    style.push(prompt('Playstyle:',''));
}

for (j = 0; j < numDecks; j++) {

    /*--------------------------------- Parsing Deck Link ----------------------------------*/

    // Removing beginning of deck link
    deckLink[j] = deckLink[j].substring(deckLink[j].indexOf('=') + 1, deckLink[j].length);

    // Removing end of deck link (if it exists)
    if (deckLink[j].indexOf('=') >= 0) {
        deckLink[j] = deckLink[j].substring(0, deckLink[j].indexOf('=') - 3);
    }

    // Isolating each card ID
    var cards = deckLink[j].split(";");

    // Card Stats
    var score = 0;
    var costs = new Array();
    for (i = 0; i <= 7; i++) {
        // Average Elixir
        if (one.indexOf(cards[i]) > 0) {
            score++;
            costs.push(1);
        } else if (two.indexOf(cards[i]) > 0) {
            score += 2;
            costs.push(2);
        } else if (three.indexOf(cards[i]) > 0) {
            score += 3;
            costs.push(3);
        } else if (four.indexOf(cards[i]) > 0) {
            score += 4;
            costs.push(4);
        } else if (five.indexOf(cards[i]) > 0) {
            score += 5;
            costs.push(5);
        } else if (six.indexOf(cards[i]) > 0) {
            score += 6;
            costs.push(6);
        } else if (seven.indexOf(cards[i]) > 0) {
            score += 7;
            costs.push(7);
        } else if (eight.indexOf(cards[i]) > 0) {
            score += 8;
            costs.push(8);
        } else if (nine.indexOf(cards[i]) > 0) {
            score += 9;
            costs.push(9);
        } 
    }

    //---------------------------------------- Text -----------------------------------------//

    // Updating average elixir
    app.activeDocument.layerSets.getByName('text').layers.getByName('avgElixirCost').textItem.contents = (score/8+0.001).toFixed(1);

    // Updating playstyle
    app.activeDocument.layerSets.getByName('text').layers.getByName('playstyle').textItem.contents = style[j];

    //----------------------------------- Fastest Cycle ------------------------------------//

    // Identifying 4 cheapest cards
    var cheapestFour = costs.slice().sort().slice(0,4);
    var cheapestID = new Array();

    // Filling array with 4 cheapest card ID's
    for (var i = 0; i < 4; ++i) {
        var ind = costs.toString().indexOf(cheapestFour[i])/2;
        cheapestID.push(cards[ind]);
        costs[ind] = 0;
    }

    // Opening card folder
    var card = app.activeDocument.layerSets.getByName('cards');

    // Replacing fastestCycle folder
    app.activeDocument.layerSets.getByName('fastestCycle').remove();
    var fastestCycle = app.activeDocument.layerSets.add();
    fastestCycle.name = "fastestCycle";

    // Placing the 4 cheapest cards
    var cycleCost = 0;
    for (var i = 0; i < 4; ++i) {
        
        cycleCost += cheapestFour[i];

        card.layers.getByName(cheapestID[i]).duplicate(fastestCycle, ElementPlacement.INSIDE);

        fastestCycle.layers[0].resize(40, 40, AnchorPosition.MIDDLECENTER);
        MoveLayerTo(fastestCycle.layers[0], 1431 + (60 * i), 570);

    }

    // Fastest cycle text
    app.activeDocument.layerSets.getByName('text').layers.getByName('cycleElixir').textItem.contents = cycleCost;

    //---------------------------------- Card Placement ------------------------------------//

    // Replacing deck folder
    app.activeDocument.layerSets.getByName('deck').remove();
    var deck = app.activeDocument.layerSets.add();
    deck.name = "deck";

    for (var i = 0; i < 4; ++i) {
        
        card.layers.getByName(cards[i].substring(0,8)).duplicate(deck, ElementPlacement.INSIDE);
        MoveLayerTo(deck.layers[0], 1183 + (132 * i), 132.5);

    }
    for (var i = 4; i < 8; ++i) {
        
        card.layers.getByName(cards[i].substring(0,8)).duplicate(deck, ElementPlacement.INSIDE);
        MoveLayerTo(deck.layers[0], 1183 + (132 * (i-4)), 292.5);

    }

    // //--------------------------------------- Tips -----------------------------------------//

    // var tip = app.activeDocument.layerSets.getByName('tip');

    // tip.layers.getByName('tips').visible = false;

    //tips.textItem.contents = cheap;
    //tips.textItem.size = 8.8;

    //------------------------------------ Export PNG --------------------------------------//

    var doc = app.activeDocument;  
    var filePath = activeDocument.fullName.path;  
    var pngFile = File("D:/DeckSprites/" + fileName);
    pngSaveOptions = new PNGSaveOptions();
    doc.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);

    // Updating new filename
    fileName = fileName.substring(0, 1) + String.fromCharCode(fileName.charCodeAt(1) + 1) + fileName.substring(2, 3);

}

//------------------------------------- Functions --------------------------------------//

function MoveLayerTo(fLayer,fX,fY) {

  var Position = fLayer.bounds;
  Position[0] = fX - Position[0];
  Position[1] = fY - Position[1];

  fLayer.translate(-Position[0],-Position[1]);
}

