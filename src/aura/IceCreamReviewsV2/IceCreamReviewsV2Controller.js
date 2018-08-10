({
    doInit : function(component, event, helper) {
        component.set("v.columns", [
            { label: "Trip Time", fieldName: "tripTime", type: "date", sortable: "true",
             		  typeAttributes: { 
                          month: "short", day: "2-digit", weekday: "short", 
                          hour: "2-digit", minute: "2-digit", timeZone: $A.get('$Locale.timezone') 
                      }, initialWidth: 180
            },
            { label: "Name", fieldName: "reviewerName", type: "text", sortable: "true" },
            { label: "Flavor", fieldName: "flavor", type: "text", sortable: "true" },
            { label: "Shop", fieldName: "shopName", type: "text", sortable: "true" },
            { label: "Rating", fieldName: "rating", type: "text", sortable: "true",
             		 cellAttributes: {
                         iconName: { fieldName: 'ratingIcon'},
                         iconPosition: 'right'
                     }
            },
            { label: "Price", fieldName: "price", type: "currency", sortable: "true",
                     cellAttributes: {
                         alignment: "left"
                     }
            }
        ]);
        
        helper.getReviews(component);
    },
            
    handleSort : function(component, event, helper) {
        var fieldName = event.getParam("fieldName");
        var sortedDirection = event.getParam("sortDirection");
        
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortedDirection);
        helper.sortData(component, fieldName, sortedDirection);
    }
})