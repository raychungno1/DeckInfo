//-------------------------------------- Rarity ----------------------------------------//

var common = ' 26000000 26000001 26000002 26000005 26000008 26000010 26000013 26000019 26000022 26000024 26000030 26000031 26000041 26000043 26000047 26000049 26000053 26000056 26000064 27000000 27000002 27000006 28000001 28000008 28000017 28000018 26000080 26000084 '
var rare = ' 26000003 26000011 26000014 26000017 26000018 26000021 26000028 26000036 26000038 26000039 26000040 26000052 26000057 26000059 26000067 26000068 27000001 27000003 27000004 27000005 27000007 27000009 27000010 27000012 28000000 28000003 28000014 28000016 '
var epic = ' 26000004 26000006 26000007 26000009 26000012 26000015 26000016 26000020 26000025 26000027 26000034 26000044 26000045 26000054 26000058 26000060 26000063 27000008 28000002 28000004 28000005 28000006 28000007 28000009 28000009 28000012 28000013 28000015 26000085 27000013 '
var legendary = ' 26000023 26000026 26000029 26000032 26000033 26000035 26000037 26000042 26000046 26000048 26000050 26000051 26000055 26000061 26000062 28000010 28000011 26000083 '

//-------------------------------------- Elixir ----------------------------------------//

var one = ' 26000010 26000030 28000006 28000016 26000084 '
var two = ' 26000002 26000019 26000031 26000038 26000049 26000058 28000002 28000008 28000011 28000015 28000017 '
var three = ' 26000000 26000001 26000005 26000012 26000013 26000023 26000025 26000026 26000032 26000039 26000040 26000041 26000046 26000050 26000056 26000061 26000064 26000067 27000000 27000009 28000001 28000004 28000012 28000013 28000014 28000018 '
var four = ' 26000011 26000014 26000015 26000018 26000021 26000027 26000035 26000036 26000037 26000042 26000044 26000048 26000052 26000057 26000062 26000068 27000002 27000004 27000006 27000010 27000012 28000000 28000005 28000009 26000080 26000083 27000013 '
var five = ' 26000003 26000006 26000007 26000008 26000016 26000017 26000022 26000034 26000045 26000051 26000053 26000054 26000059 26000063 27000001 27000003 28000010 '
var six = ' 26000020 26000024 26000033 26000043 26000060 27000007 27000008 28000003 28000007 '
var seven = ' 26000004 26000029 26000047 27000005 26000055 '
var eight = ' 26000009 26000085 '
var nine = ' 26000028 '

//------------------------------------ User Inputs -------------------------------------//

const numDecks = prompt('Number of Decks:','');
var fileName = "da0";

var deckLinkBlue = new Array();

var deckLinkRed = new Array();

for (j = 0; j < numDecks; j++) {
    deckLinkBlue.push(prompt('Match ' + (j+1) + ' - Blue Deck Link:',''));  
    deckLinkRed.push(prompt('Match ' + (j+1) + ' - Red Deck Link:',''));  
}

for (j = 0; j < numDecks; j++) {

	//-------------------------------- Average Elixir Cost ---------------------------------//

	// Removing beginning of deck link
	deckLinkBlue[j] = deckLinkBlue[j].substring(deckLinkBlue[j].indexOf('=') + 1, deckLinkBlue[j].length);
	deckLinkRed[j] = deckLinkRed[j].substring(deckLinkRed[j].indexOf('=') + 1, deckLinkRed[j].length);

	// Removing end of deck link (if it exists)
	if (deckLinkBlue[j].indexOf('=') >= 0) deckLinkBlue[j] = deckLinkBlue[j].substring(0, deckLinkBlue[j].indexOf('=') - 3);
	if (deckLinkRed[j].indexOf('=') >= 0) deckLinkRed[j] = deckLinkRed[j].substring(0, deckLinkRed[j].indexOf('=') - 3);

	// Isolating each card ID
	var blueCards = deckLinkBlue[j].split(";");
	var redCards = deckLinkRed[j].split(";");

	// Card Stats
	var blueScore = 0;
	var redScore = 0
	for (i = 0; i <= 7; i++) {
		// Average Elixir
		if (one.indexOf(blueCards[i]) > 0) blueScore++;
		else if (two.indexOf(blueCards[i]) > 0) blueScore += 2;
		else if (three.indexOf(blueCards[i]) > 0) blueScore += 3;
		else if (four.indexOf(blueCards[i]) > 0) blueScore += 4;
		else if (five.indexOf(blueCards[i]) > 0) blueScore += 5;
		else if (six.indexOf(blueCards[i]) > 0) blueScore += 6;
		else if (seven.indexOf(blueCards[i]) > 0) blueScore += 7;
		else if (eight.indexOf(blueCards[i]) > 0) blueScore += 8;
		else if (nine.indexOf(blueCards[i]) > 0) blueScore += 9;

		if (one.indexOf(redCards[i]) > 0) redScore++;
		else if (two.indexOf(redCards[i]) > 0) redScore += 2;
		else if (three.indexOf(redCards[i]) > 0) redScore += 3;
		else if (four.indexOf(redCards[i]) > 0) redScore += 4;
		else if (five.indexOf(redCards[i]) > 0) redScore += 5;
		else if (six.indexOf(redCards[i]) > 0) redScore += 6;
		else if (seven.indexOf(redCards[i]) > 0) redScore += 7;
		else if (eight.indexOf(redCards[i]) > 0) redScore += 8;
		else if (nine.indexOf(redCards[i]) > 0) redScore += 9;
	}

	// Average Elixir Cost
	app.activeDocument.layerSets.getByName('costBlue').layers[0].textItem.contents = (blueScore/8+0.001).toFixed(1);
	app.activeDocument.layerSets.getByName('costRed').layers[0].textItem.contents = (redScore/8+0.001).toFixed(1);

	//---------------------------------- Card Placement ------------------------------------//

	// Opening cards folder
	var cards = app.activeDocument.layerSets.getByName('cards');

	// Replacing deck folders
	app.activeDocument.layerSets.getByName('blueDeck').remove();
	var blueDeck = app.activeDocument.layerSets.add();
	blueDeck.name = "blueDeck";

	app.activeDocument.layerSets.getByName('redDeck').remove();
	var redDeck = app.activeDocument.layerSets.add();
	redDeck.name = "redDeck";

	// Adding cards to respective folders
	for (i = 0; i <= 7; i++) {
		cards.layers.getByName(blueCards[i]).duplicate(blueDeck, ElementPlacement.INSIDE);
		cards.layers.getByName(redCards[i]).duplicate(redDeck, ElementPlacement.INSIDE);
	}

	// Moving cards
	for (i = 0; i <= 7; i++) {
		MoveLayerTo(blueDeck.layers[7 - i], 44 + (118 * i), 945.5);
		MoveLayerTo(redDeck.layers[7 - i], 44 + (118 * i), 12.5);
	}

	//-------------------------------------- Rarity ----------------------------------------//

	// Opening rarity source
	var rarity = app.activeDocument.layerSets.getByName('rarity');

	// Replacing redRarity folder
	app.activeDocument.layerSets.getByName('redRarity').remove();
	var redRarity = app.activeDocument.layerSets.add();
	redRarity.name = "redRarity";

	for (i = 0; i <= 7; i++) {
		if (common.indexOf(redCards[i]) > 0) rarity.layers[0].duplicate(redRarity, ElementPlacement.INSIDE);
		else if (rare.indexOf(redCards[i]) > 0) rarity.layers[1].duplicate(redRarity, ElementPlacement.INSIDE);
		else if (epic.indexOf(redCards[i]) > 0) rarity.layers[2].duplicate(redRarity, ElementPlacement.INSIDE);
		else if (legendary.indexOf(redCards[i]) > 0) rarity.layers[3].duplicate(redRarity, ElementPlacement.INSIDE);
		MoveLayerTo(redRarity.layers[0], 44 + (118 * i), 12.5);
	}

	//---------------------------------- User Ordering -------------------------------------//

	redRarity.visible = false;
	var order = prompt('Order:','').split("");
	redRarity.visible = true;

	var doc = app.activeDocument;  
	var filePath = activeDocument.fullName.path;  
	var pngFile = File("D:/DeckSprites/" + fileName);
	pngSaveOptions = new PNGSaveOptions();
	doc.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);

	// Updating new filename
	fileName = fileName.substring(0, 2) + String.fromCharCode(fileName.charCodeAt(2) + 1);

	for (i = 0; i <= 7; i++) {
		redRarity.layers[8-order[i]].visible = false;

		var pngFile = File("D:/DeckSprites/" + fileName);
		pngSaveOptions = new PNGSaveOptions();
		doc.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);
		fileName = fileName.substring(0, 2) + String.fromCharCode(fileName.charCodeAt(2) + 1);

	}

	// Updating new filename
	fileName = fileName.substring(0, 1) + String.fromCharCode(fileName.charCodeAt(1) + 1) + "0";

}

//------------------------------------- Functions --------------------------------------//

function MoveLayerTo(fLayer,fX,fY) {

  var Position = fLayer.bounds;
  Position[0] = fX - Position[0];
  Position[1] = fY - Position[1];

  fLayer.translate(-Position[0],-Position[1]);
}

