let btn = document.getElementById('btn')
let txt = document.getElementById('txt')
let ul1 = document.getElementById('ul1');     //deklaration av mina befintliga html element
let ul2 = document.getElementById('ul2');
let btn4 = document.getElementById('btn1')

btn.addEventListener('click', function () {       // lägg till knappens klick funktion

  if (txt.value.trim() === "") {      //presenterar error medelande ifall fältet är tomt, trim tar bort alla mellanslag

    document.querySelector(".input-error").innerHTML = "Du kan inte lägga till ett tomt fält!";
    document.querySelector(".input-error").style.display = "inline-block";
    document.querySelector(".input-error").style.transition = "all 2s";

    setTimeout(function () {

      document.querySelector(".input-error").style.transition = "all 2s";
      document.querySelector(".input-error").style.display = "none";

    }, 5000);
  }

  else {                                                                                    //om allt ser bra ut så börjas skapandet av listan

    document.querySelector(".input-error").style.display = "none"                           //felmedlandet syns inte

    const KomplettLista = {

      listattribute: 'required',
      listclass: 'innehåll',
      errorclass: 'error',
      errorstyle: 'none',
      btnclass: "ändra",
      btninnehåll: "ändra",

      skapaKomplettLista: function () {                      // metod och objekt för att generera listor                        

        let listan = document.createElement('li')
        let innehåll = document.createElement("p")
        innehåll.innerText = txt.value;
        innehåll.setAttribute(this.listattribute, '')
        innehåll.classList.add(this.listclass)
        ul1.append(listan);
        listan.appendChild(innehåll);

        return listan
      },
      skappaError: function () {

        error = document.createElement("p")
        error.classList.add(this.errorclass)
        error.style.display = this.errorstyle;
        listor.appendChild(error)
        
        return error
      },
      skapaKnapp: function () {                               // gemensam method som kommer användas för alla knappar

        btnName = document.createElement("button");
        btnName.innerText = this.btninnehåll;
        btnName.classList.add(this.btnclass);
        listor.append(btnName)
        btnName.contentEditable = false;

        return btnName                                          //retunerar knappen
      }
    };

    let listor = KomplettLista.skapaKomplettLista();

    KomplettLista.init = function (innehåll, btnclass) {              // function för att kunna skapa dom andra knapparna
      this.btninnehåll = innehåll
      this.btnclass = btnclass
    }

    let btn1 = KomplettLista.skapaKnapp();                         // kallar den ovanstående metoden som repeteras för alla knappar

    KomplettLista.init("färdig", "färdig")
    let btn2 = KomplettLista.skapaKnapp();

    KomplettLista.init("ta bort", "tabort")
    let btn3 = KomplettLista.skapaKnapp("Ta bort")

    KomplettLista.skappaError();

    txt.value = "";                                         // efter allt är klart gör lägg till fältet tomt igen

    btn1.addEventListener('click', function () {            // första knappens funktion som reagerar på klick, som tilllåter redigering men inte om fältet är tomt

      let trimmad = this.parentElement.firstChild.innerText.trim();

      if (trimmad.length < 1) {
        this.parentNode.lastChild.style.display = "inline-block";  // error medelande som visas om innehållet är tomt
        this.parentNode.lastChild.innerText = "du har en tom syssla!"
      }
      else if (btn1.innerText == "spara") {
        btn1.innerText = "ändra"                                    //ändrar knapp innehållet och tar bort felmedelandet
        this.parentNode.lastChild.style.display = "none";
        this.parentElement.firstChild.contentEditable = false;        //ser till att det inte går att redigera
        this.parentElement.firstChild.style.backgroundColor = "#FFFFF"
        this.parentElement.firstChild.style.border = "none"
      }
      else {
        btn1.innerText = "spara"                                      //ändrar knapp innehållet
        this.parentElement.firstChild.contentEditable = true;             // tilllåter ändring
        this.parentElement.firstChild.style.backgroundColor = "#F0F0F0"
        this.parentElement.firstChild.style.border = "1px solid black"
      }
    })
    btn2.addEventListener('click', function () {      //andra knappen som flyttar till färdig listan samt tar bort en av knapparna

      ul2.append(this.parentNode)
      btn2.remove()
    })
    btn3.addEventListener('click', function () {  // sista knappen som raderar innehållet
      this.parentNode.remove()
    })
    btn4.addEventListener('click', function () {    // återställningsknapp som tömmer alla listor
      ul1.innerHTML = ""
      ul2.innerHTML = ""
    })
  }
})