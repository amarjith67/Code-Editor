let languageSelect = document.getElementById("inlineFormSelectPref");
let inputBox = document.getElementById("editor");
let input = document.getElementById("input")
let submitButton = document.getElementById("run");
let outputArea = document.getElementById("output")

// let data=""

// location.reload()
let language = languageSelect.options[languageSelect.selectedIndex].value;
// console.log(language)
// let cm = new CodeMirror()
let editor =  CodeMirror.fromTextArea(inputBox, {
    lineNumbers: true,
    tabSize: 2,
    matchBrackets: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    indentUnit: 4,
    mode: "python",
    theme: "dracula"
  });




 editor.setSize(0.75*window.innerWidth,0.9*window.innerHeight) 

languageSelect.addEventListener("change", () => {
  language = languageSelect.options[languageSelect.selectedIndex].value;
  switch(language){
    case "py": editor.setOption("mode","python"); break;
    case "java": editor.setOption("mode","text/x-java"); break;
    case "c": editor.setOption("mode","text/x-csrc"); break;
    case "cpp": editor.setOption("mode","text/x-c++src"); break;
  }
  // console.log(language)
});

submitButton.addEventListener("click", () => {

  if(language!="Choose..."){
    let data = `${editor.getValue()}`;
    // console.log(data)
    let inp = input.value;
     inp = inp.length > 0? input.value: ''
    get(data, language,inp);
    input.value = ""
  }
  else{
    Swal.fire({
      title: "Please choose a Language!",
      background: "#19191a",
      color: "white",
    });
  }
});


async function get(data, language, inp) {
  console.log(data,language,inp)
  let code = Qs.stringify({
    code: data,
    language: language,
    input: inp,
  });
  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: code,
  };

  axios(config)
    .then(function (response) {
      let json = JSON.stringify(response.data);
      console.log(json);
      outputArea.innerText = JSON.parse(json).output;
    })
    .catch(function (error) {
      console.log(error);
    });
}


