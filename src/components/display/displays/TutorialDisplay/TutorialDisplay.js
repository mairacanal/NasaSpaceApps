const Component = require('../../../component');


module.exports = class TutorialDisplay extends Component {
    constructor() {
        super("TutorialDisplay");
        this.timestep = 2200;
        this.timer = 0;
        this.flow = [{
            time: 0,
            role: "text",
            text: "Hey! You are in NASA's Kennedy Space Center. You must be very excited about your first day here!"
        }, {
            time: 2,
            role: "text",
            text: "You're gonna work on our Mission Control Room at the Space Flight Operations Facility."
        }, {
            time: 4,
            role: "text",
            text: "Your main assignment is to maintain a effective telecom system to keep in touch with astronauts in Mars"
        }, {
            time: 7,
            role: "response",
            text: "You mean, talk to them on phone?"
        }, {
            time: 8,
            role: "text",
            text: "Ha!, You wish! You'll connect with them using our special communication system"
        }, {
            time: 10,
            role: "text",
            text: "The Deep Space Network"
        }, {
            time: 12,
            role: "text",
            text: "The DSN is NASA’s international array of giant radio antennas that supports interplanetary spacecraft missions."
        }, {
            time: 15,
            role: "text",
            text: "You are going to have to design and operate the link that keeps people together over interplanetary distances"
        }, {
            time: 17,
            role: "text",
            text: "You'll face some challenges setting up a fast and reliable connection with them"
        }, {
            time: 19,
            role: "response",
            text: "Wow! But I do have that it takes to communicate with them?"
        }, {
            time: 20,
            role: "text",
            text: "Trust me, you can do this. If you don't know something you can always check our Technical Manual"
        }, {
            time: 23,
            role: "response",
            text: "OK! I'll do my best!"
        }];
        // // TALVEZ ISSO SEJA MELHOR EM OUTRO LUGAR
        this.interval = {};

        this.texts = document.createElement('div');
        this.texts.className = "texts";
    }



    createText(text, role, t) {
        var n = document.createElement("div");
        n.innerHTML = text;
        if (role == 'text')
            n.className = role + " " + "cbbl -right";
        else
            n.className = role + " " + "cbbl";

        n.style = `-webkit-animation-delay: ${t}s;animation-delay: 1s;`
        return n;

    }

    add(text, role) {
        var dialogos = document.getElementsByClassName("texts");
        var texts = dialogos[0];

        texts.appendChild(this.createText(text, role));

    }

    showTutorial() {

        this.flow.forEach(
            (point) => {
                if (this.timer == point.time) {
                    this.add(point.text, point.role);
                }
                if (this.timer > this.flow[this.flow.length - 1].time + 1) {
                    clearInterval(this.interval);
                }
            }
        );
        this.timer++;

    }


    build() {



        let divActors = document.createElement('div');
        divActors.className = "actors";

        let imgActor = document.createElement('img');
        imgActor.setAttribute("src", "../images/Consultor.gif");
        imgActor.className = "actor";
        divActors.appendChild(imgActor);

        let divBtn = document.createElement('div');
        let btnGo = document.createElement('button');
        btnGo.innerText = "Open Communications Control";
        btnGo.addEventListener('click', (ev) => {
            let tut = document.getElementById("tutorial");
            tut.style.display = 'none';
            let ms = document.getElementById("mainContainer");
            ms.style.display = 'flex';

            window.dispatchEvent(new CustomEvent('showDisplay', {
                detail: "SystemDisplay",
            }));

        });
        divBtn.appendChild(btnGo);
        divBtn.className = "openBtn";
        divActors.appendChild(divBtn);


        let imgChar = document.createElement('img');
        imgChar.setAttribute("src", "../images/NASAemploye.gif");
        imgChar.className = "char";
        divActors.appendChild(imgChar);

        let divScreen = document.createElement('div');
        divScreen.className = "screen";

        divScreen.appendChild(this.texts);
        divScreen.appendChild(divActors);

        let divPhone = document.createElement('div');
        divPhone.className = "phone";
        divPhone.appendChild(divScreen);






        let divTerminal = document.createElement('div');
        divTerminal.className = "terminal";
        divTerminal.appendChild(divPhone);


        // this.htmlComponent.innerHTML = `<div cslass='terminal'> ${divTerminal.innerHTML} </div>`;
        if (document.getElementById("tutorial")) {
            document.getElementById("tutorial").appendChild(divTerminal);
        }


        window.addEventListener('showDisplay', (event) => {
            if (event.detail == "TutorialDisplay") {

                this.showTutorial();

                this.interval = setInterval(() => {
                    this.showTutorial();
                }, this.timestep);
            } else {
                var dialogos = document.getElementsByClassName("texts")[0];
                this.timer = 0;
                dialogos.innerHTML = "";
            }
        });
    }
};