({
    doInit : function(component, event, helper) {
        component.set("v.columns", [
            { label: "Trip Time", fieldName: "Trip__r.Time__c", type: "date" },
            { label: "Name", fieldName: "Reviewer__r.Name", type: "text" },
            { label: "Flavor", fieldName: "Flavor__c", type: "text" },
            { label: "Shop", fieldName: "Trip__r.Shop__r.Name", type: "text" },
            { label: "Rate", fieldName: "Rating__c", type: "text" },
            { label: "Price", fieldName: "Price__c", type: "currency" }
        ]);

        // Load the data
        helper.getReviews(component);
    }
})