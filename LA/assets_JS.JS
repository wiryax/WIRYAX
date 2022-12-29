// const getdata = document.getElementById('tambahRow')
const targerElment = document.getElementById('lahan')
const formSubmit = document.getElementById('submit')
const formData = document.getElementById('formInput')

// getdata.addEventListener("click",myfun)
function addRow(){
    const parent = document.createElement('div')
    targerElment.appendChild(parent)
    parent.appendChild(Object.assign(
        document.createElement('input'),
        { type:'number',name:'independentVariable[]',id:'variable',required:true}
    ))
    parent.appendChild(Object.assign(
        document.createElement('input'),
        { type:'number',name:'dependentVariable[]',id:'variable',required:true}
    ))
}
function deleteRow(){
    targerElment.removeChild(targerElment.lastElementChild)
}
formSubmit.addEventListener('click',(event)=>{
    event.preventDefault()
    window.independentVariable = []
    window.dependentVariable = []
    for(let i = 0;i<formData.length-1;i+=2){
        independentVariable.push(parseInt(formData.elements[i].value))
        dependentVariable.push(parseInt(formData.elements[i+1].value))
    }
    var modul = new LinearRegration(independentVariable,dependentVariable)
    if(modul.dataValidation()==true){
        const classProperty = document.getElementsByClassName("input-calculate")
        var stat = estimateStatus(modul.StandartError(),modul.R_Squeared())
        classProperty[0].style.visibility = "visible"
        const B0 = document.getElementById("B0").innerText = modul.b0()
        const B1 = document.getElementById("B1").innerText = modul.b1()
        const R_Squeared = document.getElementById("R-squared")
        const R_SquearedClass = document.getElementsByClassName("R-squared")
        R_Squeared.innerText = modul.R_Squeared()+" "+stat['R_Squeared'][0]
        R_SquearedClass[0].style.color =stat['R_Squeared'][1]
        const StandartError = document.getElementById("Standart-Error")
        const StandartErrorClass = document.getElementsByClassName("Standart-Error")
        StandartError.innerText = modul.StandartError()+" "+stat['SEoE'][0]
        StandartErrorClass[0].style.color =stat['SEoE'][1]
    }else{
        const Elments = document.createElement("h3")
        const addText = document.createTextNode("Data Invalid !!!")
        addText.className = "statusValidation"
        Elments.appendChild(addText)
        const validationProperty = document.getElementsByClassName("statusValidation")
        const validationProperty2 = document.getElementById("statusValidation")
        validationProperty2.appendChild(Elments)
        validationProperty[0].style.visibility = "visible"
    }
})
function calculate(){
    var modul = new LinearRegration(window.independentVariable,window.dependentVariable)
    const value = document.getElementById("predictionVariable")
    document.getElementById("Yhats").innerText = modul.predictionResult(value.value)
    // console.log(modul.predictionResult(value.value))
    // console.log(modul.StandartError())
    // console.log(modul.R_Squeared())
}
function estimateStatus(SEoE,R_Squeared){
    let status = []
    if(R_Squeared >= 0.5 && R_Squeared <= 1.2){
        status["R_Squeared"] = ['GOOD','green']
    }else{
        status["R_Squeared"] = ['BAD','red']
    }

    if (SEoE >= 0 && SEoE <=1) {
        status["SEoE"] = ['GOOD','green']
    }else{
        status["SEoE"] = ['BAD','red']
    }
    
    return status
}