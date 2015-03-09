
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//Parse.Cloud.define("hello", function(request, response) {
//  response.success("Hello David! Love ya, buddy.");
//});

//Push Notifications

//recipientDidConnect
//recipientDidDisconnect
//recipientDidUpdateForm
//recipientDidDeleteForm
//senderDidLockForm
//senderDidUnlockForm
//senderDidDeleteForm
//Params: (targetEmail, originEmail, shareID, message)
Parse.Cloud.define("formogenPush", function(request, response)
{
	var pushQuery = new Parse.Query(Parse.Installation);
	pushQuery.equalTo("email", request.params.target);
	
	Parse.Push.send(
	{ 
		where: pushQuery,
		data:
		{
			alert: request.params.alert,
			badge: "Increment",
			origin: request.params.origin,
			shareID: request.params.shareID,
			action: request.params.action
		}
	},
	{
		success: function()
		{
			response.success("push successful");
		},
		error: function(error)
		{
			response.error("push error");
		}
	});
});

