$(document).ready(function(){
    var booll = false;
    
    $('.bck').click(function(){
      
      if(booll == false){
      $('.slider').css('left','100px');
      booll = true;
      }
      else{
        $('.slider').css('left','0px');
        booll = false;
      }
    });
  });