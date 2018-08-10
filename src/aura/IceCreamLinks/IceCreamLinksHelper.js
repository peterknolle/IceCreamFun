({
	getShops: function(component) {
        var action = component.get("c.getShops");
        
        action.setCallback(this, function (response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                component.set("v.shops", response.getReturnValue());
            } else if (state === "ERROR") {
                var errorMessage = "";
                var errors = response.getError();
                if (errors && errors[0] && errors[0].message) {
                    errorMessage = errors[0].message;
                }
                if (errorMessage === "") {
                    errorMessage = "Unknown Error";
                }
                component.find("notificationsLib").showNotice({
                    "variant": "Error",
                    "header": "Error",
                    "message": errorMessage
                });
            }
        });
        $A.enqueueAction(action);
    }
})