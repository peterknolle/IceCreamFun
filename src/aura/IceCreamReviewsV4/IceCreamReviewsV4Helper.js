({
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
	},
    
	getRowActions : function(component, row, doneCallback) {
    	var actions = [
            {
                "label": "View Trip",
                "iconName": "utility:zoomin",
                "name": "view"
        	},
            {
                "label": "Edit",
                "iconName": "utility:edit",
                "name": "edit"
            }
        ];
        
        if (row["rating"] == 5) {
            actions.push({
                "label": "Share",
                "iconName": "utility:socialshare",
                "name": "Share"
            });
        }
        
        doneCallback(actions);
    },
    
    getReviews : function (component) {
        var action = component.get("c.getReviews");
        this.callAction(component, action, function(response) {
            component.set("v.data", response.getReturnValue());
        });
    },

    saveChanges: function(component, changedValues) {
        var action = component.get("c.saveChanges");
        action.setParams({ changedValuesJson: JSON.stringify(changedValues) });
        var self = this;
        this.callAction(component, action, function(response) {
            var data = component.get("v.data");
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < changedValues.length; j++) {
                    if (data[i].Id == changedValues[j].Id) {
                        data[i] = Object.assign(data[i], changedValues[j]);
                        break;
                    }
                }
            }
            component.find("reviews-table").set("v.draftValues", null);
            component.set("v.data", data);
            self.showToast(component, "Saved", "Saved Changes");
        })
    },
    
    callAction : function(component, action, successHandler, errorHandler) {
    	action.setCallback(this, function (response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                successHandler(response);
            } else if (state === "ERROR") {
                if (errorHandler) {
                    errorHandler(response);
                } else {
                    var errorMessage = "";
                    var errors = response.getError();
                    if (errors && errors[0] && errors[0].message) {
                        errorMessage = errors[0].message;
                    }
                    if (errorMessage === "") {
                        errorMessage = "Unknown Error";
                    }
                    this.showNotice(component, "Error", "Error", errorMessage);
                }
            }
        });
        $A.enqueueAction(action);
	},
        
    showToast: function(component, title, message) {
        component.find("notificationsLib").showToast({
            "title": title,
            "message": message
        });
    },
    
    showNotice: function(component, variant, header, message) {
        component.find("notificationsLib").showNotice({
            "variant": variant,
            "header": header,
            "message": message
        });
                    
    }
})