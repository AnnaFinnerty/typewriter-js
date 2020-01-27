class Typewriter{
    constructor(){
        this.input = new Input(this.type); 
        this.typewriter = document.getElementById('typewriter').getSVGDocument();
        console.log(this.typewriter);
        this.charWidth = 5;
        this.currentPos = 0;
        this.movableOnType = this.typewriter.getElementById('layer18');
        this.paper = this.typewriter.getElementById('paper');
        this.currentLine = "";
        this.currentPage = [];
        this.linesOnPages = 25;
        this.textPosition = {
            x: "50vw",
            y: "70vh"
        }
        this.keys = {}
        this.audio = {
            'bell': document.querySelector('#bell')
        }
        console.log(this.paper);
        this.displayedText = document.querySelector('#text-container');
        this.awake();
    }
    awake(){
        //find keysObjs in svg and store ref and position calc in keys obj
        for(let i = 0; i < activeKeys.length; i++){
            const keyObj = this.typewriter.getElementById(activeKeys[i]+"-key");
            this.keys[activeKeys[i]] = {};
            this.keys[activeKeys[i]]['obj'] = keyObj;
            const transform = keyObj.getAttribute("transform").split(",");
            const keyX = Number(transform[0].split("(")[1]);
            const keyY = Number(transform[1].split(")")[0]);
            this.keys[activeKeys[i]]['pos'] = {
                x: keyX,
                y: keyY
            }
        }
    //    this.leftTypewriterOffset = document.getElementById('typewriter').offsetLeft
    //    console.log('typewriter outer container left position',this.leftOffset)
    //    this.topTypewriterOffset = document.getElementById('typewriter').offsetTop
    //    console.log('typewriter outer container top position',this.topOffset)
    //    this.leftPaperOffset = document.getElementById('paper').offsetLeft
    //    console.log('typewriter outer container left position',this.leftOffset)
    //    this.topPaperOffset = document.getElementById('typewriter').offsetTop
    //    console.log('typewriter outer container top position',this.topOffset)

        //find start position for text container
        // console.log(this.paper);
        // const transform = this.paper.getAttribute("x");
        // const paperX = Number(transform);
        // console.log('paperX',paperX)


        this.paperMin = Number(this.paper.getAttribute("x")) *.45;
        this.currentPos = this.paperMin;
        const width = Number(this.paper.getAttribute("width"));
        //temp fix until correct way of getting offset can be determined
        this.paperMax = this.paperMin + width * -1;
        this.movableOnType.style.transform = "translate("+this.currentPos+"px,0)";
    }
    type = (key,time) => {
        //use time to play sound
        console.log('typing!');
        console.log(this.movableOnType);
        if(this.currentPos - this.charWidth > this.paperMax){
            this.currentPos -= this.charWidth;
            this.currentLine += key;
            this.depressKey(key);
            this.print(this.currentLine);
        } else {
            this.currentPos = this.paperMin;
            this.resetLine();
        }
        //translate moveable type container to current position
        this.movableOnType.style.transform = "translate("+this.currentPos+"px,0)";
        //translate displayed text to paper position
        // const paperY = Number(transform[1].split(")")[0]);
        this.displayedText.style.transform = "translate("+this.currentPos+"px,0)";
    }
    depressKey = (key) => {
        if(this.keys[key]){
            const keyObj = this.keys[key]['obj'];
            // console.log(keyObj);
            const keyPos = this.keys[key]['pos'];
            console.log(keyPos);
            const offsetY = keyPos.y+3
            keyObj.style.transform = "translate("+keyPos.x+"px,"+offsetY+"px)";
            setTimeout(()=>{
                keyObj.style.transform = "translate("+keyPos.x+"px,"+keyPos.y+"px)";
            },100)
            console.log(keyObj);
        } else {
            console.log('keyObj not found');
        }
    }
    resetLine = () => {
        console.log('new line');
        //ding!
        this.audio.bell.play();
        // this.paper.style.transform = "scale(1,1.1)";
        this.currentLine++;
        this.movableOnType.style.transform = "translate(0,"+200+"px)";
    }
    updateCurrentText = () => {
        console.log('updating current text')
    }
    print = (text) => {
        console.log(text);
        this.displayedText.textContent = text;
    }
}