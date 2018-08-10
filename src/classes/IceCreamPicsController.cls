public class IceCreamPicsController {

    @AuraEnabled
    public static List<ContentVersion> getPics(String recordId) {
        Id[] contDocIds = new Id[]{};
            
        for (ContentDocumentLink link : [
            SELECT ContentDocumentId
            FROM ContentDocumentLink
            WHERE LinkedEntityId = :recordId 
        ]) {
            contDocIds.add(link.ContentDocumentId);
        }
        return [
            SELECT Id, Title 
            FROM ContentVersion 
            WHERE ContentDocumentId IN :contDocIds
            	  AND IsLatest = true
        ];
    }
}