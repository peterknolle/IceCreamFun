({
	handleDeleteTrip : function(component, event, helper) {
        if (confirm('Really delete?')) {
            helper.deleteTrip(component);
    	}
    },
    
    handleTripLoaded : function(component, event, helper) {
        helper.handleTripLoaded(component, event);
    },
    
    handleNewTrip : function(component, event, helper) {
        component.set("v.recordId", null);
    },
    
    handleTripSaved: function(component, event, helper) {
        helper.handleTripSaved(component, event);
    },
    
	handleNewReview : function(component, event, helper) {
        component.set("v.newReviewMode", true);
    },

	handleReviewCreated : function(component, event, helper) {
		helper.handleReviewCreated(component, event);
    },
    
	handleSaveNewReview : function(component, event, helper) {
        var fields = event.getParam("fields");
        fields["Trip__c"] = component.get("v.recordId");
        
        component.find("newReview").submit(fields);
    }
})