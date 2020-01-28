class Typewriter{
    constructor(){
        this.input = new Input(this.type,this.nextLine,this.depressKey); 
        this.typewriter = document.getElementById('typewriter').getSVGDocument();
        this.charWidth = 5;
        this.currentPos = 0;
        this.paperHeight = 1;
        this.movableOnType = this.typewriter.getElementById('layer18');
        this.paper = this.typewriter.getElementById('paper');
        this.ribbon = this.typewriter.getElementById('ribbon');
        this.textContainer = this.typewriter.getElementById('text');
        this.textContainer.width = "100px";
        this.text = this.textContainer.firstChild;
        this.text.style.fontFamily = "'Special Elite', 'Courier',serif";
        this.text.textContent = "test text";
        this.currentLine = "";
        this.maxCharsPerLine = 25;
        this.currentPage = [];
        this.linesOnPages = 25;
        this.textPosition = {
            x: "50vw",
            y: "70vh"
        }
        this.keys = {}
        this.hammers = {}
        this.audio = {
            'bell': document.querySelector('#bell')
        }
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

        //find start position for text container
        // console.log(this.paper);
        // const transform = this.paper.getAttribute("x");
        // const paperX = Number(transform);
        // console.log('paperX',paperX)

        this.centerX = window.innerWidth/2;
        this.centerY = window.innerHeight/2 - 40;

        const paperX = Number(this.paper.getAttribute("x"));
        // const paperWidth = Number(this.paper.getAttribute("width"));
        const paperY = Number(this.paper.getAttribute("y"));
        // const paperHeight = Number(this.paper.getAttribute("height"));
       
        // this.displayedText.style.width = paperWidth + "px";
        // this.displayedText.style.height = paperHeight + "px";

        this.paperMin = Number(this.paper.getAttribute("x")) *.45;
        this.currentPos = this.paperMin;
        const width = Number(this.paper.getAttribute("width"));
        //temp fix until correct way of getting offset can be determined
        this.paperMax = this.paperMin + width * -1;
        this.movableOnType.style.transform = "translate("+this.currentPos+"px,0)";
        this.displayedText.style.transform = "translate("+this.centerX+"px,"+this.centerY+"px)";
    }
    type = (key,time) => {
        //use time to play sound
        console.log('typing!');
        if(this.currentPos - this.charWidth > this.paperMax){
            this.currentPos -= this.charWidth;
            this.currentLine += key;
            this.depressKey(key);
            this.print(this.currentLine);
        } else {
            this.currentPos = this.paperMin;
            this.nextLine();
        }
        //translate moveable type container to current position
        this.movableOnType.style.transform = "translate("+this.currentPos+"px,0)";
        //translate displayed text to paper position
        // const paperY = Number(transform[1].split(")")[0]);
        const textOffet = this.centerX + this.currentPos;
        this.displayedText.style.transform = "translate("+textOffet+"px,"+this.centerY+"px)";
    }
    depressKey = (key) => {
        console.log(key);
        key = key.toLowerCase();
        if(this.keys[key]){
            const keyObj = this.keys[key]['obj'];
            console.log(keyObj);
            const keyPos = this.keys[key]['pos'];
            console.log(keyPos);
            const offsetY = keyPos.y+3
            keyObj.style.transform = "translate("+keyPos.x+"px,"+offsetY+"px)";
            this.ribbon.style.opacity = 1;
            setTimeout(()=>{
                keyObj.style.transform = "translate("+keyPos.x+"px,"+keyPos.y+"px)";
                this.ribbon.style.opacity = 0;
            },100)
            console.log(keyObj);
        } else {
            console.log('keyObj not found');
        }
    }
    nextLine = () => {
        console.log('new line');
        //ding!
        this.audio.bell.play();
        this.paperHeight += .1;
        this.currentPage.push(this.currentLine);
        const paperY = -9*this.paperHeight;
        this.paper.style.transform = "translate(0,"+paperY+"px) scale(1,"+this.paperHeight+")";
        
    }
    updateCurrentText = () => {
        console.log('updating current text')
    }
    print = (text) => {
        console.log(text);
        this.text.textContent = text;
    }
}