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

const generateQueryObject = (query: SearchQuery) => {
    const output: any = {};

    if (query.price) {
        const priceValues = query.price.split(",");
        const priceConditions = priceValues.map((value: string) => {
            const [min, max] = value.split("-").map(Number);
            return { finalrate: { $gte: min, $lte: max } };
        });
        output.$or = output.$or || [];
        output.$or.push({ $and: priceConditions });
    }

    if (query.category) {
        const categories = query.category.split(",");
        output.category = { $in: categories };
    }

    if (query.discount) {
        const discountValues = query.discount.split(",");
        const discountConditions = discountValues.map((value: string) => {
            const [min, max] = value.split("-").map(Number);
            return { discount: { $gte: min, $lte: max } };
        });
        output.$or = output.$or || [];
        output.$or.push({ $and: discountConditions });
    }

    return output;
};

module.exports = { generateMongoFilterfromQueryString, generateQueryObject };