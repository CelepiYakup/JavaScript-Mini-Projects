function num(a){

    forms.display.value += a;
}

function del(){
    const deletion = forms.display.value;
    forms.display.value = deletion.substring(0, deletion.length-1);
}

function ac(){
    forms.display.value = "";
}

function equal(){
    forms.display.value = eval(forms.display.value);
}

function sqrt(){

    const sroot = forms.display.value;
    const stack = Math.sqrt(sroot);
    forms.display.value = stack;

}

function per(){
    const percentage = forms.display.value;
    const temp = eval(percentage)
    const unpercentage = temp*100+"%"
    forms.display.value = unpercentage;

}

function fact(){

    var n = forms.display.value;
    let answer = 1;
    if(n == 0 || n == 1){
        answer = 1;
    }
    else{
        for (var i = n; i >= 1; i--) {
            answer = answer*i; 
            }
        }
        forms.display.value = answer;
}

function rad(){
    const radian = forms.display.value;
    const radia = (radian*180)/3.14;
    forms.display.value = radia;

}

function square(){
    const squared = forms.display.value;
    const squ = Math.pow(squared,2);
    forms.display.value = squ;

}

function logarithm(){
    const log = forms.display.value;
    const loga = Math.log10(log);
    forms.display.value = loga;
}

function ln(){
    const lna = forms.display.value;
    const lnb = Math.log(lna);
    forms.display.value = lnb;
}

function sin(){
    const sina = forms.display.value;
    const sinb = Math.sin(sina);
    forms.display.value = sinb;
}

function cos(){
    const cosa = forms.display.value;
    const cosb = Math.cos(cosa);
    forms.display.value = cosb;
}
function tan(){
    const tana = forms.display.value;
    const tanb = Math.tan(tana);
    forms.display.value = tanb;
}
function cot(){

    const display=document.getElementById('display')
    forms.display.value = 1/Math.tan(forms.display.value*(Math.PI/180))

}

function pi(){
    const pia = forms.display.value;
    const pib = pia*3.141;
    forms.display.value = pib;
}



