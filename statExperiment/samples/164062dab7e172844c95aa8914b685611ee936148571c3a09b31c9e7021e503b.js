var poll;    // An id for setInterval
var dbgWin;  // The window where tests are run
var progress;  // Let user know the progress

function togglerr() {
  var elements = document.getElementsByClassName("details");
  for (var i = 0; i < elements.length; i++) {
    var s = elements[i];
    if (s.style.display == "none" || s.style.cssText == "") {
      s.style.display = "inline";
    }
    else {
      s.style.display = "none";
    }
  }
}

// Capture the test results from the other window and write them
// out to the page.
function displayResults() {
  var output = document.getElementById("output");
  output.innerHTML = dbgWin.document.getElementById("output").innerHTML;
}

// Check the debug window to see if testing has completed
// and clear the polling timer if so.
function checkStatus() {
  if (dbgWin.state === 0) {
    displayResults();
    clearInterval(poll);   // stop polling
    // Display progress
    progress.setAttribute("class","pass");
    progress.innerHTML = "...testing COMPLETE!";
  }
}

// Start the testing by popping up a separate window where tests
// can run without interfering with the main page that loaded them.
function start() {
  dbgWin = window.open("","debugWindow","toolbar=no,scrollbars=yes,resizable=yes,width=600px,height=100px");
  if (XMLHttpRequest === undefined) {
    alert("Your Web browser does not support XMLHttpRequest which is required.");
    return;
  }

  progress = document.getElementById("progress");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "test.js", false);
  xhr.send(null);
  var script = xhr.responseText;

  // init() needs to be called specifically in this case because the document
  // doesn't ever load?
  var html = "<head>\n</head><div id='output'></div><script>" + script + "<" + "/script>\n" +
    "<script>init();main();<" + "/script>";

  // Start writing results and polling the debug window for status
  if (dbgWin !== null){
    // Display progress
    progress.setAttribute("class","err");
    progress.innerHTML = "... testing in progress";

    dbgWin.document.write(html);
    poll = setInterval("checkStatus()", 1000);

  }
  // Otherwise, throw an alert if the pop up could not be created
  else {
    alert("Could not create the pop up window for testing - can you tell your browser to allow pop ups for this page?");
  }
}
