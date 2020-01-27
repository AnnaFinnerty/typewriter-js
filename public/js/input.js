class Input{
    constructor(addToTextString){
        //index of keyboard keys that create an action -- everything else gets passed to text
        this.addToTextString = addToTextString;
        this.timeSinceLastKeyStroke = 1000;
        this.specialKeys = {
            'Enter' : true,
            'Shift' : true,
            'ArrowRight': null,
            'ArrowLeft': null,
            'ArrowUp': null,
            'ArrowDown': null
        }
        this.awake();
    }
    awake(){
        this.typewriter = document.getElementById('typewriter').getSVGDocument();
        //add keydown clickhandler
        window.addEventListener('keydown',(e)=>{
            this.userInput(e.key)
        })
        for(let i = 0; i < activeKeys.length; i++){
            const key = this.typewriter.getElementById(activeKeys[i]+"-key");
            console.log(key);
            key.addEventListener('click',(e)=>{
                this.clickInput(e.target.id)
            })
        }
    }
    clickInput = (id) => {
        const key = id.split('-')[0];
        this.userInput(key);
    }
    userInput = (key) => {
        console.log('user input: ' + key);
        if(this.specialKeys[key]){
            console.log('this is a special key!');
        } else {
            this.addToTextString(key,this.timeSinceLastKeyStroke);
        }
    }
}