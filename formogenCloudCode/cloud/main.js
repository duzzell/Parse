
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//Parse.Cloud.define("hello", function(request, response) {
//  response.success("Hello David! Love ya, buddy.");
//});

//Push Notifications

//Params: (targetEmail, originEmail, shareID, action, message)
Parse.Cloud.define("formogenPush", function(request, response)
{
	var pushQuery = new Parse.Query(Parse.Installation);
	pushQuery.equalTo("email", request.params.targetEmail);
	
	Parse.Push.send(
	{ 
		where: pushQuery,
		data:
		{
			alert: request.params.message,
			badge: "Increment",
			originEmail: request.params.originEmail,
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

