({
    handleOnSuccess : function(component, event, helper) {
        var response = event.getParams().response;
        var shop = response.fields.Shop__r.displayValue;
     
        component.find("notificationsLib").showToast({
            "title": "Saved",
            "message": shop + " trip details saved"
        });
    },
    
    /*
    handleOnSubmit : function(component, event, helper) {
        
    },
    
    handleOnError : function(component, event, helper) {
        
    }
    */
})