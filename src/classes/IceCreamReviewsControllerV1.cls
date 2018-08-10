public class IceCreamReviewsControllerV1 {
	
    @AuraEnabled
    public static Review__c[] getReviews() {
        Review__c[] reviews = [
            SELECT Id, Rating__c, Flavor__c, Price__c,
            	Trip__r.Shop__r.Name, Trip__r.Time__c, Reviewer__r.Name
            FROM Review__c
            ORDER BY Trip__r.Time__c DESC, Reviewer__r.Name
        ];
        
        return reviews;
    }
}