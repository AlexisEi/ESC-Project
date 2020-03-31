var app = require('./app.js');

//var DM = new DecisionMatrix();


//var availableSkills = ["skill1","skill2","skill3","skill4"];

// var availableAgents = new Map([
//     ["skill1", []],
//     ["skill2", []],
//     ["skill3", []],
//     ["skill4", []]]);

// var Queue = new Map([
//         ["skill1", []],
//         ["skill2", []],
//         ["skill3", []],
//         ["skill4", []]]);



var currentActiveUser = ["customer1","customer2","agent1","superAdmin1","customer3"];
    
var currentActiveCustomer = ["customer1","customer2",'customer3'];
    

function matchAgent(skill, user){   //input skill should be a string like "skillTag1"
    if(app.availableSkills.includes(skill)){
        
        agentList = availableAgents.get(skill);
        console.log("found matching skills, searching for available agents...");
        console.log(agentList.length);
        if(agentList.length == 0){
            return "No available agent, placed in queue!"
        }
        for(var i=0; i < agentList.length; i++){
            if(agentList[i].availability == true){
                //connect to agentList[i]
                return "Connected!";
            }
        }  
    }

    else{
        return "skill not found, no such service is available";
    }
}

function placeInQueue(skill, name){
    newQueue = Queue.get(skill);
    newQueue.push(name);
    Queue.set(skill,newQueue);
    return "Customer placed in queue, waiting for an available agent";

}


class User{
    constructor(){}
}


class Agent extends User{

    assign(name,skills){
        this.availability =1;
        for(var i =0; i< skills.length; i++){
            if(typeof skills[i] != 'string' || availableSkills.includes(skills[i]) == false){
                return "please select valid skills"   // which is not very likely to happend since the options are fixed...but is nice to look out for...
            }
            
            if(availableAgents.has(skills[i])){
                var skillList = availableAgents.get(skills[i]);
                skillList.push(this);
                //console.log("pushed to skillList!");
            }
        }
        if(typeof name != 'string' || name == ""){
            return "please enter the correct company name!";
        }
       
        this.skillTags = skills;

        // Id = Math.floor(10000 + Math.random() * 90000);
        // avoidDuplicate(this.Id);
        return 'Agent created with name as '+ name;
    }

    // avoidDuplicate(Id){
    //     if(DM.currentActiveUser.includes(Id)){
    //         this.Id = Math.floor(10000 + Math.random() * 90000);
    //         checkDuplicate(Id);
    //     }
    //     else{break;}
    //}

    
    
    // handleRequest(){                        
    //     //accept request, establish communication with the customer
    // }
    // terminate(){
    //     //terminate the communication
    //     //signal DM.Queue
    // }
    
    // setAvailability(status){
    //     this.availablity = status;
    // }

    // onLeave(){
    //     this.availablity = false;
    // }

}

class Customer extends User{
    assign(name,requirement){
        this.requirement = requirement;
        if(typeof requirement != 'string' || availableSkills.includes(requirement) == false){
            return "please select valid skills";  // which is not very likely to happend since the options are fixed...but is nice to look out for...
        }
    
        if(typeof name != 'string' || name.match("^[a-zA-Z]*") == false || name == ""){
            return "please enter your name with letters only";
        }
        this.name = name;

        //this.Id = Math.floor(10000 + Math.random() * 90000);//generate a random customerId
        //avoidDuplicate(this.Id);
        return "Hello " + name;
    }

    // avoidDuplicate(Id){
    //     if(DM.currentActiveUser.includes(Id)){
    //         this.Id = Math.floor(10000 + Math.random() * 90000);
    //         checkDuplicate(Id);
    //     }
    //     else{break;}
    // }

    // queueNumber; // int?
    // checkAlive(){}//check how long has the user been inactive

}

// class SuperAdmin{
//     constructor(requirement){
//         this.Id = Math.floor(10000 + Math.random() * 90000);//generate a random customerId
//         avoidDuplicate(this.Id);
//     }

//     avoidDuplicate(Id){
//         if(DM.currentActiveUser.includes(Id)){
//             this.Id = Math.floor(10000 + Math.random() * 90000);
//             checkDuplicate(Id);
//         }
//         else{break;}
//     }

    
// }

// class CustomerHandler{
//     constructor(){

//     }

//     createCustomer(){
//         //creat with rainbow API...?
//     }
//     destroyCustomer(){
//         //delete customer
//     }
// }

module.exports = {
    Customer,
    Agent,
    availableAgents,
    availableSkills,
    currentActiveCustomer,
    currentActiveUser,
    matchAgent,
    placeInQueue
};