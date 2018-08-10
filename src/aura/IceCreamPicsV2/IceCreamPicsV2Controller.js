({
	handleRecordIdChange : function(component, event, helper) {
        if (component.get("v.recordId") != null) {
            component.find("recordHandler").reloadRecord(false, function() {
                helper.getPics(component);
            });
        }
	},

    handleUploadFinished: function (component, event, helper) {
        // This will contain the List of File uploaded data and status
        var uploadedFiles = event.getParam("files");
        console.log("Files uploaded Length : " + uploadedFiles.length);
        helper.getPics(component);
    },
    
    handlePicClicked: function(component, event, helper) {
        // event.target; LockerSerivce no no's.
        // event.currentTarget;
        // 
        var name = event.getSource()
		console.log(JSON.stringify(name));
	},
    
    handleSaveFav: function(component, event, helper) {
        helper.saveFav(component);
    },
    
    handleRecordUpdated: function(component, event, helper) {
        helper.recordUpdated(component, event);
    },
    
    handleDeleteTrip : function(component, event, helper) {
        if (confirm('Really delete?')) {
            helper.deleteTrip(component);
    	}
    },
})