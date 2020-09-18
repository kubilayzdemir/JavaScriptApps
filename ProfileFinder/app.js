const profile = new Profile();
const ui = new UI();
const searchProfile = document.getElementById('searchProfile');

searchProfile.addEventListener('keyup',(event) => {
    let text = event.target.value;
    ui.clearAlert();
    if(text){
        profile.getProfile(text)
        .then(res =>{
                ui.showProfile(res.profile[0])
                ui.showTodo(res.todo)
        }).catch(err => ui.showAlert(text))
    }
})