public class IceCreamReviewsControllerV2 {

    @AuraEnabled
    public static Review[] getReviews() {
        Review[] reviews = new Review[]{};
            
        for (Review__c rec : [
            SELECT Id, Rating__c, Flavor__c, Price__c,
            	Trip__r.Shop__r.Name, Trip__r.Time__c, Reviewer__r.FirstName
            FROM Review__c
            ORDER BY Trip__r.Time__c DESC, Reviewer__r.FirstName
        ]) {
            reviews.add(new Review(rec));
        }
        
		return reviews;
    }
    
    class Review {
        @AuraEnabled public String Id { get; set; }
        @AuraEnabled public String flavor { get; set; }
        @AuraEnabled public Decimal price { get; set; }
        @AuraEnabled public String shopName { get; set; }
        @AuraEnabled public Datetime tripTime { get; set; }
        @AuraEnabled public String reviewerName { get; set; }
        @AuraEnabled public String rating { get; set; }
        @AuraEnabled public String ratingIcon { get; set; }
        
        public Review(Review__c rec) {
            this.Id = rec.Id;
            this.flavor = rec.Flavor__c;
            this.price = rec.Price__c;
            this.shopName = rec.Trip__r.Shop__r.Name;
            this.tripTime = rec.Trip__r.Time__c;
            this.reviewerName = rec.Reviewer__r.FirstName;
            this.rating = rec.Rating__c;
            switch on this.rating {
                when '1' { ratingIcon = 'utility:arrowdown'; }
                when '5' { ratingIcon = 'utility:arrowup'; }
            }
        }
    }
}