
const res= document.getElementById("response")
const API_KEY ='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'

// If the result is throwing erorr then uncomment tis below API_KEY to get the results
// const API_KEY = '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'



async function submit(){

    //For switching the screen
   
    document.getElementById('home-screen').style.display='none'
    document.getElementById('response-screen').style.display='block'
  
 

    const input= document.getElementById("input").value

    // for displaying the question
    const question = document.getElementById('question')
    question.innerHTML = input
    //for clearing the input field
    document.getElementById("input").value=""


    //FOr fetching data 
    const options ={
        method:'POST',
        headers: {
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type':`application/json`
        },
        body : JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: input}],
            
        })
          
    }
    try{


         res.innerHTML = "Loading..."
    
        
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        console.log(data.choices[0].message.content)        
        let resp = data.choices[0].message.content
        res.innerHTML = resp
        
       
        if(data.choices[0].message.content){
            const para = document.createElement('p')
            para.innerHTML = document.getElementById("input").value
            const history = document.getElementById('history')
            history.append(para)
            para.innerHTML = input
            
            para.addEventListener('click',function(){
                document.getElementById("input").value = para.innerHTML
            })
        }

    }catch (error){
        
        let mystr = 'Loading Error!, Please Try again'
        let i = 0

        function typrewritter(){
            let newstr =mystr.slice(0,i)
            res.innerHTML = newstr
           
            i= i+1
            setTimeout(function() {typrewritter()},75)
        }

        typrewritter()
       
        console.log(error)
    }

    
}


//For new chaht

function newchat(){
    document.getElementById('home-screen').style.display='flex'
    document.getElementById('response-screen').style.display='none'
    let q = matchMedia("(max-width:800px)");
        if(q.matches){           
            document.getElementById('left-nav').style.display='none'
            document.getElementById('close-btn').style.display='none'
            
        }
    
}


document.getElementById("submit").addEventListener('click',function(){
    if( document.getElementById("input").value==""){
       alert('Enter message First')
     }
     else{
        submit()
     }
})



function navbar(){
    document.getElementById('left-nav').style.display = 'inline'
    document.getElementById('close-btn').style.display = 'inline'
    document.getElementById('right-screen').addEventListener('click',function(){
        document.getElementById('left-nav').style.display = 'none'
        document.getElementById('close-btn').style.display = 'none'
    })
    
}

function closemenu(){
    document.getElementById('left-nav').style.display = 'none'
    document.getElementById('close-btn').style.display = 'none'
    

}

let mystr = "By Raimath"
let i = 0

function typrewritter(){
    let newstr =mystr.slice(0,i)
    document.getElementById('name').innerHTML = newstr
    if(i<=mystr.length){
        i= i+1
    }else{
        i = 0
    }
    setTimeout(function() {typrewritter()},200)
}

typrewritter()


 function lightMode(){
    document.getElementById('section').classList.add('light')
 }

 function darkMode(){
    document.getElementById('section').classList.remove('light')
 }

 function loaded(){
    document.getElementById("input").value=""
 }