
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello David! Love ya, buddy.");
});

//Using beforeSave to ensure all recipients are unique by email address
var RemoteRecipient = Parse.Object.extend("RemoteRecipient");

//check if email has a value
//enforce uniqueness based on the email column
Parse.Cloud.beforeSave("RemoteRecipient", function(request, response)
{
	if(!request.object.get("email"))
	{
		response.error('A RemoteRecipient must have an email address.');
	}
	else
	{
		var query = new Parse.Query(RemoteRecipient);
		query.equalTo("email", request.object.get("email"));
		query.first
		({
			success: function(object)
			{
				if (object)
				{
					response.error("A RemoteRecipient with this email already exists.");
				}
				else
				{
					response.success();
				}
			},
			error: function(error)
			{
				response.error("Could not validate uniqueness for this RemoteRecipient object.");
			}
		});
	}
});