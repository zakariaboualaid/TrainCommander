var React = require('react');
var moment = require('moment');

module.exports = {

	buildTicket: function(order) {
		var trip = order.trip;
		console.log(order);
		var order_time = moment(order.order_time).format("MMMM Do YYYY, h:mm:ss a")
		var departure_time = moment(trip.departure_time).format("MMMM Do YYYY, h:mm:ss a")
		var content = document.createElement("div");
		content.id = "ticket";
		var ticket = window.open('', 'ticket', 'height=300,width=400,,top=0,left=0,toolbar=no,scrollbars=no,status=no,resizable=no');
		ticket.document.write('<html><head><title>Train Commander Ticket</title>');
		ticket.document.write('</head><body >');
		ticket.document.write('<h3>Train Commander</h3>');
		ticket.document.write('<h4>Ticket #'+order.transaction_id+' </h4>');
		ticket.document.write("<p>Trip : "+ order.title +"<strong></strong></p>");
		ticket.document.write("<p>Departure Time : "+ departure_time +"<strong></strong></p>");
		ticket.document.write("<p>Price : "+ order.trip.price +" EUR<strong></strong></p>");
		ticket.document.write("<p>Order Time : "+ order_time +"<strong></strong></p>");
		ticket.document.write('</body></html>');
		ticket.print();
        ticket.close();
	}

};