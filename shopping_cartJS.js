// Create objects 
var cartItems = {
  title: "Futuristic Jellyfish",
  description: "Born in the past yet back from the future, this jellyfish has the ability time travel one second every five minutes. On top of it's cool color scheme, it's GLUTEN FREE!",
  price: 56.99
}
var cartItems1 = {
  title: "Andriod Camera Quality Jellyfish",
  description: "This potato quality jellyfish brings all the charm of a 144 pixel youtube video, combined with the aesthetic of a terribly funded ATARI game. We don't know why people want it, but what we do know is that you will buy it.",
  price: 1000.01
}
var cartItems2 = {
  title: "Super Sayian Jellyfish",
  description: "From the depths of the ocean, we bring to you Super Sayian 45 Jellyfish. It has the ability to destroy universes, travel faster than the speed of light, conjour huge balls of energy, and most importantly, significantly increase its power by screaming ear-piercingly loud for 30 minutes to an hour.",
  price: 9001.02
}
//Turn objects into strings and print onto the HMTL
var cartItemsJSON = JSON.stringify(cartItems.title);
var cartItemsJSON1 = JSON.stringify(cartItems.description);
var cartItemsJSON2 = JSON.stringify(cartItems.price);
$('#prdOne').html(cartItemsJSON);
$('#prdOne1').html(cartItemsJSON1);
$('#prdOne2').html(cartItemsJSON2);

var cartItems1JSON = JSON.stringify(cartItems1.title);
var cartItems1JSON1 = JSON.stringify(cartItems1.description);
var cartItems1JSON2 = JSON.stringify(cartItems1.price);
$('#prdSecond').html(cartItems1JSON);
$('#prdSecond1').html(cartItems1JSON1);
$('#prdSecond2').html(cartItems1JSON2);

var cartItems2JSON = JSON.stringify(cartItems2.title);
var cartItems2JSON1 = JSON.stringify(cartItems2.description);
var cartItems2JSON2 = JSON.stringify(cartItems2.price);
$('#prdThird').html(cartItems2JSON);
$('#prdThird1').html(cartItems2JSON1);
$('#prdThird2').html(cartItems2JSON2);

// rates
var taxRate = 0.075;

// Set recalculations functions to the inputs and buttons 
$('.prdQuantity input').change( function() {
  updateQuantity(this);
});

$('.prdRemoval button').click( function() {
  removeItem(this);
});


// Recalculate cart 
function recalculateCart()
{
  var subtotal = 0;
  
  // Sum up row totals
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.prdLNPrice').text());
  });
  
  // Calculate totals 
  var tax = subtotal * taxRate;
  var total = subtotal + tax; 
  
  // Update totals display 
$('.tValue').html(function() {
    $('#cSubtotal').html(subtotal.toFixed(2));
    $('#cTax').html(tax.toFixed(2));
    $('#cTotal').html(total.toFixed(2));
    if(total > 0){
      $('.checkout').show();
    }else{
      $('.checkout').hide();
    }
    $('.tValue').html();
    if(total > 100){
      $('#credit').html('You may pay cash or credit.');
    } else if (total < 100) {
      $('#credit').html('You GOT to pay cash kid!');
    } else {
      $('#credit').html('YOU BROKE SON, GET A JOB!')
    }
  }); 
}

// Update quantity 
function updateQuantity(quantityInput)
{
  // Calculate line price 
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.prdPrice').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  // recalculate totals 
  productRow.children('.prdLNPrice').each(function () {
    $(this).html(function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
    });
  });  
}


// Remove item from cart 
function removeItem(removeButton)
{
  // Remove item and recalculate totals 
  var productRow = $(removeButton).parent().parent();
  productRow.html(function() {
    productRow.remove();
    recalculateCart();
  });
}
//Print totals
$('.checkout').click(function() {
  alert('Your Subtotal is ' + $('#cSubtotal').html());
  alert('Your Tax is ' + $('#cTax').html());
  alert('Your Grand Total is ' + $('#cTotal').html());
});