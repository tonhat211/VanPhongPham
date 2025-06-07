class ReviewModel {
    constructor(userId, reviewItems) {
        this.userId = userId;
        this.reviewItems = reviewItems;
    }

    static ReviewItem = class {
        constructor(id, productId , classificationName, rating, content) {
            this.id = id;
            this.productId = productId;
            this.classificationName = classificationName;
            this.rating = rating;
            this.content = content;
       
        }
    };
}
