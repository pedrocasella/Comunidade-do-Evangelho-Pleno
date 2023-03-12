
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getDatabase, set, push, ref, get, child, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDlo3_M6Ko34ZCjI-PPk17wcOZxrUA33Pc",
    authDomain: "cepriopequenoteste.firebaseapp.com",
    databaseURL: "https://cepriopequenoteste-default-rtdb.firebaseio.com",
    projectId: "cepriopequenoteste",
    storageBucket: "cepriopequenoteste.appspot.com",
    databaseURL: "https://cepriopequenoteste-default-rtdb.firebaseio.com/",
    messagingSenderId: "313859029675",
    appId: "1:313859029675:web:a434b298a9ca09772c95ee"
  };


  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  //get data

  const dbRef = ref(getDatabase());
  get(child(dbRef, "user/")).then((snapshot) => {
      if (snapshot.exists()) {
          snapshot.forEach((childSnapchot)=>{
            const data = childSnapchot.val()
            const key = childSnapchot.key
            const member_area = document.getElementById('geral-list')

            member_area.innerHTML += '<li class="member-column"><ul class="member-ul"><li class="edit-li" id="' + key + '" onclick="editWindow()"></li><li class="picture-li"><div class="user-picture" style="background-image: url(' + data.foto + ')"></div></li><hr><li class="name-li" id="' + key + '" onclick="openId()">' + data.nome + '</li><hr><li class="cargo-li">' + data.cargo + '</li><hr><li class="cargo-adm-li">' + data.cargo_adm + '</li><hr><li class="nascimento-li">' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="batismo-li">' + data.batismo.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="contato-li">' + data.contato + '</li><hr><li class="excluir-li" id="' + key  + '" onclick="deleteWindow()"></li></ul></li>'
          })
      } else {
          
      }
      }).catch((error) => {
      console.error(error);
  });

  //get remove-list
  get(child(dbRef, "users_off/")).then((snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapchot)=>{
          const data = childSnapchot.val()
          const key = childSnapchot.key
          const member_area = document.getElementById('removed-list')

          member_area.innerHTML += '<li class="member-column"><ul class="member-ul"><li class="picture-li"><div class="user-picture" style="background-image: url(' + data.foto + ')"></div></li><hr><li class="name-li" id="' + key + '">' + data.nome + '</li><hr><li class="cargo-li">' + data.cargo + '</li><hr><li class="cargo-adm-li">' + data.cargo_adm + '</li><hr><li class="nascimento-li">' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="batismo-li">' + data.batismo.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="contato-li">' + data.contato + '</li><hr><li class="excluir-li" id="' + key  + '" onclick="returnWindow()"></li></ul></li>'
        })
    } else {
        
    }
    }).catch((error) => {
    console.error(error);
});

    

  //save data user
  
  function saveData(){
    const db = getDatabase();
    const setRef = ref(db, 'user/')
    const pushSet = push(setRef)
    const foto = document.getElementById('label-picture').style.backgroundImage.replace('url(', '').replace(')', '').replaceAll('"', '')
    const nome = document.getElementById('nome-input').value
    const prefName = document.getElementById('prefName-input').value
    const status = document.getElementById('estadoCivil-input').value
    const rg = document.getElementById('identidade-input').value
    const cpf = document.getElementById('cpf-input').value
    const cargo = document.getElementById('cargo-input').value
    const cargoAdm = document.getElementById('adm-input').value
    const profissao = document.getElementById('profissao-input').value
    const nascimento = document.getElementById('nascimento-input').value
    const batismo = document.getElementById('batismo-input').value
    const endereco = document.getElementById('endereco-input').value
    const contato = document.getElementById('telefone-input').value
    const email = document.getElementById('email-input').value
                    //log in system
                    set(push(ref(db, 'logs/log_users')), {
                      log: nome + ' foi adicionado(a) ao sistema em  ' + new Date().toLocaleDateString() + ' às ' + new Date().toLocaleTimeString() + '' 
                    })
    set(pushSet, {
        foto: foto,
        nome: nome,
        pref_nome: prefName,
        status: status,
        rg: rg,
        cpf: cpf,
        cargo: cargo,
        cargo_adm: cargoAdm,
        profissao: profissao,
        nascimento: nascimento,
        batismo: batismo,
        endereco: endereco,
        contato: contato,
        email: email,
        insert_date: new Date() + '',
    })

    const birthdayRef = ref(db, 'birthday/')
    const pushBirthday = push(birthdayRef)
    set(pushBirthday, {
        foto: foto,
        nome: prefName,
        nascimento: nascimento,
    }).then(()=>{
      setTimeout(()=>{window.location.reload()}, 1000*2)
    })
  }

  document.getElementById('save-btn').addEventListener('click', ()=>{
    saveData()

  })


//open modal
document.getElementById('add-member').addEventListener('click', ()=>{
    document.getElementById('modal-add').style.display = 'block'
    document.getElementById('background-black').style.display = 'block'
    document.getElementById('close').style.display = 'none'
})

//close modal add

document.getElementById('close-btn').addEventListener('click', ()=>{
    document.getElementById('modal-add').style.display = 'none'
    document.getElementById('background-black').style.display = 'none'
})

//get id and return inactive user
document.getElementById('removed-list').addEventListener('click', (e)=>{
  var userId = e.target.id
  document.getElementById('return-ul').innerHTML += '<li class="true-return" id="' + userId + '">Sim</li>'
  //get user_off
  document.querySelector('.true-return').addEventListener('click', ()=>{
    const id = document.querySelector('.true-return').id
    get(child(dbRef, "users_off/" + userId)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const db = getDatabase();

        //log in system
        set(push(ref(db, 'logs/log_users')), {
          log: data.nome + ' retornou ao sistema em ' + new Date().toLocaleDateString() + ' às ' + new Date().toLocaleTimeString() + ''
        })
        const setRef = ref(db, 'user/')
        const pushSet = push(setRef)
        set(pushSet, {
          foto: data.foto,
          nome: data.nome,
          pref_nome: data.pref_nome,
          status: data.status,
          rg: data.rg,
          cpf: data.cpf,
          cargo: data.cargo,
          cargo_adm: data.cargo_adm,
          profissao: data.profissao,
          nascimento: data.nascimento,
          batismo: data.batismo,
          endereco: data.endereco,
          contato: data.contato,
          email: data.email,

        }).then(()=>{
          remove(child(dbRef, "users_off/" + id )).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val()
            } else {
                
            }
            }).catch((error) => {
            console.error(error);
            });
  
            setTimeout(()=>{window.location.reload()}, 1000*2)
        })
      } else {
          
      }
      }).catch((error) => {
      console.error(error);
      });
  
  })
  })


//get id user

document.getElementById('geral-list').addEventListener('click', (e)=>{
  
  var userId = e.target.id
  get(child(dbRef, "user/" + userId)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      const card = document.getElementById('id-card')
      const edit = document.getElementById('edit-modal')
      card.innerHTML = '<div class="front-data"><h2 class="title">Identificação Ministerial<hr></h2><ul class="name-ul"><li class="title-name">Nome:</li><li class="name">' + data.nome + '</li></ul><ul class="cargo-ul"><li class="cargo-title">Cargo:</li><li class="cargo">' + data.cargo + ' / ' + data.cargo_adm + '</li></ul><ul class="rg-ul"><li class="rg-title">Registro Geral:</li><li class="rg">' + data.rg + '</li></ul><ul class="cpf-ul"><li class="cpf-title">CPF:</li><li class="cpf">' + data.cpf + '</li></ul><ul class="nascimento-ul"><li class="nascimento-title">Data de Nascimento:</li><li class="nascimento">' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li></ul></div><div class="picture-area"><img src="https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=' + 'Nome: ' + data.nome + ' Estado Civil: ' + data.status + ' RG: ' + data.rg + ' CPF: ' + data.cpf + ' Cargo: ' + data.cargo + ' Cargo Administrativo: ' + data.cargo_adm + '" alt="" class="qrcode"><div class="cep-logo"></div><div class="picture-user" style="background-image: url(' + data.foto + ')"></div></div><div class="black-bar"></div>'

      //Edit Area
      document.getElementById('edit-photo-label').style.backgroundImage = 'url(' + data.foto + ')'
      document.getElementById('nome-edit-input').value = data.nome
      document.getElementById('nomePref-edit-input').value = data.pref_nome
      document.getElementById('status-edit-input').value = data.status
      document.getElementById('rg-edit-input').value = data.rg
      document.getElementById('cpf-edit-input').value = data.cpf
      document.getElementById('cargo-edit-input').value = data.cargo
      document.getElementById('cargoAdm-edit-input').value = data.cargo_adm
      document.getElementById('profissao-edit-input').value = data.profissao
      document.getElementById('nascimento-edit-input').value = data.nascimento
      document.getElementById('batismo-edit-input').value = data.batismo
      document.getElementById('endereco-edit-input').value = data.endereco
      document.getElementById('contato-edit-input').value = data.contato
      document.getElementById('email-edit-input').value = data.email
      
    } else {
        
    }
    }).catch((error) => {
    console.error(error);
    });

          //update database
          document.getElementById('edit_btn').addEventListener('click', ()=>{
            const db = getDatabase();
            const foto = document.getElementById('edit-photo-label').style.backgroundImage.replace('url(', '').replace(')', '').replaceAll('"', '')
            const nome = document.getElementById('nome-edit-input').value
            const prefName = document.getElementById('nomePref-edit-input').value
            const status = document.getElementById('nomePref-edit-input').value
            const rg = document.getElementById('rg-edit-input').value
            const cpf = document.getElementById('cpf-edit-input').value
            const cargo = document.getElementById('cargo-edit-input').value
            const cargoAdm = document.getElementById('cargoAdm-edit-input').value
            const profissao = document.getElementById('profissao-edit-input').value
            const nascimento = document.getElementById('nascimento-edit-input').value
            const batismo = document.getElementById('batismo-edit-input').value
            const endereco = document.getElementById('endereco-edit-input').value
            const contato = document.getElementById('contato-edit-input').value
            const email = document.getElementById('email-edit-input').value
    
            update(ref(db, 'user/' + userId + '/'), {
                foto: foto,
                nome: nome,
                pref_nome: prefName,
                status: status,
                rg: rg,
                cpf: cpf,
                cargo: cargo,
                cargo_adm: cargoAdm,
                profissao: profissao,
                nascimento: nascimento,
                batismo: batismo,
                endereco: endereco,
                contato: contato,
                email: email,
            }).then(()=>{
              setTimeout(()=>{window.location.reload()}, 1000*2)
            })
    
          })
  
    document.getElementById('confirm-delete').innerHTML = '<div class="true" id="' + userId + '">Sim</div>'

      //Confirm Delete
  
      document.querySelector('.true').addEventListener('click', ()=>{
        
        const idRemove = document.querySelector('.true').id
        //capture data and move to trash
        get(child(dbRef, "user/" + idRemove )).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const db = getDatabase();
                    //log in system
                    set(push(ref(db, 'logs/log_users')), {
                      log: data.nome + ' saiu do sistema em  ' + new Date().toLocaleDateString() + ' às ' + new Date().toLocaleTimeString() + ''
                    })
            const setRef = ref(db, 'users_off/')
            const pushSet = push(setRef)
            set(pushSet, {
              foto: data.foto,
              nome: data.nome,
              pref_nome: data.pref_nome,
              status: data.status,
              rg: data.rg,
              cpf: data.cpf,
              cargo: data.cargo,
              cargo_adm: data.cargo_adm,
              profissao: data.profissao,
              nascimento: data.nascimento,
              batismo: data.batismo,
              endereco: data.endereco,
              contato: data.contato,
              email: data.email,
            }).then(()=>{
              remove(child(dbRef, "user/" + idRemove )).then((snapshot) => {
                if (snapshot.exists()) {
                  const data = snapshot.val()
                } else {
                    
                }
                }).catch((error) => {
                console.error(error);
                });
      
                setTimeout(()=>{window.location.reload()}, 1000*2)
            })
          } else {
              
          }
          }).catch((error) => {
          console.error(error);
          });


      })


      //console.clear()
})



//Close ID Card

document.getElementById('close').addEventListener('click', ()=>{
  document.getElementById('id-card').style.display = 'none'
  document.getElementById('background-black').style.display = 'none' 
})

//Close delete area

document.getElementById('false').addEventListener('click', ()=>{
  document.getElementById('delete-modal').style.display = 'none'
  document.getElementById('background-black').style.display = 'none' 
})

//Close log area

document.getElementById('close-log').addEventListener('click', ()=>{
  document.getElementById('logs').style.display = 'none'
  document.getElementById('background-black').style.display = 'none' 
})

//view deleted users
document.getElementById('active').addEventListener('click', ()=>{
  document.getElementById('geral-list').style.display = 'block'
  document.getElementById('removed-list').style.display = 'none'

  //Active or inactve

  if(document.getElementById('removed-list').style.display == 'block'){
    document.getElementById('inactive').style.backgroundColor = '#28156e'
    document.getElementById('inactive').style.color = '#ffffff'
    document.getElementById('active').style.backgroundColor = '#ffffff'
    document.getElementById('active').style.color = '#000000'
  }else{
    document.getElementById('active').style.backgroundColor = '#28156e'
    document.getElementById('active').style.color = '#ffffff'
    document.getElementById('inactive').style.backgroundColor = '#ffffff'
    document.getElementById('inactive').style.color = '#000000'
  }
})

document.getElementById('inactive').addEventListener('click', ()=>{
  document.getElementById('geral-list').style.display = 'none'
  document.getElementById('removed-list').style.display = 'block'
  
  //Active or inactve

  if(document.getElementById('removed-list').style.display == 'block'){
    document.getElementById('inactive').style.backgroundColor = '#28156e'
    document.getElementById('inactive').style.color = '#ffffff'
    document.getElementById('active').style.backgroundColor = '#ffffff'
    document.getElementById('active').style.color = '#000000'
  }else{
    document.getElementById('active').style.backgroundColor = '#28156e'
    document.getElementById('active').style.color = '#ffffff'
    document.getElementById('inactive').style.backgroundColor = '#ffffff'
    document.getElementById('inactive').style.color = '#000000'
  }
})

//Close return area

document.getElementById('false-return').addEventListener('click', ()=>{
  document.getElementById('return-modal').style.display = 'none'
  document.getElementById('background-black').style.display = 'none' 
})

//Close edit area

document.getElementById('close-edit').addEventListener('click', ()=>{
  document.getElementById('edit-modal').style.display = 'none'
  document.getElementById('background-black').style.display = 'none' 
})

//get birthdays

get(child(dbRef, "birthday/")).then((snapshot) => {
  if (snapshot.exists()) {
      snapshot.forEach((childSnapchot)=>{
        const data = childSnapchot.val()
        const key = childSnapchot.key
        const birthday_area = document.getElementById('birthdays-list')

        birthday_area.innerHTML += '<li class="people-content"><ul><li><div class="picture" style="background-image: url(' + data.foto + ')"></div></li><li class="name"><span>' + data.nome + '</span><br> ' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li><li class="trash"><div class="trash-btn" id="' + key + '"></div></li></ul></li>'
      })
  } else {
      
  }
  }).catch((error) => {
  console.error(error);
});

//open areas
  //open log area

    document.getElementById('notes').addEventListener('click', ()=>{
      document.getElementById('log-area').style.display = 'block'
      document.getElementById('member-list-area').style.display = 'none'
      document.getElementById('schedule').style.display = 'none'
      document.getElementById('insert').style.display = 'none'

        //bar move
        document.getElementById('bar-select-list').style.width = '111.8px'
        document.getElementById('bar-select-list').style.transform = 'translateX(140px)'
      
    })

    // open members list area

    document.getElementById('list').addEventListener('click', ()=>{
      document.getElementById('log-area').style.display = 'none'
      document.getElementById('member-list-area').style.display = 'block'
      document.getElementById('schedule').style.display = 'none'
      document.getElementById('insert').style.display = 'block'

        //bar move
        document.getElementById('bar-select-list').style.width = '101.13px'
        document.getElementById('bar-select-list').style.transform = 'translateX(-146px)'
    })


//log area
get(child(dbRef, "logs/log_users")).then((snapshot) => {
  if (snapshot.exists()) {
      snapshot.forEach((childSnapchot)=>{
        const data = childSnapchot.val()
        document.getElementById('logs_ul').innerHTML += '<li>' + data.log + '</li><hr>'
      })
  } else {
      
  }
  }).catch((error) => {
  console.error(error);
});