({  
	getReviews : function (component) {
        var action = component.get("c.getReviews");
        action.setCallback(this, function (response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                component.set("v.data", response.getReturnValue());
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
    },
    
	sortData : function(component, fieldName, sortedDirection) {
        var multiplier = 1;
        if ("asc" !== sortedDirection) {
            multiplier = -1;
        }
        var rows = component.get("v.data");
    	rows.sort(function(a,b) {
            var retVal = (a[fieldName] > b[fieldName]) ? 1 : ( (b[fieldName] > a[fieldName]) ? -1 : 0 );
            retVal = retVal * multiplier;
            return retVal
        }); 
        component.set("v.data", rows);
	}
})