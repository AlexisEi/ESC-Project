/* Wait for the page to load */
$(function() {
    console.log("[DEMO] :: Rainbow Application started!");


    // Update the variables below with your applicationID and applicationSecret strings
    var applicationID = /*"e428b8805f1411ea9a6dcf004cf8c14e";*/ '2c2904d06d6d11eaa8fbfb2c1e16e226';
    var applicationSecret = /*"H5s9R7kNuLarkk5SfAUmrZltWZg09trT0eTEXhBgU8WjMIiwDCZnrzRxAGUhjdY4"; */ "hpZzSyC6Btq23dMlF4IiJAWBhEPpvuYn8AcidljOHCOpp0FWWccrRG9xTIZ9KlaI";

    /* Bootstrap the SDK */
    angular.bootstrap(document, ["sdk"]).get("rainbowSDK");

    /* Callback for handling the event 'RAINBOW_ONREADY' */
    var onReady = function onReady() {
        
        console.log("[DEMO] :: On SDK Ready !");
        // do something when the SDK is ready
        $("#loginForm").submit(function logIn(){
        var myRainbowLogin = document.getElementById("username").value;       // Replace by your login
        var myRainbowPassword = document.getElementById("password").value; // Replace by your password

        // The SDK for Web is ready to be used, so you can sign in
        $('#signInButton').attr('disabled', true);
            rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
            .then(function(account) {
                // Successfully signed to Rainbow and the SDK is started completely. Rainbow data can be retrieved.
                $("#login").css("display", "none");
                document.getElementById("nameDisplayed").innerHTML = myRainbowLogin;
                populateContactList();
                console.log('[DEMO] :: Signed in');
            })
            .catch(function(err) {
                // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
                console.log('problem logging in');
                document.getElementById('status').innerHTML = 'Login and/or password invalid. Try again!';
                $('#signInButton').attr('disabled', false);
                
            });

        });

      
    };   //end of onReady

    var onLoaded = function onLoaded() {
        console.log("[DEMO] :: On SDK Loaded !");

        // Activate full SDK log
        rainbowSDK.setVerboseLog(true);

        rainbowSDK
            .initialize(applicationID, applicationSecret)
            .then(function() {
                console.log("[DEMO] :: Rainbow SDK is initialized!");
            })
            .catch(function(err) {
                console.log("[DEMO] :: Something went wrong with the SDK...", err);
            }); 
    };  //end of onLoad


    var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(event) {
        console.log("checking connections!!!");
        let status = event.detail.status;
        console.log("set status!!!");
        switch(status) {
            case rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED:
                // The state of the connection has changed to "connected" which means that your application is now connected to Rainbow
                console.log('STATUS: CONENCTED!!!');
                document.getElementById("connectionStatus").innerHTML = "CONNECTED";
                break;
            case rainbowSDK.connection.RAINBOW_CONNECTIONINPROGRESS:
                // The state of the connection is now in progress which means that your application try to connect to Rainbow
                console.log('STATUS: IN PROGRESS');
                document.getElementById("connectionStatus").innerHTML = "CONNECTING";
                //$("#avatar").inner("CONNECTION IN PROGRESS"); 

                break;
            case rainbowSDK.connection.RAINBOW_CONNECTIONDISCONNECTED:
                // The state of the connection changed to "disconnected" which means that your application is no more connected to Rainbow
                console.log('STATUS: DISCONNECTED');
                document.getElementById("connectionStatus").innerHTML = "DISCONNECTED";
                break;
            default:
                //deafult status: connected unless other evernts happen
                document.getElementById("connectionStatus").innerHTML = "CONNECTED";
                console.log("default status!!!");
                break;
        };
   
    };  //end of ConnectionStatus
    
    var onSigned = function onSigned(event) {
        let account = event.detail;
        console.log("onSigned")
        // Authentication has been performed successfully. Account information could be retrieved.
    };  //end of onSigned

    //populate the contact list from network
    function populateContactList(){
        var contactList = rainbowSDK.contacts.getAll();
        var num = contactList.length;
        console.log(num);
        console.log(contactList);
        console.log("getAll() is called successfully");
        for (var i = 0; i < contactList.length; i++) {
            var contactId = contactList[i].dbID;
            //var newContact = $("<div onclick=\"onContactSelected('" + contactId + "')\" id='"+ contactId + "'>" + contactList[i]._displayName + "</div>")
            //$('#contactList').append(newContact);
            console.log(i+1);
            console.log("conversationlist populated");
        }
    } 

    
    //If the objects / models Call, Contact, Conversation are not accessible in your non-AngularJS application (to access enums), you can get it with this:
    var Call = angular.element(document.querySelector('body')).injector().get('Call');
    var Contact = angular.element(document.querySelector('body')).injector().get('Contact');
    var Conversation = angular.element(document.querySelector('body')).injector().get('Conversation');  

    var selectedContactId = null;
    var associatedConversation = null;

    
    

    var onStarted = function onStarted(event, account) {
        // Do something once the SDK is ready to call Rainbow services
        var selectedContactId = "5e7960d8ae2042244e43246a"; /*"b610f3cebdb34099a03dd535cad6959e@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"; /*"3da5e3e965cd4166b65e0b982758aa9b@sandbox-all-in-one-rbx-prod-1.rainbow.sbg";/* "5e7960d8ae2042244e43246a";   /*b610f3cebdb34099a03dd535cad6959e@sandbox-all-in-one-rbx-prod-1.rainbow.sbg*/ 
        console.log("[DEMO] :: selected contact id" + selectedContactId);

        rainbowSDK.contacts.searchById(selectedContactId).then((contact)=>{
            console.log(contact);
            document.getElementById("CustomerButton1").innerHTML = "Chat with Agent <b>" + contact._displayName + "</b>" ;
            
            rainbowSDK.conversations.openConversationForContact(contact).then(function(conversation) {
                console.log("[DEMO] :: Conversation", conversation);

                rainbowSDK.im.getMessagesFromConversation(conversation, 30).then(function() {
                    console.log("[DEMO] :: Messages", conversation);

                    $("#form").submit(function() { 
                        var message = $('#m').val();
                        rainbowSDK.im.sendMessageToConversation(conversation, message);
                        $('.cards').append(getSendMessageHTML(message));
                        $('#m').val('');
                        console.log("[DEMO] ::new message sent" + message);
                    });

                    //rainbowSDK.im.sendMessageToConversation(conversation, "First message");

                    //rainbowSDK.im.sendMessageToConversation(conversation,  "Second message");

                }).catch(function(err) {
                    console.error("[DEMO] :: Error Messages", err);
                });

            }).catch(function(err) {
                console.error("[DEMO] :: Error conversation", err);
            });

        }).catch((err)=>{
            console.log(err);
        });

       /* selectedContact = rainbowSDK.contacts.searchById(selectedContactId);
            console.log("[DEMO] :: selectedContact" + selectedContact);
        

        document.getElementById("CustomerButton1").innerHTML = "Chat with Agent <b>" + selectedContact._displayName + "</b>" ;
        /*  //UPDATE THE CONVERSATION HEADER ELEMENT
            var header = document.getElementById("conversationHeader");
            header.innerHTML = "Conversation with <b>" + selectedContact._displayName + "</b>" ;*/
        


        //$('#CustomerButton1').attr('disabled', false);
     /*   rainbowSDK.conversations.openConversationForContact(selectedContact)
            .then(function (conversation) {
                console.log("[DEMO] :: Conversation", conversation);
                associatedConversation = conversation;
                //console.log(associatedConversation.message);
                
                //return conversation;
            }).catch(function (err) {
                // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
                console.log("[DEMO] :: conversationopen failed");
            }); */
         
       /* rainbowSDK.im.getMessagesFromConversation(associatedConversation, 30).then(function() {
            // The conversation object is updated with the messages retrieved from the server (same reference)
            console.log("conversation history retrieving");
            console.log(associatedConversation.messages);
            console.log(conversation.messages);
            
            // Call a function to display the new messages received
            //displayMessages(associatedConversation, currentPage);

            if (associatedConversation.messages){
                var ims = associatedConversation.messages;
                console.log(ims);
                for (im in ims){
                    if (ims[im].from.loginEmail == myRainbowLogin){
                        $('.cards').append(getSendMessageHTML(im));
                    }
                    else {
                        $('.cards').append(getReceivedMessageHTML(im));
                    }
                }

            }
    
            
        }).catch(function (err){
            console.log("history retrieval failed");
        });  */
         
         
         /*.then(conversation => rainbowSDK.im.getMessagesFromConversation(conversation, 30))
            console.log("conversation history retrieved")
            .then(result => {
                if (result.messages){
                    var messages = result.messages;
                    for (var message in messages){
                        if (messages[message].from.loginEmail === username){
                            //$('.card-body').append(getSendMessageHTML(messages[message].data,messages[message].from.avatar.src));
                            //myAvatar = messages[message].from.avatar.src;
                            console.log("message sent retrived");
                        }
                        else{
                            //$('.card-body').append(getReceivedMessageHTML(messages[message].data,messages[message].from.avatar.src));
                            //chatAvatar = messages[message].from.avatar.src;
                            console.log("message recieved retrived")
                        }

                    }
                }
                console.log(result) */
        

            
            
    };

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    function getReceivedMessageHTML(message) {
        return '<div class="card shadow-1"><div class="upper-text"> Agent </div><div class="speech-bubble"><div class="message">' + message +'</div></div><div class="lower-text">'+ dateTime +'</div></div>' 

        
    }
    function getSendMessageHTML(message) {
        return '<div class="card shadow-1"><div class="upper-text"> ME </div><div class="speech-bubble-2"><div class="message">' + message +'</div></div><div class="lower-text">'+ dateTime +'</div></div>' 
    }

    // New Message Received
    var onNewMessageReceived = function (event) {
        console.log("new message recieved");
        let message = event.detail.message.data;
        let conversation = event.detail.conversation;
        // Do something with the new message received
        $('.cards').append(getReceivedMessageHTML(message));

        
    };

    
        
    


/*
    var onStarted = function onStarted(event, account) {
        // Do something once the SDK is ready to call Rainbow services
        //var selectedContactId =/*"3da5e3e965cd4166b65e0b982758aa9b@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"; "d063d617c9364204b93097f040b518a9@sandbox-all-in-one-rbx-prod-1.rainbow.sbg";
        //var selectedContactId = "5e7960d8ae2042244e43246a";



        function onContactSelected(contactId) {
            selectedContact = rainbowSDK.contacts.getContactById(contactId);
            console.log("getContactById successfull")
        
            //UPDATE THE CONVERSATION HEADER ELEMENT
            var header = document.getElementById("conversationHeader");
            header.innerHTML = "Conversation with <b>" + selectedContact._displayName + "</b>" ;

            

            rainbowSDK.conversations.openConversationForContact(selectedContact)
            .then(function (conversation) {
                associatedConversation = conversation;
                return conversation;
        
            });
            
            rainbowSDK.im.getMessagesFromConversation(conversation, 30)  //populate the last 30 messgaes
            .then(function(){
                if (result.messages){
                    var messages = result.messages;
                    for (var message in messages){
                        if (messages[message].from.loginEmail === username){
                            $('.card-body').append(getSendMessageHTML(messages[message].data,messages[message].from.avatar.src));
                            myAvatar = messages[message].from.avatar.src;
                        }
                        else{
                            $('.card-body').append(getReceivedMessageHTML(messages[message].data,messages[message].from.avatar.src));
                            chatAvatar = messages[message].from.avatar.src;c
                        }

                    }
                }
                console.log(result)
            })
            .catch(function (err) {
                // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
                console.log(err);
            });

        //USE ONLY WHEN NO CONTACT FOUND 
        if(!selectedContact) {
            rainbowSDK.contacts.searchById(contactId).then(function(contact) {
                selectedContact = contact;
                if(selectedContact) {
                }
                else {
                    console.log('some error');
                }

            }).catch(function(err) {
                console.log(err);
            });;
        }

        //RECEIVING A NEW MESSAGE
        var onNewMessageReceived = function(event, message, conversation) {
            rainbowSDK.im.markMessageFromConversationAsRead(associatedConversation, message);
            var guestMessage = $("<div class=\"leftSideMessage\">" + message.data + "</div><p>");
            var hostMessage = $("<div class=\"rightSideMessage\">" + message.data + "</div><p>");

            if(message.side === "L") {
                $('#messages').append(guestMessage);
            } else {
                $('#messages').append(hostMessage);
            }
            var elem = document.getElementById('chatMessages');
            //elem.scrollTop = elem.scrollHeight; 
        };

            
    };
}; */


    






    /* Listen to the SDK event RAINBOW_ONREADY */
    document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady)

    /* Listen to the SDK event RAINBOW_ONLOADED */
    document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded)

    // Listen when the SDK is signed
    document.addEventListener(rainbowSDK.connection.RAINBOW_ONSIGNED, onSigned)

    // Listen when the SDK is started
    document.addEventListener(rainbowSDK.connection.RAINBOW_ONSTARTED, onStarted)

    // Subscribe to Rainbow connection change event
    document.addEventListener(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent)

    /* Load the SDK */
    rainbowSDK.load(); 

    //recieve and send new messages
    document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, onNewMessageReceived);




/*
    let onConversationChanged = function(event) {

        // as noted in the documentation, RAINBOW_ONCONVERSATIONCHANGED carries only one parameter: conversationID:
    
        let conversationId = event.detail;
    
        // do something with the event
    }
    
    // add event listener
    document.addEventListener(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONCHANGED, onConversationChanged)


    let onNewMessageReceived = function(event) {

        // as noted in the documentation, RAINBOW_ONNEWIMMESSAGERECEIVED carries three parameters: Message, Conversation and CC. Let's retrieve them:
    
        let message = event.detail.message;
        let conversation = event.detail.conversation;
        let cc = event.detail.cc;
    
        // do something with the event
    
    }
    
    // add event listener
    document.addeventlistener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, onNewMessageReceived)

    */
/*
    // New Message Received
    var onNewMessageReceived = function(event, message, conversation) {
        rainbowSDK.im.markMessageFromConversationAsRead(associatedConversation, message);
        var guestMessage = $("<div class=\"leftSideMessage\">" + message.data + "</div><p>");
        var hostMessage = $("<div class=\"rightSideMessage\">" + message.data + "</div><p>");

        if(message.side === "L") {
            $('#messages').append(guestMessage);
        } else {
            $('#messages').append(hostMessage);
        }
        var elem = document.getElementById('chatMessages');
        elem.scrollTop = elem.scrollHeight; 
    }; 

    $(document).on(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, onNewMessageReceived);


    $('.send_btn').on('click', function () {
        // Send message
        var message = $('#typeBar').val();
        $('.card-body').append(getSendMessageHTML(message, "https://via.placeholder.com/50"));
        $('#typeBar').val("");
        rainbowSDK.im.sendMessageToConversation(associatedConversation, message);
    });
    */


    
});

/*
function getReceivedMessageHTML(message) {
    return '<div class="card shadow-1"><div class="upper-text">Name' + selectedContact._displayName + '</div><div class="speech-bubble-2"><div class="message">' + message +'</div></div><div class="lower-text">Monday: 20:38</div></div>' 

    
}
function getSendMessageHTML(message) {
    return '<div class="card shadow-1"><div class="upper-text">Name </div><div class="speech-bubble-2"><div class="message">' + message +'</div></div><div class="lower-text">Monday: 20:38</div></div>' 
}

function sendMessage() {
    // Send message
    var message = $('#typer').val();

    $('.cards').append(getSendMessageHTML(message));
    $('#typer').val("");
    rainbowSDK.im.sendMessageToConversation(associatedConversation, message);
    console.log("new message sent");
};
*/

//REFRESH PAGE IN ORDER TO SIGN OUT - ARBITRARY SOLUTION GOOD ENOUGH FOR THE PROJECT
function signOut(){
    location.reload();
}




