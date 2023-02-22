

//Document Formatation
document.addEventListener("keydown", (e)=>{
    //RG
    const key = e.keyCode
    if(key >= 96 && key <= 105){
        const rg = document.getElementById('identidade-input').value
        if(rg.length == 2){
            document.getElementById('identidade-input').value += '.'
        }

        if(rg.length == 6){
            document.getElementById('identidade-input').value += '.'
        }

        if(rg.length == 10){
            document.getElementById('identidade-input').value += '-'
        }

        //CPF
        const cpf = document.getElementById('cpf-input').value
        if(cpf.length == 3){
            document.getElementById('cpf-input').value += '.'
        }

        if(cpf.length == 7){
            document.getElementById('cpf-input').value += '.'
        }

        if(cpf.length == 11){
            document.getElementById('cpf-input').value += '-'
        }

        //cellphone
        const cellphone = document.getElementById('telefone-input').value
        if(cellphone.length == 0){
            document.getElementById('telefone-input').value += '('
        }

        if(cellphone.length == 3){
            document.getElementById('telefone-input').value += ') '
        }

        if(cellphone.length == 6){
            document.getElementById('telefone-input').value += ' '
        }

        if(cellphone.length == 11){
            document.getElementById('telefone-input').value += '-'
        }

    }
})



//picture add

function getImage(){
    if(document.getElementById('picture-input').files.length != 0){
        var imageFile = document.getElementById('picture-input').files[0]
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = ()=>{
            document.getElementById('label-picture').style.backgroundImage = "url(" + reader.result + ")"
        }
    }
}
setInterval(getImage, 100*5)

//Open ID Card

function openId(){
    document.getElementById('id-card').style.display = 'block'
    document.getElementById('background-black').style.display = 'block'
    document.getElementById('close').style.display = 'block'
}

//Open delete area
function deleteWindow(){
    setTimeout(()=>{
        document.getElementById('delete-modal').style.display = 'block'
        document.getElementById('background-black').style.display = 'block'
        document.getElementById('close').style.display = 'none'
    }, 1000*1)
}

//Open return area
function returnWindow(){
    setTimeout(()=>{
        document.getElementById('return-modal').style.display = 'block'
        document.getElementById('background-black').style.display = 'block'
        document.getElementById('close').style.display = 'none'
    }, 1000*1)
}

//Open edit area

function editWindow(){
    setTimeout(()=>{
        document.getElementById('edit-modal').style.display = 'block'
        document.getElementById('background-black').style.display = 'block'
        document.getElementById('close').style.display = 'none'
    }, 1000*1)
}

//open users log

function openLogUsers(){
    setTimeout(()=>{
        document.getElementById('logs').style.display = 'block'
        document.getElementById('background-black').style.display = 'block'
        document.getElementById('close').style.display = 'none'
    }, 1000*1)
}
