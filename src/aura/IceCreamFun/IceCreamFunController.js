({
	handleReviewSelected : function(component, event, helper) {
		var review = event.getParam("review");
        component.set("v.tripId", review.tripId);
        component.set("v.reviewId", review.Id);
	}
})