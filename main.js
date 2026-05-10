// ################################## OBJECTS ##################################
var yourRGB = {
  "r": "0",
  "g": "0",
  "b": "0"
};

var goalRGB = {
  "r": "0",
  "g": "0",
  "b": "0"
};

var outputRGB = {
  "r": "0",
  "g": "0",
  "b": "0"
};



// ################################# UTILITIES #################################

// expecting 1-digit hex
function hexLookup(hexDigit) {
  if (hexDigit == "A") {
    return 10;
  }
  if (hexDigit == "B") {
    return 11;
  }
  if (hexDigit == "C") {
    return 12;
  }
  if (hexDigit == "D") {
    return 13;
  }
  if (hexDigit == "E") {
    return 14;
  }
  if (hexDigit == "F") {
    return 15;
  }
  return parseInt(hexDigit);
}

function decLookup(dec) {
  if (dec == 10) {
    return "A";
  }
  if (dec == 11) {
    return "B";
  }
  if (dec == 12) {
    return "C";
  }
  if (dec == 13) {
    return "D";
  }
  if (dec == 14) {
    return "E";
  }
  if (dec == 15) {
    return "F";
  }
  return dec.toString();
}


function decToHex(dec) {
  var hex1;
  var hex2;
  hex1 = decLookup(Math.floor(dec/16));
  hex2 = decLookup(dec%16);
  var cat = hex1 + hex2;
  return cat;
}

// expecting 2-digit hex
function hexToDec(hex) {
  return (hexLookup(hex.substring(0,1))*16 + hexLookup(hex.substring(1,2)));
}


// expecting 6-digit hex
function chopOffHash(hex) {
  if (hex.substring(0,1) == "#") {
    hex = hex.substring(1,hex.length);
  }
  return hex;
}

// expecting 6-digit hex and optional hash
function hexToRGB(hex, rgbItem) {
  hex = chopOffHash(hex);
  hex = hex.toUpperCase();
  
  rgbItem.r = hexToDec(hex.substring(0,2));
  rgbItem.g = hexToDec(hex.substring(2,4));
  rgbItem.b = hexToDec(hex.substring(4,6));
}


function RGBToHex(rgbItem) {
  var outputHex;
  outputHex = decToHex(rgbItem.r) + decToHex(rgbItem.g) + decToHex(rgbItem.b);
  return outputHex;
}

function fixRGB(item) {
  if (item.r > 255) {
    item.r = 255;
  }
  if (item.g > 255) {
    item.g = 255;
  }
  if (item.b > 255) {
    item.b = 255;
  }
  
  if (item.r < 0) {
    item.r = 0;
  }
  if (item.g < 0) {
    item.g = 0;
  }
  if (item.b < 0) {
    item.b = 0;
  }
}

function colorstringToHex(string) {
  // color string: "rgb(0, 0, 0)"
  // siiiiigh. this is like one of those really annoying zybooks labs </3
  string = string.substring(4,string.length-1);
  //console.log(string);
  
  var clears = 0;
  var rStr = "";
  var gStr = "";
  var bStr = "";
  
  for (var i=0; i<string.length; i++) {
    if (isNaN(string.substring(i, i+1))) {
      clears++;
    }
    else {
      if (clears == 0) {
        rStr = rStr + string.substring(i, i+1);
      }
      else if (clears == 1) {
        gStr = gStr + string.substring(i, i+1);
      }
      else {
        bStr = bStr + string.substring(i, i+1);
      }
    }
  }
  gStr = gStr.substring(1,gStr.length);
  bStr = bStr.substring(1,bStr.length);
  //console.log("This is " + rStr + "/" + gStr + "/" + bStr);
  
  return decToHex(rStr) + decToHex(gStr) + decToHex(bStr);
}


// ########################### SCREEN SWITCH BUTTONS ###########################

onEvent("HtoIV", "click", function( ) {
  setScreen("ideal_visualizer");
});

onEvent("HtoCV", "click", function( ) {
  setScreen("color_visualizer");
});

onEvent("IV_home", "click", function( ) {
  setScreen("home");
});

onEvent("CV_home", "click", function( ) {
  setScreen("home");
});




// ################################# UNIT TESTS #################################
onEvent("H_test", "click", function( ) {

  
  var sampleHex1 = "#ABCDEF";
  var sampleHex2 = "123456";
  sampleHex1 = chopOffHash(sampleHex1);
  sampleHex2 = chopOffHash(sampleHex2);
  console.log("Hashes chopped: " + sampleHex1 + ", " + sampleHex2);
  
  sampleHex1 = "A";
  sampleHex2 = "0";
  var sampleDec1 = hexLookup(sampleHex1);
  var sampleDec2 = hexLookup(sampleHex2);
  console.log("Hex lookup: " + sampleDec1 + ", " + sampleDec2);
  
  sampleHex1 = "0F";
  sampleHex2 = "2A";
  sampleDec1 = hexToDec(sampleHex1);
  sampleDec2 = hexToDec(sampleHex2);
  console.log("Hex to dec: " + sampleDec1 + ", " + sampleDec2);
  
  var sampleRGBItem = {
    "r": 0,
    "g": 0,
    "b": 0
  };
  
  sampleHex1 = "#ABCDEF";
  sampleHex2 = "123456";
  hexToRGB(sampleHex1, sampleRGBItem);
  console.log("Full hex code 1 (expected 171/205/239): " + sampleRGBItem.r + "/" + sampleRGBItem.g + "/" + sampleRGBItem.b);
  hexToRGB(sampleHex2, sampleRGBItem);
  console.log("Full hex code 2 (expected 18/52/86): " + sampleRGBItem.r + "/" + sampleRGBItem.g + "/" + sampleRGBItem.b);
  
  colorstringToHex("rgb(0, 0, 0)");
});






// ############################## IDEAL VISUALIZER ##############################
onEvent("IV_run", "click", function() {
  var yourHex = chopOffHash(getText("IV_yourHex"));
  var goalHex = chopOffHash(getText("IV_goalHex"));
  var outputHex;
  
  setProperty("IV_yourHexSqr", "background-color", "#"+yourHex);
  setProperty("IV_goalHexSqr", "background-color", "#"+goalHex);
  
  // ok NOW for the logic
  hexToRGB(yourHex, yourRGB);
  hexToRGB(goalHex, goalRGB);
  
  // output = 2*goal - your
  outputRGB.r = 2*goalRGB.r - yourRGB.r;
  outputRGB.g = 2*goalRGB.g - yourRGB.g;
  outputRGB.b = 2*goalRGB.b - yourRGB.b;
  fixRGB(outputRGB);
  console.log("Output RGB: " + outputRGB.r + "/" + outputRGB.g + "/" + outputRGB.b);
  
  outputHex = RGBToHex(outputRGB);
  setProperty("IV_outputHexSqr", "background-color", "#"+outputHex);
  setProperty("IV_outputHex", "text", "#"+outputHex);
  
  var avgRGB = {
  "r": "0",
  "g": "0",
  "b": "0"
  };
  avgRGB.r = Math.round((yourRGB.r+outputRGB.r)/2);
  avgRGB.g = Math.round((yourRGB.g+outputRGB.g)/2);
  avgRGB.b = Math.round((yourRGB.b+outputRGB.b)/2);
  outputHex = RGBToHex(avgRGB);
  setProperty("IV_averageSqr", "background-color", "#"+outputHex);
  setProperty("IV_average", "text", "#"+outputHex);
});





// ############################## COLOR VISUALIZER ##############################
onEvent("CV_run", "click", function() {
  var PAHex = chopOffHash(getText("CV_PAHex"));
  var PBHex = chopOffHash(getText("CV_PBHex"));
  var outputHex;
  
  setProperty("CV_PASqr", "background-color", "#"+PAHex);
  setProperty("CV_PBSqr", "background-color", "#"+PBHex);
  
  var compareHex = chopOffHash(getText("CV_compareHex"));
  setProperty("CV_compareSqr", "background-color", "#"+compareHex);
  
  // logic
  hexToRGB(PAHex, yourRGB);
  hexToRGB(PBHex, goalRGB);
  
  for (var i=1; i<16; i++) {
    outputRGB.r = randomNumber(yourRGB.r, goalRGB.r);
    outputRGB.g = randomNumber(yourRGB.g, goalRGB.g);
    outputRGB.b = randomNumber(yourRGB.b, goalRGB.b);
    outputHex = RGBToHex(outputRGB);
    setProperty("CV_col"+i, "background-color", "#"+outputHex);
  }
});



function CV_displayHex(id) {
  var rgb = getProperty(id, "background-color");
  var result = colorstringToHex(rgb);
  console.log("#"+result);
  setProperty("CV_checkHex", "text", "#"+result);
  setProperty("CV_checkSqr", "background-color", "#"+result);
}


onEvent("CV_col1", "click", function() {
  CV_displayHex("CV_col1");
});
onEvent("CV_col2", "click", function() {
  CV_displayHex("CV_col2");
});
onEvent("CV_col3", "click", function() {
  CV_displayHex("CV_col3");
});
onEvent("CV_col4", "click", function() {
  CV_displayHex("CV_col4");
});
onEvent("CV_col5", "click", function() {
  CV_displayHex("CV_col5");
});
onEvent("CV_col6", "click", function() {
  CV_displayHex("CV_col6");
});
onEvent("CV_col7", "click", function() {
  CV_displayHex("CV_col7");
});
onEvent("CV_col8", "click", function() {
  CV_displayHex("CV_col8");
});
onEvent("CV_col9", "click", function() {
  CV_displayHex("CV_col9");
});
onEvent("CV_col10", "click", function() {
  CV_displayHex("CV_col10");
});
onEvent("CV_col11", "click", function() {
  CV_displayHex("CV_col11");
});
onEvent("CV_col12", "click", function() {
  CV_displayHex("CV_col12");
});
onEvent("CV_col13", "click", function() {
  CV_displayHex("CV_col13");
});
onEvent("CV_col14", "click", function() {
  CV_displayHex("CV_col14");
});
onEvent("CV_col15", "click", function() {
  CV_displayHex("CV_col15");
});
