({
    deleteTrip : function(component) {
        component.find("deleteHandler").deleteRecord($A.getCallback(function(deleteResult) {
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
            	component.find("notificationsLib").showToast({
                    "title": "Deleted", 
                    "message": "Trip is deleted"
                });
                component.set("v.recordId", null);
                component.set("v.shopName", null);
                component.set("v.tripTime", null);
                $A.get("e.force:refreshView").fire();
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
        }));     
	},
    
    handleTripLoaded : function(component, event) {
        var tripId = component.get("v.recordId");
        if ( !$A.util.isEmpty(tripId) ) {
            // See User Interface API Record UI type
            // https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_record_ui.htm
        	var tripRec = event.getParams().records[tripId];
            var fields = tripRec.fields;
            this.setTripValuesForReviews(component, fields);
        }
    },
    
    setTripValuesForReviews : function(component, fields) {
 		component.set("v.tripTime", fields.Time__c.value);
        component.set("v.shopName", fields.Shop__r.displayValue);
    },
    
    handleTripSaved : function(component, event) {
        var fields = event.getParams().fields;
        var idValue = event.getParams().id;
        if ( $A.util.isEmpty(component.get("v.recordId")) ) {
            component.set("v.recordId", idValue);;
        }
        component.find("notificationsLib").showToast({
            "title": "Saved",
            "message": "Trip to {0} created",
            "messageData": [
                {
                    url: '/' + fields.Shop__c.value,
                    label: fields.Shop__r.displayValue
            	}
            ]
        });
        
        this.setTripValuesForReviews(component, fields)
    },
    
    handleReviewCreated : function(component, event) {
        var fields = event.getParams().fields;
        var idValue = event.getParams().id;
      
        component.set("v.newReviewMode", false);
        component.find("notificationsLib").showToast({
            "title": "Saved",
            "message": "{0} created for {1}",
            "messageData": [
                {
                    url: '/' + idValue,
                    label: 'New Review'
            	},
                {
                    url: '/' + fields.Reviewer__c.value,
                    label: fields.Reviewer__r.displayValue
                }
            ]
        });
        
        var review = {
            Id : idValue, 
            tripTime: component.get("v.tripTime"),
            reviewerName: fields.Reviewer__r.displayValue,
            flavor: fields.Flavor__c.value,
            shopName: component.get("v.shopName"),
            rating: fields.Rating__c.value,
            price: fields.Price__c.value
        };
        if (review.rating == '1') { 
            review.ratingIcon = 'utility:arrowdown'; 
        } else if (review.rating == '5') {
        	review.ratingIcon = 'utility:arrowup'; 
        }
        var reviewAddedEvt = $A.get("e.c:reviewAdded");
        reviewAddedEvt.setParams( {review: review} );
		reviewAddedEvt.fire();
    },
    
    ///
    // Below functions are not used due to the recordForm being able to handle all data ops
    // Without it, we might need to use the below force:recordData methods
    // 
    
    // Would all this to create the Review__c object for input in the form
	loadNewReview: function(component, event, helper) {
        // Prepare a new record from template
        component.find("reviewCreator").getNewRecord(
            "Review__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newReviewRecord");
                var error = component.get("v.recordError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
    },
    
    // Would call this to save the Review__c to the Database
    createReview : function(component) {
        // would add in validation here...
        component.set("v.newSimpleReview.Trip__c", component.get("v.recordId"));
        component.find("reviewCreator").saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was saved."
                });
                resultsToast.fire();
                
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving contact, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    },
    
    createReview : function(component) {
        /* NO CALLBACK...
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Review__c"
        });
        createRecordEvent.fire();
        */
    }
})