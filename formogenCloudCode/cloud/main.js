
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
	pushQuery.equalTo("email", request.params.targetEmail);
	
	Parse.Push.send(
	{ 
		where: pushQuery,
		data:
		{
			alert: request.params.message,
			badge: "Increment",
			origin: request.params.originEmail,
			share: request.params.shareID
		}
	},
	{
		success: function()
		{
			//push successful
		},
		error: function(error)
		{
			//push error
		}
	});
});

//Triggers
//before RSI delete
//if RSI.wantsDelete is false, set it true, save it, do not delete it
//if RSI.wantsDelete is true, delete it
Parse.Cloud.beforeDelete("RemoteShareInfo", function(request, response)
{
	query = new Parse.Query("RemoteShareInfo");
	query.equalTo("recipientEmail", request.object.recipientEmail);
	query.equalTo("shareID", request.object.shareID);
	query.first(
	{
		success: function(remoteShareInfo)
		{
			if (remoteShareInfo.wantsDelete)
			{
				response.success();
			}
			else
			{
				response.error();
				remoteShareInfo.wantsDelete = true;
				remoteShareInfo.save();
			}
		},
		error: function(error)
		{
			response.error("Error " + error.code + " : " + error.message + " when getting RemoteShareInfo.");
		}
	});
});