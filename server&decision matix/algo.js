import { PassThrough } from "stream";




Agent1 = new Agent(["skill1","skill2"]);
DM = new DecisionMatrix();
class DecisionMatrix{
    constructor(){}
    availableSkills = ["skillTag1","skillTag2","skillTag3","skillTag4"];

    availableAgents = new Map([
        ["skillTag1", [Agent1.availablity,"Agent2","Agent3"]],
        ["skillTag2", ["Agent1","Agent2","Agent3"]],
        ["skillTag3", ["Agent1","Agent2","Agent3"]],
        ["skillTag4", ["Agent1","Agent2","Agent3"]]])

    Queue = new Map([
        ["skillTag1", ["Customer1","Customer2","Customer3"]],
        ["skillTag2", ["Customer1","Customer2","Customer3"]],
        ["skillTag3", ["Customer1","Customer2","Customer3"]],
        ["skillTag4", ["Customer1","Customer2","Customer3"]]])



    currentActiveUser = [customer1,customer2,agent1,superAdmin1,customer3]

    matchAgent(skill, user){   //input skill should be a string like "skillTag1"
        if(this.availableSkills.includes(skill)){
            if(this.availableAgents.has(skill)){
                agentList = this.availableAgents.get(skill);
                console.log("found matching skills, searching for available agents...");
                for(var i =0; i < agentList.length; i++){
                    if(agentList[i]){
                        //connect to agentList[i]
                    }
                    else{
                        this.placeInQueue(skill, user.customerId);

                    }
                }
            }
            else{
                console.log("skill not found, no such service is available");
            }
        }

        else{
            alert("no matching skills!")
        }
    }

    placeInQueue(skill, customerId){
        newQueue = this.Queue.get(skill);
        newQueue.push(customerId);
        this.Queue.set(skill,newQueue);
    }

    
        
    
}

class User{
    Id;
    constructor(){}

    checkDuplicate(Id){
        if(DM.currentActiveUser.includes(this.Id)){
            this.Id = Math.floor(10000 + Math.random() * 90000);
            checkDuplicate(this.Id);
        }
        else{break;}
    }
}


class Agent extends User{

    skillTags = [];
    availablity = True;

    constructor(skills){
        this.skillTags = skills
        agentId = Math.floor(10000 + Math.random() * 90000);
        checkDuplicate(this.agentId);
    }
    
    handleRequest(){                        
        //accept request, establish communication with the customer
    }
    terminate(){
        //terminate the communication
        //signal DM.Queue
    }
    
    setAvailability(status){
        this.availablity = status;
    }

    onLeave(){
        this.availablity = false;
    }

}

class Customer extends User{
    constructor(requirements){
        this.requirements = requirements;
        customerId = Math.floor(10000 + Math.random() * 90000);//generate a random customerId
        checkDuplicate(this.customerId);
    }
    queueNumber; // int?
    checkDuplicate(customerId){
        if(DM.currentActiveCustomer.includes(this.customerId)){
            this.customerId = Math.floor(10000 + Math.random() * 90000);
            checkDuplicate(this.customerId);
        }
        else{break;}
    }
    checkAlive(){}//check how long has the user been inactive

}

class SuperAdmin extends User{
    constructor(requirements){
        adminId = Math.floor(10000 + Math.random() * 90000);//generate a random customerId
        checkDuplicate(this.adminId);
    }

    
}

class CustomerHandler{
    constructor(){

    }

    createCustomer(){
        //creat with rainbow API...?
    }
    destroyCustomer(){
        //delete customer
    }
}