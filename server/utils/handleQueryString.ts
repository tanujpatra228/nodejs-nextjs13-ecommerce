interface SearchQuery {
    discount?: string;
    price?: string;
    category?: string;
    limit?: string;
    skip?: string;
    page?: string;
};


const generateMongoFilterfromQueryString = (query: SearchQuery) => {
    const filters: any = {};

    // Generate Category Filter ($in query)
    if (query.category) {
        filters.category = { $in: query.category.replace('-', ' ').split(',') };
    }

    // Generate Price Filter using $gte and $lte (range query)
    if (query.price) {
        const priceArr = query.price.split(',');
        const priceFilter: object[] = [];
        priceArr?.forEach((price) => {
            const min = price.split('-')[0];
            const max = price.split('-')[1];
            priceFilter.push({ "finalrate": { $gte: +min, $lte: +max } });
        });
        filters.$or = filters?.$or || [{ $and: [] }];
        filters.$or[0].$and = filters.$or[0]?.$and || []
        filters.$or[0].$and.push({ $or: priceFilter });
    }

    // Generate Discount filter using $gte and $lte (range query)
    if (query.discount) {
        const discountArr = query.discount.split(',');
        const discountFilter: object[] = [];
        discountArr?.forEach((price) => {
            const min = price.split('-')[0];
            const max = price.split('-')[1];
            discountFilter.push({ "discount": { $gte: +min, $lte: +max } });
        });
        filters.$or = filters?.$or || [{ $and: [] }];
        filters.$or[0].$and = filters.$or[0]?.$and || []
        filters.$or[0].$and.push({ $or: discountFilter });
    }

    return filters;
};

module.exports = { generateMongoFilterfromQueryString };