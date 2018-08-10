({
	handleTripSaved  : function(component, event) {
        var fields = event.getParams().fields;
        var idValue = event.getParams().id;
		component.find("notificationsLib").showToast({
            "title": "Saved",
            "message": "Trip to {0} saved",
            "messageData": [
                {
                    url: '/' + fields.Shop__c.value,
                    label: fields.Shop__r.displayValue
            	}
            ]
        });
	}
})