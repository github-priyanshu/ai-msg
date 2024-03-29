var log=console.log;

function op(elem){return document.querySelector(elem)}
function opp(elem){return document.querySelectorAll(elem)}

function resetFormat(){
  let keys={
    col: "color",
    fs: "fontSize",
    ff: "fontFamily",
    fw: "fontWeight",
    bg: "background"
  }
  for(let val in keys){
    opp(`*[${val}]`).forEach(elem=>{
      elem.style[keys[val]]=elem.getAttribute(val);
      elem.removeAttribute(val);
    })
  }
  
  opp("*[ico]").forEach(val=>{
    val.insertAdjacentHTML("beforeend",elems[val.getAttribute("ico")]);
    val.removeAttribute("ico");
    val.style.fill=val.getAttribute("fill");
  })
}
resetFormat();
function copy(txt){
  let elem=document.createElement("textarea");
  document.body.insertAdjacentElement("beforeend",elem)
  elem.value=txt;
  elem.select();
  elem.setSelectionRange(0, 99999999999999); 
  document.execCommand("copy");
  try{navigator.clipboard.writeText(elem.value);}catch{}
  elem.remove();
  return true;
}



function encrypt(txt){
  txt=btoa(txt).replace("+",'00');
  return getMixed(txt);
}

function decrypt(txt){
  txt=getFixed(txt);
  return atob(txt.replace("00",'+'));
}

function getMixed(txt){
  txt=txt.split("");
  var encd="",l=txt.length;
  for(let i=0; i< l; i++){
    encd+=txt[i%2==0?"pop":"shift"]();
  }
  return encd;
}

function getFixed(txt){
  var p1="",p2="",l=txt.length;
  for(let i=0; i<=l; i++){
    if(i%2==0){
      p2=txt.charAt(i)+p2;
    }else{
      p1=p1+txt.charAt(i);
    }
  }
  return p1+p2;
}
