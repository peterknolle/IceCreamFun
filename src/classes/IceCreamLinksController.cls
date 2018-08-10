public class IceCreamLinksController {
    
	@AuraEnabled
    public static Account[] getShops() {
        return [
            SELECT Name, Website
            FROM Account
            WHERE Type = 'Ice Cream Shop' AND Has_Visited__c = false
            ORDER BY Name ASC
        ];
    }
}