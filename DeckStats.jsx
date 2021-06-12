//-------------------------------------- Rarity ----------------------------------------//

const common = ' 26000000 26000001 26000002 26000005 26000008 26000010 26000013 26000019 26000022 26000024 26000030 26000031 26000041 26000043 26000047 26000049 26000053 26000056 26000064 27000000 27000002 27000006 28000001 28000008 28000017 28000018 26000080 26000084 '
const rare = ' 26000003 26000011 26000014 26000017 26000018 26000021 26000028 26000036 26000038 26000039 26000040 26000052 26000057 26000059 26000067 26000068 27000001 27000003 27000004 27000005 27000007 27000009 27000010 27000012 28000000 28000003 28000014 28000016 '
const epic = ' 26000004 26000006 26000007 26000009 26000012 26000015 26000016 26000020 26000025 26000027 26000034 26000044 26000045 26000054 26000058 26000060 26000063 27000008 28000002 28000004 28000005 28000006 28000007 28000009 28000009 28000012 28000013 28000015 26000085 27000013 '
const legendary = ' 26000023 26000026 26000029 26000032 26000033 26000035 26000037 26000042 26000046 26000048 26000050 26000051 26000055 26000061 26000062 28000010 28000011 26000083 '

//-------------------------------------- Elixir ----------------------------------------//

const one = ' 26000010 26000030 28000006 28000016 26000084 '
const two = ' 26000002 26000019 26000031 26000038 26000049 26000058 28000002 28000008 28000011 28000015 28000017 '
const three = ' 26000000 26000001 26000005 26000012 26000013 26000023 26000025 26000026 26000032 26000039 26000040 26000041 26000046 26000050 26000056 26000061 26000064 26000067 27000000 27000009 28000001 28000004 28000012 28000013 28000014 28000018 '
const four = ' 26000011 26000014 26000015 26000018 26000021 26000027 26000035 26000036 26000037 26000042 26000044 26000048 26000052 26000057 26000062 26000068 27000002 27000004 27000006 27000010 27000012 28000000 28000005 28000009 26000080 26000083 27000013 '
const five = ' 26000003 26000006 26000007 26000008 26000016 26000017 26000022 26000034 26000045 26000051 26000053 26000054 26000059 26000063 27000001 27000003 28000010 '
const six = ' 26000020 26000024 26000033 26000043 26000060 27000007 27000008 28000003 28000007 '
const seven = ' 26000004 26000029 26000047 27000005 26000055 '
const eight = ' 26000009 26000085 '
const nine = ' 26000028 '

//------------------------------------ User Inputs -------------------------------------//

const numDecks = prompt('Number of Decks:','');
var fileName = "da";

var deckLink = new Array();
var deckName = new Array();
var versatility = new Array();
var easeOfUse = new Array();
var defense = new Array();
var offense = new Array();

for (j = 0; j < numDecks; j++) {
    deckLink.push(prompt('Deck Link:','')); 
    deckName.push(prompt('Deck Name:',''));
    versatility.push(prompt('Versatility(0-5):',''));
    easeOfUse.push(prompt('Ease of Use(0-5):',''));
    defense.push(prompt('Defense(0-5):',''));
    offense.push(prompt('Offense(0-5):',''));
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
    var rarities = new Array(0, 0, 0);
    for (i = 0; i <= 7; i++) {
        // Average Elixir
        if (one.indexOf(cards[i]) > 0) score++;
        else if (two.indexOf(cards[i]) > 0) score += 2;
        else if (three.indexOf(cards[i]) > 0) score += 3;
        else if (four.indexOf(cards[i]) > 0) score += 4;
        else if (five.indexOf(cards[i]) > 0) score += 5;
        else if (six.indexOf(cards[i]) > 0) score += 6;
        else if (seven.indexOf(cards[i]) > 0) score += 7;
        else if (eight.indexOf(cards[i]) > 0) score += 8;
        else if (nine.indexOf(cards[i]) > 0) score += 9;

        // Rarities
        if (common.indexOf(cards[i]) > 0) rarities[0]++;
        else if (rare.indexOf(cards[i]) > 0) rarities[1]++;
        else if (epic.indexOf(cards[i]) > 0) rarities[2]++;
    }
    var f2p = (5*rarities[0]/8) + (rarities[1]/2) + (rarities[2]/4)

    /*----------------------------------- Updating Text ------------------------------------*/

    // Title
    app.activeDocument.layerSets.getByName('title').layers[0].textItem.contents = deckName[j];

    // Average Elixir Cost
    app.activeDocument.layerSets.getByName('cost').layers[0].textItem.contents = (score/8+0.001).toFixed(1);

    //----------------------------------- Deck Pentagon ------------------------------------//

    // Opening pentagon folder
    var pentagon = app.activeDocument.layerSets.getByName('pentagon');

    // Clearing previous pentagon
    if (pentagon.layers.length > 0) pentagon.layers[0].remove();

    // Drawing shape
    var docCoef = app.activeDocument.resolution / 72;
    DrawShape([(1444-(255.6*f2p/5))/docCoef, (568-(80.6*f2p/5))/docCoef], [1444/docCoef, (568-(268*versatility[j]/5))/docCoef], [(1444+(255.6*easeOfUse[j]/5))/docCoef, (568-(80.6*easeOfUse[j]/5))/docCoef], [(1444+(157.53*defense[j]/5))/docCoef, (568+(216.8*defense[j]/5))/docCoef], [(1444-(157.53*offense[j]/5))/docCoef, (568+(216.8*offense[j]/5))/docCoef]);

    // Moving to pentagon folder
    app.activeDocument.activeLayer.move(pentagon, ElementPlacement.INSIDE);

    //---------------------------------- Card Placement ------------------------------------//

    // Opening cards and deck folders
    var cardFolder = app.activeDocument.layerSets.getByName('cards');

    // Replacing deck folder
    app.activeDocument.layerSets.getByName('deck').remove();
    var deck = app.activeDocument.layerSets.add();
    deck.name = "deck";

    // Copying cards
    for (i = 0; i <= 7; i++) {
        cardFolder.layers.getByName(cards[i]).duplicate(deck, ElementPlacement.INSIDE);
    }

    // Moving Cards
    MoveLayerTo(deck.layers[7], 46.5, 364);
    MoveLayerTo(deck.layers[6], 279.5, 364);
    MoveLayerTo(deck.layers[5], 512.5, 364);
    MoveLayerTo(deck.layers[4], 745.5, 364);
    MoveLayerTo(deck.layers[3], 46.5, 659);
    MoveLayerTo(deck.layers[2], 279.5, 659);
    MoveLayerTo(deck.layers[1], 512.5, 659);
    MoveLayerTo(deck.layers[0], 745.5, 659);

    //------------------------------------ Export PNG --------------------------------------//

    var doc = app.activeDocument;  
    var filePath = activeDocument.fullName.path;  
    var pngFile = File("D:/DeckSprites/" + fileName);
    pngSaveOptions = new PNGSaveOptions();
    doc.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);

    // Updating new filename
    fileName = fileName.substring(0, 1) + String.fromCharCode(fileName.charCodeAt(fileName.length - 1) + 1);

}

//------------------------------------- Functions --------------------------------------//

function DrawShape() {
    
    var doc = app.activeDocument;
    var y = arguments.length;
    var i = 0;
    
    var lineArray = [];
    for (i = 0; i < y; i++) {
        lineArray[i] = new PathPointInfo;
        lineArray[i].kind = PointKind.CORNERPOINT;
        lineArray[i].anchor = arguments[i];
        lineArray[i].leftDirection = lineArray[i].anchor;
        lineArray[i].rightDirection = lineArray[i].anchor;
    }

    var lineSubPathArray = new SubPathInfo();
    lineSubPathArray.closed = true;
    lineSubPathArray.operation = ShapeOperation.SHAPEADD;
    lineSubPathArray.entireSubPath = lineArray;
    var myPathItem = doc.pathItems.add("myPath", [lineSubPathArray]);
    

    var desc88 = new ActionDescriptor();
    var ref60 = new ActionReference();
    ref60.putClass(stringIDToTypeID("contentLayer"));
    desc88.putReference(charIDToTypeID("null"), ref60);
    var desc89 = new ActionDescriptor();
    var desc90 = new ActionDescriptor();
    var desc91 = new ActionDescriptor();
    desc91.putDouble(charIDToTypeID("Rd  "), 255.000000); // R
    desc91.putDouble(charIDToTypeID("Grn "), 0.000000); // G
    desc91.putDouble(charIDToTypeID("Bl  "), 0.000000); // B
    var id481 = charIDToTypeID("RGBC");
    desc90.putObject(charIDToTypeID("Clr "), id481, desc91);
    desc89.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), desc90);
    desc88.putObject(charIDToTypeID("Usng"), stringIDToTypeID("contentLayer"), desc89);
    executeAction(charIDToTypeID("Mk  "), desc88, DialogModes.NO);
    
    myPathItem.remove();
}

function transferEffects(layer1, layer2) {
    app.activeDocument.activeLayer = layer1;
    try {
        var id157 = charIDToTypeID("CpFX");
        executeAction(id157, undefined, DialogModes.ALL);
        app.activeDocument.activeLayer = layer2;
        var id158 = charIDToTypeID("PaFX");
        executeAction(id158, undefined, DialogModes.ALL);
    } catch (e) {
        alert("the layer has no effects");
        app.activeDocument.activeLayer = layer2;
    }
}

function MoveLayerTo(fLayer,fX,fY) {

  var Position = fLayer.bounds;
  Position[0] = fX - Position[0];
  Position[1] = fY - Position[1];

  fLayer.translate(-Position[0],-Position[1]);
}