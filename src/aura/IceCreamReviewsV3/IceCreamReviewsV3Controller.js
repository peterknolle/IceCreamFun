({
    doInit : function(component, event, helper) {
        var actions = helper.getRowActions.bind(this, component);
        
        component.set("v.columns", [
            { label: "Trip Time", fieldName: "tripTime", type: "date", sortable: "true",
             		  typeAttributes: { 
                          month: "numeric", day: "numeric", 
                          hour: "2-digit", minute: "2-digit", timeZone: $A.get('$Locale.timezone') 
                      }, initialWidth: 130
            },
            { label: "Name", fieldName: "reviewerName", type: "text", sortable: "true" },
            { label: "Flavor", fieldName: "flavor", type: "text", sortable: "true", editable: true },
            { label: "Shop", fieldName: "shopName", type: "text", sortable: "true" },
            { label: "Rate", fieldName: "rating", type: "number", sortable: "true",
             		 cellAttributes: {
                         iconName: { fieldName: 'ratingIcon'},
                         iconPosition: 'right',
                         alignment: "left"
                     },
             		 editable: true
            },
            { label: "Price", fieldName: "price", type: "currency", sortable: "true",
                     cellAttributes: {
                         alignment: "left"
                     },
             		 editable: true,
             		 initialWidth: 80
            },
            { type: "action", typeAttributes: { rowActions: actions }, menuAlignment: "left" }
        ]);
        
        helper.getReviews(component);
    },
            
    handleSort : function(component, event, helper) {
        var fieldName = event.getParam("fieldName");
        var sortedDirection = event.getParam("sortDirection");
        
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortedDirection);
        helper.sortData(component, fieldName, sortedDirection);
    },
    
    handleRowAction: function (component, event, helper) {
        var action = event.getParam("action");
        var row = event.getParam("row");

        switch (action.name) {
            case "view":
                var evt = component.getEvent("reviewSelected");
                evt.setParams({review : row});
                evt.fire();
                break;
            case "edit":
                var evt = $A.get("e.force:editRecord");
                evt.setParams({recordId: row.Id});
                evt.fire();
                break;
            case "share":
                alert("share" + JSON.stringify(row));
        }
    },
    
    handleRowSelection: function(component, event, handler) {
        var selectedRows = event.getParam("selectedRows");
        component.set("v.selectedRows", selectedRows);
    },
    
    handleExport: function(component, event, handler) {
        var selectedRows = component.get("v.selectedRows");
        alert ('Exporting\n' + JSON.stringify(selectedRows));
    },
    
    handleSave: function(component, event, helper) {
        var changedValues = event.getParam('draftValues');
        // keyField can be used to check against component.get("v.data") if need be
        helper.saveChanges(component, changedValues);
    }
})