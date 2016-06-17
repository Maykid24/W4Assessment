console.log('Testing Javascript');

$(document).ready(function () {
  $('#addAnimal').on('click', function () {
    var addingAnimal = $('#animalType').val();
    console.log( "addingAnimal: " + addingAnimal );
    var newAnimal = {
      "animal": addingAnimal,
      "number": ''
    };//End of new Animal object
    $.ajax({
      type: 'POST',
      url: '/createAnimal',
      data: newAnimal,
      success: function (data) {
      showAnimals(data);
      }
    });//End of ajax call
  });//End of add Animal onclick
//Allows you to press and get the information you need from the database and display on the DOM
$('#gButton').on('click', function () {
  $('#outputDiv').children().remove();
  $.ajax({
    type: 'GET',
    url: '/getAnimals',
    success: function (data) {
      showAnimals(data);
    }
  });//End of AJAX
});//end of gButton click

//Clears out the input section for the user
$('#addAnimal').on('click', function () {
  document.getElementById('animalType').value='';
});
//Start of delete button
$('body').on('click', '.delete', function () {
  $('#outputDiv').empty();
  var animalID = {
    'id': $(this).data('id')
  };//End of object
  $.ajax({
    type: 'POST',
    url: '/deleteAnimal',
    data: animalID,
    success: function (data) {
      showAnimals(data);
    }
  });//End of ajax call
});//End of Delete button

//Outputs the actual information that is valuable to the reader
function showAnimals(animal) {
  for(i = 0; i<animal.length; i++){
    var animalOut = "<p>Animal Type: "+animal[i].type + ", Count: " + animal[i].count + "</p>";
    $('#outputDiv').append(animalOut);
    var dAnimal = "<button class='delete' data-id='" + animal[i].id + "'>Delete " + animal[i].type + "</button>";
    $('#outputDiv').append(dAnimal);
  }//End of For Loop
}//End of function show Animals

});//End of Jquery document
