const submitBtn = document.getElementById('submit');
const btntext =submitBtn.innerText;
const TitleTextfield = document.getElementById('Title');
const DescriptionTextfield = document.getElementById('Description');
const recordsDisplay = document.getElementById('records');
let userArray = [];
let edit_info = null;
let objstr = localStorage.getItem('users');
if(objstr!=null){
    userArray = JSON.parse(objstr);
}

DisplayInfo();
submitBtn.onclick=()=>{
    const Title = TitleTextfield.value;
    const Description = DescriptionTextfield.value;
    if(edit_info!=null){
        //edit data
        userArray.splice(edit_info,1,{"Title":Title, "Description":Description})
        edit_info =null;
    }
    else{
        //insert data
        let obj = {"Title":Title, "Description":Description};
        userArray.push(obj);
    }
    SaveInfo(userArray);
    TitleTextfield.value = '';
    DescriptionTextfield.value = '';
    DisplayInfo();
    submitBtn.innerText = btntext;
}

function SaveInfo(userArray){
    let str = JSON.stringify(userArray);
    localStorage.setItem("users",str);

}

function DisplayInfo(){
    let statement = '';
    userArray.forEach((obj,i) =>{
      statement += `<tr>
      <th scope="">${i+1}</th>
      <td>${obj.Title}</td>
      <td>${obj.Description}</td>
      <td><i class="fa fa-edit" style="color: #fff; background-color: rgb(9, 146, 238);padding: 0.5em;"onclick ='EditInfo(${i})'></i></td>   
      <td><i class="fa fa-remove" style="color: #fff; background-color: red; padding: 0.5em;" onclick ='DeleteInfo(${i})' ></i></td>
  </tr>`;
    });
    recordsDisplay.innerHTML = statement;
}

function DeleteInfo(id){
    userArray.splice(id,1)
    SaveInfo(userArray);
    DisplayInfo();
}

function EditInfo(id){
    edit_info = id;
    TitleTextfield.value = userArray[id].Title;
    DescriptionTextfield.value = userArray[id].Description;
    submitBtn.innerText = "Save Changes";
}







