/* ============================================================
   Text Analyzer — DOM-free analysis logic (shared with test.html)
   Pure string processing: no document.* access. index.html holds
   only the thin DOM glue + trackEvent wiring.
   ============================================================ */

// Reflow raw text so each sentence (. ? !) lands on its own line,
// with leading/trailing spaces stripped per line.
function splitText(rawText) {
   var inputText = rawText;
   //  inputText = inputText.replace(/[^A-Za-z0-9.?! \n]/g, ""); // Remove all junk
   inputText = inputText.replace(/[.?!]/g, "\n"); // Create new lines
   inputText = inputText.replace(/\s\s*$/gm, "");  // Remove trailing spaces
   inputText = inputText.replace(/^ +/gm, ""); //Remove leading spaces
   return inputText;
}

// Build the full multi-line analysis report for rawText, using keyword
// for the keyword-driven section. Returns the report string.
function analyzeText(rawText, keyword) {
   var txtKeyword = keyword.toUpperCase();  // match the uppercased lines below
   var outputHTML = rawText;
   var output = "";
   var sDeltaOutput;
   var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var cChar;
   var i;
   var sLine;
   var count;
   var sWord;


   const regex = /[^A-Za-z0-9 \n]/g;  //Remove all but new lines and spaces.
   outputHTML = outputHTML.replace(regex, "").trim();
   outputHTML = outputHTML.replace(/  +/g, ' '); //Remove double spaces to avoid word count issue

   var aLines = outputHTML.split(/\n/);
   output += "Number of lines: " + aLines.length + "\n";

   //Clean white space
   for (let j = 0; j < aLines.length; j++) {
      aLines[j] = aLines[j].trim().toUpperCase();
   }

   // First letters
   sDeltaOutput = "";
   for (const sLine of aLines) {
      sDeltaOutput += sLine.charAt(0);
   }
   output += "First letters of each line: " + sDeltaOutput + "\n";

   // Last letters
   sDeltaOutput = "";
   for (const sLine of aLines) {
      sDeltaOutput += sLine.charAt(sLine.length - 1);
   }
   output += "Last letters of each line: " + sDeltaOutput + "\n";

   // Words
   sDeltaOutput = "";
   for (const sLine of aLines) {
      const words = sLine.length === 0 ? 0 : (sLine.length - sLine.replace(/\s/g, "").length + 1);
      sDeltaOutput += words.toString() + " ";
   }
   output += "Words per line: " + sDeltaOutput + "\n";

   // Words
   sDeltaOutput = "";
   for (const sLine of aLines) {
      const aWords = sLine.split(" ");
      for (const sWord of aWords) {
         sDeltaOutput += sWord.charAt(0);
      }
      sDeltaOutput += "\n";
   }
   output += "Words from first letters:\n" + sDeltaOutput + "\n";


   // Words
   sDeltaOutput = "";
   for (const sLine of aLines) {
      var n = 0;
      const aWords = sLine.split(" ");
      for (const sWord of aWords) {
         if (n >= sWord.length) n = 0;
         sDeltaOutput += sWord.charAt(n);
         n += 1;
      }
      sDeltaOutput += "\n";
   }
   output += "Words from incremental letters:\n" + sDeltaOutput + "\n";

   // Letters
   sDeltaOutput = "";
   for (const sLine of aLines) {
      sDeltaOutput += (sLine.length - (sLine.length - sLine.replace(/\s/g, "").length)).toString() + " ";
   }
   output += "Letters per line: " + sDeltaOutput + "\n";

   //Occurences of letters
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         sDeltaOutput += (sLine.length - sLine.replaceAll(cChar, "").length).toString() + " ";
      }
      output += "Occurrences of '" + cChar + "': " + sDeltaOutput + "\n";
   }

   //First Occurences of letters
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         sDeltaOutput += (sLine.replace(/\s/g, "").indexOf(cChar) + 1).toString() + " ";
      }
      output += "First Occurrence '" + cChar + "': " + sDeltaOutput + "\n";
   }

   //Last Occurences of letters
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         sDeltaOutput += (sLine.replace(/\s/g, "").lastIndexOf(cChar) + 1).toString() + " ";
      }
      output += "Last Occurrence '" + cChar + "': " + sDeltaOutput + "\n";
   }

   //Words starting with
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         var count = 0;
         var aWords = sLine.split(" ");
         for (const sWord of aWords) {
            if (sWord.charAt(0) == cChar) { count++; }
         }
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Words starting with '" + cChar + "': " + sDeltaOutput + "\n";
   }

   //Words ending with
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         var count = 0;
         var aWords = sLine.split(" ");
         for (const sWord of aWords) {
            if (sWord.charAt(sWord.length - 1) == cChar) { count++; }
         }
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Words ending with '" + cChar + "': " + sDeltaOutput + "\n";
   }

   //Words containing
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         var count = 0;
         var aWords = sLine.split(" ");
         for (const sWord of aWords) {
            if (sWord.indexOf(cChar) >= 0) { count++; }
         }
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Words containing '" + cChar + "': " + sDeltaOutput + "\n";
   }

   //First Words starting with letter
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         var count = 0;
         var aWords = sLine.split(" ");
         for (count = 0; count < aWords.length; count++) {
            sWord = aWords[count];
            if (sWord.charAt(0) == cChar) { break; }
         }
         count = (count == aWords.length) ? 0 : count + 1; // Not found
         sDeltaOutput += (count).toString() + " ";
      }
      output += "First Word starting with '" + cChar + "': " + sDeltaOutput + "\n";
   }

   //First Words ending with letter
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         var count = 0;
         var aWords = sLine.split(" ");
         for (count = 0; count < aWords.length; count++) {
            sWord = aWords[count];
            if (sWord.charAt(sWord.length - 1) == cChar) { break; }
         }
         count = (count == aWords.length) ? 0 : count + 1; // Not found
         sDeltaOutput += (count).toString() + " ";
      }
      output += "First Word ending with '" + cChar + "': " + sDeltaOutput + "\n";
   }

   //First Words containing with letter
   for (i = 0; i < 26; i++) {
      cChar = alphabet.charAt(i);
      sDeltaOutput = "";
      for (const sLine of aLines) {
         var count = 0;
         var aWords = sLine.split(" ");
         for (count = 0; count < aWords.length; count++) {
            sWord = aWords[count];
            if (sWord.indexOf(cChar) >= 0) { break; }
         }
         count = (count == aWords.length) ? 0 : count + 1; // Not found
         sDeltaOutput += (count).toString() + " ";
      }
      output += "First Word containing '" + cChar + "': " + sDeltaOutput + "\n";
   }

   var maxLen = txtKeyword.length < aLines.length ? txtKeyword.length : aLines.length;

   if (maxLen > 0) {
      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         sDeltaOutput += (sLine.length - sLine.replaceAll(cChar, "").length).toString() + " ";
      }
      output += "Letter occurrences by keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         sDeltaOutput += (sLine.replace(/\s/g, "").indexOf(cChar) + 1).toString() + " ";
      }
      output += "First occurrences by keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         sDeltaOutput += (sLine.replace(/\s/g, "").lastIndexOf(cChar) + 1).toString() + " ";
      }
      output += "Last occurrences by keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         var count = 0;
         var aWords = sLine.split(" ");
         for (const sWord of aWords) {
            if (sWord.charAt(0) == cChar) { count++; }
         }
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Word count starting by keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         var count = 0;
         var aWords = sLine.split(" ");
         for (const sWord of aWords) {
            if (sWord.indexOf(cChar) >= 0) { count++; }
         }
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Word count containing by keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         var count = 0;
         var aWords = sLine.split(" ");
         for (const sWord of aWords) {
            if (sWord.charAt(sWord.length - 1) == cChar) { count++; }
         }
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Word count ending by keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         var aWords = sLine.split(" ");
         for (count = 0; count < aWords.length; count++) {
            sWord = aWords[count];
            if (sWord.charAt(0) == cChar) { break; }
         }
         count = (count == aWords.length) ? 0 : count + 1; // Not found
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Word index starting by keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         var aWords = sLine.split(" ");
         for (count = 0; count < aWords.length; count++) {
            sWord = aWords[count];
            if (sWord.charAt(sWord.length - 1) == cChar) { break; }
         }
         count = (count == aWords.length) ? 0 : count + 1; // Not found
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Word index ending by keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (i = 0; i < maxLen; i++) {
         cChar = txtKeyword.charAt(i);
         sLine = aLines[i];
         var aWords = sLine.split(" ");
         for (count = 0; count < aWords.length; count++) {
            sWord = aWords[count];
            if (sWord.indexOf(cChar) >= 0) { break; }
         }
         count = (count == aWords.length) ? 0 : count + 1; // Not found
         sDeltaOutput += (count).toString() + " ";
      }
      output += "Word index containing by keyword: " + sDeltaOutput + "\n";

      // First Letters Index in Keyword
      sDeltaOutput = "";

      for (const sLine of aLines) {
         sDeltaOutput += (txtKeyword.indexOf(sLine.charAt(0)) + 1).toString() + " ";
      }
      output += "First Letter index in Keyword: " + sDeltaOutput + "\n";

      sDeltaOutput = "";
      for (const sLine of aLines) {
         sDeltaOutput += (txtKeyword.indexOf(sLine.charAt(sLine.length - 1)) + 1).toString() + " ";
      }
      output += "Last Letter index in Keyword: " + sDeltaOutput + "\n";
   }

   return output;
}

if (typeof module !== "undefined" && module.exports) module.exports = { analyzeText, splitText };
if (typeof globalThis !== "undefined") { globalThis.analyzeText = analyzeText; globalThis.splitText = splitText; }
